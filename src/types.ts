
export interface PostItem {
  id: string;
  postType: PostType;
  title: string;
  AuthorId: string;
  content: string;
  Tags?: string[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}

export interface NewPostResponse {
  success: boolean;
  postId?: string;
  error?: string;
}

export interface LoadPostResponse {
  success: boolean;
  post?: PostItem;
  error?: string;
}

type PostType = "blog" | "project";
