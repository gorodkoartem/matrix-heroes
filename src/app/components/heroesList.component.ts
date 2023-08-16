import { Component, OnInit } from "@angular/core";
import { HeroesStore } from "../state/heroes.store";
import { Observable, map } from "rxjs";
import { Hero } from "../models/hero";
import { List } from 'immutable';

@Component({
    selector: 'app-heroes',
    template: `
        <section>
            <app-add-hero></app-add-hero>
            <br>
            <label>All heroes</label>
            <br>
                <button (click)="sortHeroes()">Sort by power</button>
            <br>
            <ul>
                <li *ngFor="let hero of heroes | async">
                    <a [routerLink]="'heroes/' + hero.id">
                        <span>
                            <span>{{hero.id}}</span>
                            <p>{{hero.name}}</p>
                        </span>
                    </a>
                    <button (click)="deleteHero(hero.id)">Delete</button>
                </li>
            </ul>
        </section>
    `
})
export class HeroesListComponent implements OnInit {
    heroes: Observable<List<Hero>>;

    private sorted: boolean = false;

    constructor(private heroesStore: HeroesStore) {
        this.heroes = heroesStore.heroes;
    }

    ngOnInit() {
        this.heroesStore.loadData();
    }

    deleteHero(id: string) {
        this.heroesStore.deleteHero(id)
    }

    sortHeroes() {
        if (!this.sorted) {
            this.heroes = this.heroes.pipe(
                map(res => res.sort((h1, h2) => h1.power - h2.power))
            );

            this.sorted = true;
        }
    }
}