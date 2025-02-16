// src/app/models.ts
export interface Comment {
    name: string;
    email: string;
    content: string;
    timestamp: Date;
  }
  
  export interface Article {
    _id: string;
    unique_id: string;
    title: string;
    content: string;
    image: string;
    hyperlink: string;
    comments: [];
    relatedArticles?: RelatedArticle[];
  }

export interface RelatedArticle{
  title: string;
  link: string;
}
  