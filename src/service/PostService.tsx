import type { NewPostRequest, CreatePostResponse, LoadPostsResponse, LoadPostDetailResponse, DeletePostResponse } from "../types";

import { getDownloadLink, getUploadLink, downloadContent, uploadContext } from './FileUploadService';
import { validateContext } from './AuthService';
import { generateId } from '../utils/crypto';

import axios from 'axios';

export async function createNewPost(newPostRequest: NewPostRequest): Promise<CreatePostResponse> {
  try {
    validateContext(null as any);
  } catch (error) {
    console.error('[PostService] Post validation failed:', error);
    return { success: false, error: 'Post validation failed' };
  }

  const postId = generateId(newPostRequest.postType);
  try {
    await doCreatePost(postId, newPostRequest);
    return { success: true, postId: postId };
  } catch (error) {
    console.error('[PostService] Error creating post:', error);
    await doDeletePost(postId);
    return { success: false, error: 'Error creating post' };
  }
}

export async function loadAllPost(): Promise<LoadPostsResponse> {
  try {
    validateContext(null as any);
  } catch(error) {
    console.error('[PostService] Post validation failed:', error);
    return { success: false, error: 'Post validation failed' };
  }

  try {
    const posts = await doLoadAllPost();
    return { success: true, posts: convertToPostItems(posts) };
  } catch (error) {
    console.error('[PostService] Error loading posts:', error);
    return { success: false, error: 'Error loading posts' };
  }
}

export async function loadPostDetail(postId: string): Promise<LoadPostDetailResponse> {
  try {
    validateContext(null as any);
  } catch (error) {
    console.error('[PostService] Post validation failed:', error);
    return { success: false, error: 'Post validation failed'};
  }

  try {
    const { post, content } = await doLoadPostDetail(postId);
    return {success: true, post: convertToPostItem(post), content: content };
  } catch (error) {
    console.error('[PostService] Error loading post detail:', error);
    return { success: false, error: 'Error loading post detail'};
  }
}

export async function deletePost(postId: string): Promise<DeletePostResponse> {
  try {
    validateContext(null as any);
  } catch (error) {
    console.error('[PostService] Post validation failed:', error);
    return { success: false, error: 'Post validation failed' };
  }

  try {
    await doDeletePost(postId);
    return { success: true };
  } catch (error) {
    console.error('[PostService] Error deleting post:', error);
    return { success: false, error: 'Error deleting post' };
  }
}

async function doLoadAllPost(): Promise<any> {
  await axios({
    method: 'GET',
    url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/post',
    responseType: 'json'
  }).then(function (response) {
    if (response.status !== 200) {
      console.error('[PostService] Error loading posts:', response);
      throw new Error('Failed to load posts');
    }

    var resp = JSON.parse(response.data);
    return resp;
  })
}

async function doLoadPostDetail(postId: string): Promise<{ post: any, content: string }> {
  axios({
      method: 'GET',
      url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/post/'+postId,
      responseType: 'stream'
  }).then(async function (response) {
    if (response.status !== 200) {
      console.error('[PostService] Error loading post detail:', response);
      throw new Error('Failed to load post detail');
    }
    
    var resp = JSON.parse(response.data)
    const bucket_key = `${resp.post_type}/${resp.author_id}:${postId}`;

    const download_link = await getDownloadLink(bucket_key);
    if (download_link === '') {
      throw new Error('Failed to get download link');
    }

    const content = await downloadContent(download_link);
    return { post: resp, content: content };
  }).catch((error) => {
    console.error('[PostService] Error loading post detail:', error);
    throw error;
  })

  return { post: null as any, content: '' };
}

async function doCreatePost(postId: string, newPostRequest: NewPostRequest): Promise<void> {
  try {
    var resp = await axios({
      method: 'PUT',
      url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/post/'+postId,
      responseType: 'json',
      data: newPostRequest
    })

    if (resp.status !== 201) {
      console.error('[PostService] Error creating new blog entry:', resp);
      throw new Error('Failed to create new blog entry');
    }

    const bucketKey = `${newPostRequest.postType}/${newPostRequest.authorId}:${postId}`;
    
    const upload_link = await getUploadLink(bucketKey);
    if (upload_link === '') {
      throw new Error('Failed to get upload link');
    }

    await uploadContext(upload_link, newPostRequest.content);
  } catch (error) {
    console.error('[PostService] Error creating new post:', error);
    throw error;
  }
}

function doDeletePost(postId: string) {
  axios({
    method: 'DELETE',
    url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/post/'+postId,
    responseType: 'json',
  }).catch((error) => {
    console.error('[PostService] Error deleting post during cleanup:', error);
    throw error;
  });
}