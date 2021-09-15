import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { NgbdTypeaheadHttp } from './typeahead-http/typeahead-http.component';
import { HomepageComponent } from './homepage/homepage.component';
import {MyListComponent} from './my-list/my-list.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'watch/tv/:id', component: DetailsComponent,
    data:  {
      'type': 'tv',
      'id': '110'
    }
  },
  { path: 'watch/movie/:id', component: DetailsComponent,
    data:  {
      'type': 'movie',
      'id': '007'
    }
  },
  { path: 'watch', component: DetailsComponent,
    // children:[
    //   {
    //     path:'tv/:id',
    //     component: DetailsComponent,
    //     data: {'type': 'tv'}
    //   },
    //   {
    //     path:'movie/:id',
    //     component: DetailsComponent,
    //     data: {
    //       'type': 'movie',
    //       'id': '007'
    //     }
    //   }
    // ]
   },
  { path: 'wiki', component: NgbdTypeaheadHttp },
  { path: 'myList', component: MyListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
