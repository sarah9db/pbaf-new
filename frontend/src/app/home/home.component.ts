import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeServiceService } from '../home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  early_view_data: any = [];
  home_data: any = [];
  main_card: any;
  lower_card: any[] = [];
  side_card: any[] = [];
  latest_news_data: any = [];
  isLoading = true;

  constructor(private router: Router, private homeService: HomeServiceService) {}

  ngOnInit(): void {
    localStorage.removeItem('article_id')
    this.loadData();
  }

  loadData(): void {

    // Fetch articles
    this.homeService.fetchArticles().subscribe(
      (data: any) => {
        console.log('Fetched articles:', data);
        this.home_data = data;
        this.categorizeArticles();
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );

    // Fetch latest news
    this.homeService.fetchLatestNews().subscribe(
      (data: any) => {
        console.log('Fetched latest news:', data);
        this.latest_news_data = data;
      },
      (error) => console.error('Error fetching latest news:', error)
    );

    // Fetch early view data
    this.homeService.earlyViewFetch().subscribe(
      (data: any) => {
        console.log('Fetched early view items:', data);
        this.early_view_data = data;
      },
      (error) => console.error('Error fetching early view items:', error)
    );
  }

  categorizeArticles(): void {
    this.main_card = null;
    this.lower_card = [];
    this.side_card = [];

    this.home_data.forEach((item: any) => {
      console.log('Processing item:', item);
      if (item.unique_id === 4) {
        this.main_card = item;
      } else if (item.unique_id === 5 || item.unique_id === 6) {
        this.lower_card.push(item);
      } else {
        this.side_card.push(item);
      }
    });

    console.log('Categorized articles:', {
      main_card: this.main_card,
      lower_card: this.lower_card,
      side_card: this.side_card
    });
  }

  articlePage(article: any): void {
    console.log('Navigating to article:', article);
    localStorage.setItem('article_id', article)
    this.router.navigate(['/article-page']);
  }
}














