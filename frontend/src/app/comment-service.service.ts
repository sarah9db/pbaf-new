import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article, Comment } from './models'
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentServiceService {

  constructor(private http: HttpClient) { }
  //private apiUrl = 'http://localhost:3000';
  getComments(article_id: string): Observable<Comment[]> {
    return this.http.get<Article[]>('/articles')
      .pipe(
        map(articles => {
          // Find the article with the matching ID
          const article = articles.find(a => a._id === article_id);
          // Return the comments of the found article or an empty array if not found
          return article ? article.comments : [];
        })
      );
  }
  
  addComment(comment: any){
    let response = this.http.post('/comments', comment);
    return response
  }
  
}
