import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article, RelatedArticle } from './models';


@Injectable({
  providedIn: 'root'
})
export class RelatedArticlesServiceService {

  constructor(private http: HttpClient) { }
  //private apiUrl = 'http://localhost:3000';
  getRelatedArticles(article_id: string): Observable<RelatedArticle[]| undefined> {
    return this.http.get<Article[]>('/articles').pipe(
      map(articles => {
        // Filter related articles for the current article
        const article = articles.find(a => a.unique_id === article_id);
          // Return the comments of the found article or an empty array if not found
          return article ? article.relatedArticles : [];
        
  })
  )
  }
}
