import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentServiceService } from '../comment-service.service';
import { RelatedArticlesServiceService } from '../related-articles-service.service';
import { HomeComponent } from '../home/home.component';
import { HomeServiceService } from '../home-service.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  home_data: any = [];
  article_id: any;
  current_article: any;
  comments: any = [];
  related: any = [];
  newComment: { name: string, email: string, content: string } = { name: '', email: '', content: '' };


  constructor(private commentService: CommentServiceService, private relatedArticlesService: RelatedArticlesServiceService, private homeService: HomeServiceService) {}

  ngOnInit(): void {
    this.article_id = parseInt(localStorage.getItem('article_id') || '0', 10);
    this.homeService.fetchArticles().subscribe(
      (data: any) => {
        this.home_data = data;
        for (const item of this.home_data) {
          if (item.unique_id === this.article_id) {
            this.current_article = item;
            this.loadComments();
            this.getRelatedArticles();
            break; // Exit the loop once the condition is met
          }
        }
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );

  }
  loadComments(): void {
    this.commentService.getComments(this.current_article._id).subscribe(
      (data) => this.comments = data,
      (error) => console.error('Error loading comments:', error)
    );
  }
  submitComment(): void {
    const newComment = {
        article_id: this.current_article._id,
        name: this.newComment.name,
        email: this.newComment.email,
        content: this.newComment.content
    };

    this.commentService.addComment(newComment).subscribe(
        (response) => {
            this.loadComments(); 
        },
        (error) => {
            console.error('Error adding comment:', error);
        }
    );
}
getRelatedArticles(): void {
  this.relatedArticlesService.getRelatedArticles(this.article_id).subscribe({
    next: (data) => {
      let value = data || [];
      this.related = value[0]
    },
    error: (error) => {
      console.error('Error loading related articles:', error);
    }
  });
}
  
}