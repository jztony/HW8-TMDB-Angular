import { Component, OnInit } from '@angular/core';
import { DetailService } from '../details/details.component';
import { mediaInfo } from '../mediaInfo';

@Component({
  selector: 'app-my-list',
  providers: [DetailService],
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  has_media: boolean = false;
  movies: any;
  results: any = [];
  media_info: Array<mediaInfo> = [];
  temp: mediaInfo = {
    'id': '',
    'type': '',
  };
  Arr = Array;
  math = Math;

  constructor(private _service: DetailService,) {}

  loadWatchlist() {
    // init watchlist length if not already done
    if (localStorage.getItem('movies') == ('' || '[]')) {
      this.has_media = false;
      // console.log(JSON.stringify(this.watchlist));
    } else {
      this.has_media = true;
      this.movies = JSON.parse(localStorage.getItem('movies'));

      const regL = /^[a-zA-Z]+/;
      const regN = /\d+/g;

      for (let i = 0; i < this.movies.length; i++) {

        console.log('Matching ' + this.movies[i]);
        const type = this.movies[i].match(regL)[0];
        const id = this.movies[i].match(regN)[0];

        this.temp.type = type;
        this.temp.id = id;
        this.media_info.push(this.temp);

        this.getDetail(type, id);
      }

      // console.log('watchlist not empty:');
      // console.log(localStorage.getItem('movies'));
    }
  }

  getDetail(type: string, id: string): void {
    this._service.getDetail(id, type)
    .subscribe((data: any) => this.results.push(data));
  }

  ngOnInit(): void {
    this.loadWatchlist();
  }

}
