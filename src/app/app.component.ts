import { Component } from '@angular/core';
import { TrainersStore } from './state/trainers.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <button *ngIf="loggedIn | async" (click)="logout()">Log Out</button>
    <hr>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  loggedIn: Observable<boolean> = new Observable<boolean>();

  constructor(private trainersStore: TrainersStore) {
    this.loggedIn = trainersStore.loggedIn;
  }

  logout() {
    this.trainersStore.logout();
  }
}
