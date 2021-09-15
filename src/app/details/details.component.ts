import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable, of, Subject } from 'rxjs';
// import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { mediaInfo } from '../mediaInfo'
// import { YouTubePlayerModule } from "@angular/youtube-player";
// import { switchMap } from 'rxjs/operators';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {faImdb} from '@fortawesome/free-brands-svg-icons';
import {faTwitter} from '@fortawesome/free-brands-svg-icons';
import {faFacebookSquare} from '@fortawesome/free-brands-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';

const url = 'https://cs571upup-be.wl.r.appspot.com';
// const url = 'http://localhost:3000';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
    type: 'success',
    message: 'Added to watchlist',
  }, {
    type: 'warning',
    message: 'Removed from watchlist',
  }
];

@Injectable()
export class DetailService {

  constructor(private http: HttpClient) {}

  getDetail(id: string, type: string): Observable<any> {
    const detail_url = url + '/detail/';

    console.log('detail request sent');
    return this.http.get(detail_url + type + '?id=' + id);
    // .map((response:any) => response.json())
    //                 .catch((error:any) => console.log(error));
  }

  getTrailer(id: string, type: string): Observable<any> {
    const trailer_url = url + '/trailer/';

    console.log('trailer request sent');
    return this.http.get(trailer_url + type + '?id=' + id);
  }

  getCast(id: string, type: string): Observable<any> {
    const cast_url = url + '/cast/';

    console.log('cast request sent');
    return this.http.get(cast_url + type + '?id=' + id);
  }

  getPerson(id: string): Observable<any> {
    const person_url = url + '/person/';

    console.log('person request sent');
    return this.http.get(person_url + id);
  }

  getExternal(id: string): Observable<any> {
    const external_url = url + '/external/';

    console.log('external request sent');
    return this.http.get(external_url + id);
  }

  getReview(id: string, type: string): Observable<any> {
    const review_url = url + '/review/';

    console.log('review request sent');
    return this.http.get(review_url + type + '?id=' + id);
  }

  getPopMovie(): Observable<any> {
    const popMovie_url = url + '/popMovie/';

    console.log('popMovie request sent');
    return this.http.get(popMovie_url);
  }

  getTopMovie(): Observable<any> {
    const topMovie_url = url + '/topMovie/';

    console.log('topMovie request sent');
    return this.http.get(topMovie_url);
  }

  getTrendMovie(): Observable<any> {
    const media_url = url + '/trendMovie/';
    console.log('trendMovie request sent');
    return this.http.get(media_url);
  }

  getPopTV(): Observable<any> {
    const media_url = url + '/popTV/';
    console.log('popTV request sent');
    return this.http.get(media_url);
  }

  getTopTV(): Observable<any> {
    const media_url = url + '/topTV/';
    console.log('topTV request sent');
    return this.http.get(media_url);
  }

  getTrendTV(): Observable<any> {
    const media_url = url + '/trendTV/';
    console.log('trendTV request sent');
    return this.http.get(media_url);
  }

  getRec(media: mediaInfo): Observable<any> {
    const media_url = url + '/rec/';
    console.log('recommended request sent');
    return this.http.get(media_url + media.type + '?id=' + media.id);
    // return this.http.get(media_url);
  }

  getSimilar(media: mediaInfo): Observable<any> {
    const media_url = url + '/similar/';
    console.log('similar request sent');
    return this.http.get(media_url + media.type + '?id=' + media.id);
    // return this.http.get(media_url);
  }
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  providers: [DetailService],
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  math = Math;

  isMobile: boolean;

  // for alert
  private _success = new Subject<string>();
  private _remove = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';
  removeMessage = '';

  // @ViewChild('staticAlert', {static: false}) staticAlert: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: NgbAlert;
  @ViewChild('removeAlert', {static: false}) removeAlert: NgbAlert;

  media_info: mediaInfo = {
    'id': '',
    'type': '',
  };

  watchlist: object = [];
  remove_order: number;

  return_detail: any;
  trailers: any;
  casts: any;
  person: any;
  external: any;
  reviews: any;

  closeResult = '';

  faImdb = faImdb;
  faTwitter = faTwitter;
  faFacebook = faFacebookSquare;
  faInstagram = faInstagram;

  constructor(private route: ActivatedRoute,
              private _service: DetailService,
              private modalService: NgbModal,
  ) {}

  getDetail(): void {
    this._service.getDetail(this.media_info.id, this.media_info.type)
    .subscribe((data: any) => this.return_detail = data);
  }

  getTrailer(): void {
    this._service.getTrailer(this.media_info.id, this.media_info.type)
    .subscribe((data: any) => this.trailers = data);
  }

