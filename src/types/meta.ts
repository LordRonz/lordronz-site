export type ContentMeta = {
  slug: string;
  currentViews: number;
  likes: number;
  likesByUser: number;
  devtoViews?: number;
};

export type SingleContentMeta = {
  contentViews: number;
  contentLikes: number;
  likesByUser: number;
  devtoViews?: number;
};
