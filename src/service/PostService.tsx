import type { NewPostRequest, CreatePostResponse, LoadPostsResponse, LoadPostDetailResponse, DeletePostResponse } from "../types";

import { getUploadLink } from './FileUploadService';
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
    return { success: true, posts: posts };
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
    return { success: false, error: 'Post validation failed', post: null as any, content: '' };
  }

  try {
    const { post, content } = await doLoadPostDetail(postId);
    return {success: true, post: post, content: content };
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

async function doLoadAllPost(): Promise<void> {

}

async function doLoadPostDetail(postId: string): Promise<void> {
  axios({
      method: 'GET',
      url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/post',
      responseType: 'stream'
  }).then(function (response) {
      var resp = JSON.parse(response.data)
      var newBlogs = [...posts, ...resp]
  }).finally(() => {
  })
}

async function doCreatePost(postId: string, newPostRequest: NewPostRequest): Promise<void> {
  var resp = await axios({
      method: 'PUT',
      url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/'+postId,
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

    await axios.put(upload_link, newPostRequest.content, {
      headers: {
        'Content-Type': 'text/markdown'
      },
    }).catch((error) => {
      console.error('[PostService] Error uploading file:', error);
      throw error;
    });
}

function doDeletePost(postId: string) {
  axios({
    method: 'DELETE',
    url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/'+postId,
    responseType: 'json',
  }).catch((error) => {
    console.error('[PostService] Error deleting post during cleanup:', error);
  });
}