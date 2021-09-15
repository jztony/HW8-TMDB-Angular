import { Component, Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

// list storing results to be displayed
const movies = ["Game of Thrones", "Avengers"];

const url = 'http://localhost:3000';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  search(term: string) {

    const search_url = url + '/search';

    console.log('search started');

    if (term === '') {
      return of([]);
    }

    // return this.http
    //   .get<[any, string[]]>(search_url, {params: PARAMS.set('search', term)}).pipe(
    //     map(response => response[1])
    //   );

    // show movie titles
    return this.http.get<[any, string[]]>(search_url, {params: PARAMS.set('search', term)}).pipe(
      map(response => response[1])
    );

    // show backdrop
    // return this.http.get<[any, string[]]>(search_url, {params: PARAMS.set('search', term)}).pipe(
    //   map(response => '<img src="https://image.tmdb.org/t/p/w92' + response[1] + '">')
    // );
  }

  // testSearch(): Observable<JSON> {
  //   const response = this.http.get<JSON>(url + '/test');
  //   console.log(response);
  //   return response;
  // }
}

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  providers: [SearchService],
  styleUrls: ['./search-bar.component.css'],
  // styles: ['.form-control { width: 300px; border: none; border-bottom: 2px black solid;}']
})
export class SearchBarComponent {

  public model: any;
  searching = false;
  searchFailed = false;

  constructor(private _service: SearchService) {}

  search = (text$: Observable<string>) => {
  // search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // map(term => term.length < 2 ? []
      //   : movies.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))

      switchMap(
        (searchText) => this._service.search(searchText)
        .pipe(
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      )
          // catchError(new errorInfo().parseObservableResponseError)
    );
  }

  formatter = (x: {name: string}) => x.name;

    // handle response?

}
