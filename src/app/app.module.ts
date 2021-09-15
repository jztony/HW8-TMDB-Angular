import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ContinueComponent } from './continue/continue.component';
import { NgbdTypeaheadHttp } from './typeahead-http/typeahead-http.component';
import { AppRoutingModule } from './app-routing.module';
import { DetailsComponent } from './details/details.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyListComponent } from './my-list/my-list.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    SearchBarComponent,
    CarouselComponent,
    ContinueComponent,
    NgbdTypeaheadHttp,
    DetailsComponent,
    HomepageComponent,
    MyListComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    YouTubePlayerModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
