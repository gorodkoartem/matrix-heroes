import { Component } from "@angular/core";
import { TrainersStore } from "../state/trainers.store";

@Component({
    selector: 'app-login',
    template: `
        <label for="traineremail">Email</label>
        <input id="traineremail" name="traineremail" type="email" [(ngModel)]="email" required>
        <br>
        <label for="trainerpassword">Password</label>
        <input id="trainerpassword" name="trainerpassword" type="password" [(ngModel)]="password" required>
        <br>
        <button (click)="login()">Log In</button>
        <button (click)="register()">Register</button>
    `
})
export class LoginComponent {
    email: string = "";
    password: string = "";

    constructor(private trainersStore: TrainersStore) {
    }

    login() {
        this.trainersStore.login(this.email, this.password);
    }

    register() {
        this.trainersStore.register(this.email, this.password);
    }
}