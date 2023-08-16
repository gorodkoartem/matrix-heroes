import { Component, OnDestroy, OnInit } from "@angular/core";
import { HeroesStore } from "../state/heroes.store";
import { ActivatedRoute, Params } from "@angular/router";
import { Ability, Hero } from "../models/hero";

@Component({
    selector: 'app-hero-details',
    template: `
        <a routerLink="">Back</a>
        <h3>Hero Details</h3>
        <section *ngIf="hero">
            <form (ngSubmit)="editHero()">
                <label for="heroid">Hero id</label>
                <input type="text" name="heroid" id="heroid" [(ngModel)]="hero.id" disabled>
                <br>
                <label for="herocreated">Hero created date</label>
                <input type="text" name="herocreated" id="herocreated" [(ngModel)]="hero.createdDate" disabled>
                <br>
                <label for="heroname">Hero name</label>
                <input type="text" name="heroname" id="heroname" [(ngModel)]="hero.name" required>
                <br>
                <label for="heroability">Hero ability</label>
                <select name="heroability" id="heroability"[(ngModel)]="hero.ability" required>
                    <option *ngFor="let option of abilityOptions">{{option}}</option>
                </select>
                <br>
                <label for="heropower">Hero power</label>
                <input type="number" name="heropower" id="heropower" min="0" [(ngModel)]="hero.power" required>
                <br>
                <button type="submit">Save changes</button>
            </form>
        </section>
    `
})
export class HeroDetailsComponent implements OnInit, OnDestroy {
    hero: Hero | undefined = undefined;
    abilityOptions = Object.values(Ability);

    private heroSub: any;
    private paramsSub: any;

    constructor(private heroesStore: HeroesStore, private route: ActivatedRoute) {
    }

    editHero() {
        if (this.hero) {
            this.heroesStore.updateHero(this.hero);
        }
    }

    ngOnInit() {
        this.paramsSub = this.route.params.subscribe(params => {
            this.heroSub = this.heroesStore.getHero(params['id'])
                .subscribe((hero) => this.hero = hero);
        })
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
        this.heroSub.unsubscribe();
    }
}