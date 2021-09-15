import { Component, OnInit, Input } from '@angular/core';
import { movieDisplay } from '../movieDisplay';
import {DetailService} from '../details/details.component';
import { mediaInfo } from '../mediaInfo';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  providers: [DetailService, NgbCarouselConfig],
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  isMobile: boolean;

  image = 'https://cinemaone.net/images/movie_placeholder.png';

  math = Math;

  media_type: string;

  // movie_display: any[][] = []; // [] is important, makes the Array<any> work

  movie_display: Array<any> = [];
  Arr = Array;
  num: number = 0;

  other_display: Array<any> = []; // fill with results directly

  // {
  //   page: Number,
  //   results: Array,
  //   total_pages: Number,
  //   total_results: Number
  // }; // for all non-continue watching movies
  oArr = Array;
  other_num: number = 0;

  // media type lookup table
  id_type: any = {};


  // @Input() movie_content: string;
  @Input() header: string;
  @Input() media: mediaInfo;

  constructor(private _service: DetailService, config: NgbCarouselConfig) {
    // config.showNavigationArrows = false;
  }

  loadContinue() {
    if (this.header === "Continue Watching" && localStorage.getItem('continue') != null) {

      const continue_watch = JSON.parse(localStorage.getItem('continue'));

      this.num = Math.ceil(continue_watch.length / 6);
      // console.log('cont watch len / 6 is:' + this.num);

      for (let i = 0; i < continue_watch.length; i++) {

        // if (i % 6 == 0) {
        //   this.movie_display.push([]);
        // }
        // this.movie_display[i / 6].push([]);

        this.getDetail(continue_watch[i].type, continue_watch[i].id);
        this.id_type[continue_watch[i].id] = continue_watch[i].type; // store media type for lookup

      }
    }
  }

  loadMovies() {
    if (this.header === 'Popular Movies') {
      this.getPopMovie();
    } else if (this.header === 'Top Rated Movies') {
      this.getTopMovie();
    } else if (this.header === 'Trending Movies') {
      this.getTrendMovie();
    } else if (this.header === 'Popular TV Shows') {
      this.getPopTV();
    } else if (this.header === 'Top Rated TV Shows') {
      this.getTopTV();
    } else if (this.header === 'Trending TV Shows') {
      this.getTrendTV();
    } else if (this.header === 'Recommended') {
      this.getRec(this.media);
    } else if (this.header === 'Similar') {
      this.getSimilar(this.media);
    }


    else {
      console.log("ERROR: INCORRECT HEADER NAME!!!")
    }

    // this.other_num = this.other_display.results.length;
  }

  getDetail(type: string, id: string): void {
    this._service.getDetail(id, type)
    .subscribe((data: any) => this.movie_display.push(data));
  }

  getPopMovie(): void {
    this._service.getPopMovie()
    .subscribe((data: any) => this.other_display = data);
  }

  getTopMovie(): void {
    this._service.getTopMovie()
    .subscribe((data: any) => this.other_display = data);
  }

  getTrendMovie(): void {
    this._service.getTrendMovie()
    .subscribe((data: any) => this.other_display = data);
  }

  getPopTV(): void {
    this._service.getPopTV()
    .subscribe((data: any) => this.other_display = data);
  }

  getTopTV(): void {
    this._service.getTopTV()
    .subscribe((data: any) => this.other_display = data);
  }

  getTrendTV(): void {
    this._service.getTrendTV()
    .subscribe((data: any) => this.other_display = data);
  }

  getRec(media: mediaInfo): void {
    this._service.getRec(media)
    .subscribe((data: any) => this.other_display = data);
  }

  getSimilar(media: mediaInfo): void {
    this._service.getSimilar(media)
    .subscribe((data: any) => this.other_display = data);
  }


  ngOnInit(): void {

    // check mobile
    if (window.screen.width < 400) {
      this.isMobile = true;
    }

    if (this.header.includes("Movies")) {
      this.media_type = 'movie';
    } else if (this.header.includes("TV Shows")) {
      this.media_type = 'tv';
    }

    if (this.header === "Continue Watching") {
      // console.log("load continue watching...");
      this.loadContinue();
    } else {
      // console.log("load other types...");
      this.loadMovies();
    }

  }

}
