import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(private http: HttpClient) { }
  //private apiUrl = 'http://localhost:3000'
  private selectedArticle: any;
  fetchArticles(){
    let response = this.http.get('/articles'); 
    return response 
  }
  fetchLatestNews(){
    let response = this.http.get('/latest-news');
    return response
  }
  earlyViewFetch() {
    let response = this.http.get('/items'); 
    return response 
  }

  getSelectedArticle(): any {
    return this.selectedArticle;
  }

}
