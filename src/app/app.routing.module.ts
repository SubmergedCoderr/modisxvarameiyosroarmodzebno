import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AnakokoComponent } from './anakoko/anakoko.component';
import { MusicsComponent } from './musics/musics.component';

const routes: Routes = [
  { path: '', component: MusicsComponent },
  { path: 'anakoko', component: MusicsComponent },
  { path: 'bye', component: MusicsComponent }
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
