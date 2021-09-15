import { Component, OnInit, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CarouselService {

  constructor(private http: HttpClient) {}

  getPlaying(): Observable<any> {
    const playing_url = 'http://localhost:3000/playing';

    console.log('playing request sent');
    return this.http.get(playing_url);
  }
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  providers: [CarouselService, NgbCarouselConfig],
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  isMobile: boolean;

  playing: any;

  constructor(private _service: CarouselService, config: NgbCarouselConfig) {
    // config.showNavigationArrows = false;
    // config.showNavigationIndicators = false;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {

    // check mobile
    if (window.screen.width < 400) {
      this.isMobile = true;
    }

    this.getPlaying();
  }

  getPlaying(): void {
    this._service.getPlaying()
    .subscribe((data: any) => this.playing = data);
  }

}

// export class NgbdCarouselBasic {
//   images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
// }
