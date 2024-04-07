import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotListComponent } from './spots/spot-list/spot-list.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { SpotDetailsComponent } from './spots/spot-details/spot-details.component';
import { AddSpotComponent } from './spots/add-spot/add-spot.component';
import { AddSpotSuccessComponent } from './spots/add-spot-success/add-spot-success.component';

const routes: Routes = [
  { path: '', component: SpotListComponent },
  { path: 'spots', component: SpotListComponent },
  { path: 'spots/:id', component: SpotDetailsComponent },
  { path: 'add-spot', component: AddSpotComponent },
  { path: 'about', component: AboutComponent },
  { path: 'add-spot-success', component: AddSpotSuccessComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
