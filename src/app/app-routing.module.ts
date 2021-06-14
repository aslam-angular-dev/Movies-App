import { MoviesComponent } from './movies/movies.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './shared/auth-guard.guard';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
    // data: { animationState: 'Login' }
  },
  {
    path:"movies",
    component:MoviesComponent,
    canActivate:[AuthGuard]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
