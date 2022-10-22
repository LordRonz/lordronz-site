export type ContentMeta = {
  slug: string;
  views: number;
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
