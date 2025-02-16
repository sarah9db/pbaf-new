import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeServiceService } from '../home-service.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  home_data: any = [];

  constructor(private router: Router, private homeService: HomeServiceService) { }

  ngOnInit(): void {
    this.homeService.fetchArticles().subscribe(
      data => {
        this.home_data = data;
      },
      error => {
        console.error('Error fetching articles', error);
      }
    );
  }
  articlePage(data: any){
    this.router.navigate(['/article-page'], {queryParams: {data: JSON.stringify(data), journalistic_articles: JSON.stringify(this.home_data)}});
  }
}
