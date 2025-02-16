import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { HeaderComponent } from './src/header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { BrowseComponent } from './browse/browse.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { JournalComponent } from './journal/journal.component';
import { SignUpComponent } from './signup/signup.component';
import { EditorsComponent } from './editors/editors.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { AccessibilityComponent } from './accessibility/accessibility.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeServiceService } from './home-service.service';
import { SignupServiceService } from './signup-service.service';
//import { CommentComponent } from './comment/comment.component';
import { ArticleListComponent } from './article-list/article-list.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'journal', component: JournalComponent },
  { path: 'signup', component: SignUpComponent},
  {path: 'editors', component:EditorsComponent},
  // Add more routes as needed
  {path: 'privacy-policy', component:PrivacyPolicyComponent},
  {path: 'accessibility', component:AccessibilityComponent},
  {path: 'article-page', component:ArticlePageComponent},
  {path: 'article-list', component:ArticleListComponent},
  { path: '**', component: NotFoundComponent } // Default route for unknown paths
];

@NgModule({ declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        NavbarComponent,
        HomeComponent,
        BrowseComponent,
        JournalComponent,
        SignUpComponent,
        EditorsComponent,
        PrivacyPolicyComponent,
        AccessibilityComponent,
        ArticlePageComponent,
        NotFoundComponent,
        ArticleListComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        RouterModule.forRoot(routes),
        AppRoutingModule,
        ReactiveFormsModule,MatFormFieldModule, FormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule], providers: [SignupServiceService, HomeServiceService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
