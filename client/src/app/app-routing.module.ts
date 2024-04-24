import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotListComponent } from './spots/spot-list/spot-list.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { SpotDetailsComponent } from './spots/spot-details/spot-details.component';
import { AddSpotComponent } from './spots/add-spot/add-spot.component';
import { EditSpotComponent } from './spots/edit-spot/edit-spot.component';
import { SpotListModerationComponent } from './spots/spot-list-moderation/spot-list-moderation.component';
import { ActionFeedbackComponent } from './feedback/action-feedback/action-feedback.component';
import { ReviewsModerationComponent } from './reviews/reviews-moderation/reviews-moderation.component';

const routes: Routes = [
  { path: '', component: SpotListComponent },
  { path: 'spots', component: SpotListComponent },
  { path: 'spots-moderation', component: SpotListModerationComponent },
  { path: 'spots/:id', component: SpotDetailsComponent },
  { path: 'edit-spot/:id', component: EditSpotComponent },
  { path: 'reviews-moderation', component: ReviewsModerationComponent },
  { path: 'add-spot', component: AddSpotComponent },
  { path: 'about', component: AboutComponent },
  { path: 'action-feedback', component: ActionFeedbackComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
