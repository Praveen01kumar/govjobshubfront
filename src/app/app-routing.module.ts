import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostdetailComponent } from './post-detail/postdetail.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: "", pathMatch: 'full', redirectTo: 'post' },
  { path: "post", component: HomeComponent },
  { path: 'post/:id', component: PostdetailComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
