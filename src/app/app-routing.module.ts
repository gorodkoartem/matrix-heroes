import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HeroesListComponent } from './components/heroesList.component';
import { HeroDetailsComponent } from './components/heroDetails.component';
import { LoginComponent } from './components/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HeroesListComponent, canActivate: [AuthGuard]},
  { path: 'heroes/:id', component: HeroDetailsComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