  getCast(): void {
    this._service.getCast(this.media_info.id, this.media_info.type)
    .subscribe((data: any) => this.casts = data);
  }

  getReview(): void {
    this._service.getReview(this.media_info.id, this.media_info.type)
    .subscribe((data: any) => this.reviews = data);
  }

  setWatch(): void {

    const movies = JSON.parse(localStorage.getItem('movies'));

    if (this.remove_order < 0) {
      // add
      this.changeAddMessage();
      movies.push(this.media_info.type + this.media_info.id);
      localStorage.setItem('movies', JSON.stringify(movies));
      this.remove_order = 0;
    } else {
      // confirm exact remove index
      this.remove_order = this.checkExist();

      // remove
      this.changeRemoveMessage();
      movies.splice(this.remove_order, 1);
      localStorage.setItem('movies', JSON.stringify(movies));
      this.remove_order = -1;
    }

  }

  // return index number if exists, otherwise return -1
  checkExist(): number {

    console.log(localStorage.getItem('movies'));
    const movies = JSON.parse(localStorage.getItem('movies'));

    for (let i = 0; i < movies.length; i++) {
      if (movies[i] === this.media_info.type + this.media_info.id) {
        return i;
      }
    }

    return -1;

  }

  openLg(content, id) {
    this._service.getPerson(id)
    .subscribe((data: any) => this.person = data);

    this._service.getExternal(id)
    .subscribe((data: any) => this.external = data);

    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openSm(content, id) {
    this._service.getPerson(id)
    .subscribe((data: any) => this.person = data);

    this._service.getExternal(id)
    .subscribe((data: any) => this.external = data);

    this.modalService.open(content, {size: 'sm'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  loadWatchlist() {
    // init watchlist length if not already done
    if (localStorage.getItem('movies') === ''
    || localStorage.getItem('movies') === null )
    // || localStorage.getItem('movies') === '[]')
    {
      console.log('initialize watchlist:');
      console.log(JSON.stringify(this.watchlist));
      localStorage.setItem('movies', JSON.stringify(this.watchlist));
      this.remove_order = -1;
      // console.log(JSON.stringify(this.watchlist));
    } else {
      console.log('watchlist not empty:');
      console.log(localStorage.getItem('movies'));
      this.remove_order = this.checkExist();
    }

  }

  saveContinute(): void {
    // init continue watching if not already done
    if (localStorage.getItem('continue') === ''
    || localStorage.getItem('continue') === null )
    {
      console.log('initialize continue watching:');
      console.log(JSON.stringify(this.watchlist));
      localStorage.setItem('continue', JSON.stringify(this.watchlist));
    }

    const continue_watch = JSON.parse(localStorage.getItem('continue'));

    // check if already in continue watching
    for (let i = 0; i < continue_watch.length; i++) {
      if (continue_watch[i].id == this.media_info.id) {
        return;
      }
    }

    continue_watch.push(this.media_info);
    localStorage.setItem('continue', JSON.stringify(continue_watch));
    return;

  }

  public changeAddMessage() { this._success.next(`Added to watchlist`); }

  public changeRemoveMessage() { this._remove.next(`Removed from watchlist`); }

  ngOnInit(): void {

    // check mobile
    if (window.screen.width < 400) {
      this.isMobile = true;
    }

    this.media_info.type = this.route.snapshot.data['type'];
    this.media_info.id = this.route.snapshot.params['id'];
    this.getDetail();
    this.getTrailer();
    this.getCast();
    this.getReview();

    this.loadWatchlist();
    this.saveContinute();

    // setup alert
    // setTimeout(() => this.staticAlert.close(), 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this._remove.subscribe(message => this.removeMessage = message);
    this._remove.pipe(debounceTime(5000)).subscribe(() => {
      if (this.removeAlert) {
        this.removeAlert.close();
      }
    });

    // YouTube player
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);


  }

  // getters, prevent type errors
  // person could be undefined when user clicks on the cast card
  get personName() {
    return (this.person && this.person.name) ? this.person.name : null
  }

  get personPath() {
    return (this.person && this.person.profile_path) ? this.person.profile_path : null
  }

  get externalIMDB() {
    return (this.external && this.external.imdb_id) ? this.external.imdb_id : null
  }

  get externalTVR() {
    return (this.external && this.external.tvrage_id) ? this.external.tvrage_id : null
  }

  get externalFB() {
    return (this.external && this.external.facebook_id) ? this.external.facebook_id : null
  }

  get externalINS() {
    return (this.external && this.external.instagram_id) ? this.external.instagram_id : null
  }

  get externalTW() {
    return (this.external && this.external.twitter_id) ? this.external.twitter_id : null
  }

}
