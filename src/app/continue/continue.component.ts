import { Component, OnInit } from '@angular/core';
import { movieDisplay } from '../movieDisplay';

@Component({
  selector: 'app-continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.css']
})
export class ContinueComponent implements OnInit {
  image = 'https://cinemaone.net/images/movie_placeholder.png';

  // movie: movieDisplay = {
  //   id: 1,
  //   amount: 1,
  //   name: 'Game of Thrones',
  //   style: 'margin: 10px'
  // };

  constructor() { }

  ngOnInit(): void {
  }

}
