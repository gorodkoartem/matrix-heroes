import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TrainersStore } from '../state/trainers.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    private loggedIn = false;

    constructor(private router: Router, private trainerStore: TrainersStore) {
        trainerStore.loggedIn.subscribe(val => this.loggedIn = val);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.loggedIn) {
            return true;
        }

        this.trainerStore.redirectUrl = state.url;

        this.router.navigate(['/login']);
        return false;
    }
}