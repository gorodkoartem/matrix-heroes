import { Injectable } from "@angular/core";
import { TrainersDataService } from "../service/trainers-data.service";
import * as crypto from "crypto-js";
import { Trainer } from "../models/trainer";
import { BehaviorSubject } from "rxjs";
import { asObservable } from "../utils/asObservable";
import { Router } from "@angular/router";

@Injectable()
export class TrainersStore {
    private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public redirectUrl: string | undefined = undefined;

    get loggedIn() { return asObservable(this._loggedIn); }

    constructor(private trainerService: TrainersDataService, private router: Router) {
    }

    login(id: string, password: string) {
        this.trainerService.getTrainer(id)
            .subscribe(trainer => {
                if (this.redirectUrl) {
                    this.router.navigate([this.redirectUrl]);
                    this.redirectUrl = undefined;
                }

                return this._loggedIn.next(trainer.password === crypto.SHA256(password).toString())
            });
    }

    logout() {
        this._loggedIn.next(false);
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['/login']));
    }

    register(id: string, password: string) {
        this.trainerService.addTrainer(new Trainer(id, crypto.SHA256(password).toString()))
            .subscribe(trainer => {
                if (this.redirectUrl) {
                    this.router.navigate([this.redirectUrl]);
                    this.redirectUrl = undefined;
                }

                return this._loggedIn.next(true)
            });
    }
}