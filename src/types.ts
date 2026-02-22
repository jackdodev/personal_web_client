
export interface PostItem {
  id: string;
  postType: PostType;
  title: string;
  authorId: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NewPostRequest {
  postType: PostType;
  title: string;
  authorId: string;
  content: string;
  tags?: string[],
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreatePostResponse {
  success: boolean;
  postId?: string;
  error?: string;
}

export interface LoadPostsResponse {
  success: boolean;
  posts?: PostItem[];
  error?: string;
}

export interface LoadPostDetailResponse {
  success: boolean;
  post?: PostItem;
  error?: string;
}

export interface DeletePostResponse {
  success: boolean;
  error?: string;
}

type PostType = "blog" | "project";
