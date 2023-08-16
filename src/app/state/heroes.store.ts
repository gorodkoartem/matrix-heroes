import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, map } from "rxjs";
import { Hero } from "../models/hero";
import { List } from 'immutable';
import { HeroesDataService } from "../service/heroes-data.service";
import { asObservable } from "../utils/asObservable";

@Injectable()
export class HeroesStore {
    private _heroes: BehaviorSubject<List<Hero>> = new BehaviorSubject<List<Hero>>(List<Hero>([]));

    constructor(private _heroDataService: HeroesDataService) {
    }

    loadData() {
        this._heroDataService.getHeroes()
            .subscribe({
                next: res => { this._heroes.next(List(res)) },
                error: err => console.log("Error on heroes retrieving")
            });
    }

    get heroes() {
        return asObservable(this._heroes);
    }

    getHero(heroId: string) {
        return this.heroes.pipe(map(heroes => heroes.find(hero => hero.id === heroId)));
    }

    addHero(newHero: Hero) {
        let observable = this._heroDataService.addHero(newHero);
        observable.subscribe(res => this._heroes.next(this._heroes.getValue().push(newHero)));
        return observable;
    }

    deleteHero(heroId: string) {
        let observable = this._heroDataService.deleteHero(heroId);
        observable.subscribe(res => {
            let heroes = this._heroes.getValue();
            let heroIndex = heroes.findIndex((hero) => hero.id === heroId);
            this._heroes.next(heroes.delete(heroIndex));
        });
        return observable;
    }

    updateHero(updatedHero: Hero) {
        let observable = this._heroDataService.updateHero(updatedHero);
        observable.subscribe(res => {
            let heroes = this._heroes.getValue();
            let heroIndex = heroes.findIndex((hero) => hero.id === res.id);
            this._heroes.next(heroes.set(heroIndex, res));
        });
        return observable;
    }
}