import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpotListComponent } from './spot-list/spot-list.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: '', component: SpotListComponent},
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
