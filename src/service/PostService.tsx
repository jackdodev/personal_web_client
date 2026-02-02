import type { PostItem, NewPostResponse } from "../types";

import { getUploadLink } from './FileUploadService';
import { validatePost } from './AuthService';
import { generateId } from '../utils/crypto';

import axios from 'axios';

export async function creadteNewPost(post: PostItem): Promise<NewPostResponse> {
  try {
    validatePost(post);
  } catch (error) {
    console.error('[PostService] Post validation failed:', error);
    return { success: false, error: 'Post validation failed' };
  }

  doCreatePost(post).then(() => {
    return { success: true, postId: post.id };
  }).catch(async (error) => {
    console.error('[PostService] Error creating post:', error);

    await doDeletePost(post.id);
    return { success: false, error: 'Error creating post' };
  })
}

export async function loadAllPost(): Promise<LoadPostResponse> {
  axios({
      method: 'GET',
      url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog',
      responseType: 'stream'
  }).then(function (response) {
      console.log('Response received')
      var resp = JSON.parse(response.data)
      var newBlogs = [...posts, ...resp]
  }).finally(() => {
  })
}

export async function loadPost(postId: string): Promise<LoadPostResponse> {
 
}

async function doCreatePost(post: NewPostRequest): Promise<void> {
  var resp = await axios({
      method: 'POST',
      url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/new/'+bId,
      responseType: 'json',
      data: {
        author_id: post.AuthorId,
        title: post.title,
        tags: [],
      }
    })

    if (resp.status !== 201) {
      console.error('[PostService] Error creating new blog entry:', resp);
      throw new Error('Failed to create new blog entry');
    }

    const bId = generateId("blog");
    const bucketKey = `${post.postType}/${post.AuthorId}:${bId}`;
    
    const upload_link = await getUploadLink(bucketKey);
    if (upload_link === '') {
      throw new Error('Failed to get upload link');
    }

    await axios.put(upload_link, post.content, {
      headers: {
        'Content-Type': 'text/markdown'
      },
    }).catch((error) => {
      console.error('[PostService] Error uploading file:', error)\
      throw error;
    });
}

function doDeletePost(postId: string) {
  axios({
    method: 'DELETE',
    url: import.meta.env.REACT_APP_BACKEND_SERVER_URL+'/blog/delete',
    responseType: 'json',
    data: {
      id: postId,
    }
  }).catch((error) => {
    console.error('[PostService] Error deleting post during cleanup:', error);
  });
}