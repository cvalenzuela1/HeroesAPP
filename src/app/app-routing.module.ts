import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './shared/pages/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './heroes/pages/home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "auth",
    loadChildren: () => import ("./auth/auth.module").then( m => m.AuthModule )
  },
  {
    path: "heroes",
    loadChildren: () => import ("./heroes/heroes.module").then( m => m.HeroesModule ),
    canLoad: [ AuthGuard ],
    canActivate: [AuthGuard]
  },
  {
    path: "404",
    component: ErrorPageComponent
  },
  {
    path: "**",
    redirectTo: "404"
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }