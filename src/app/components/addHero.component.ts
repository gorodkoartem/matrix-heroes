import { Component } from "@angular/core";
import { HeroesStore } from "../state/heroes.store";
import { Ability, Hero } from "../models/hero";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-add-hero',
    template: `
        <form #addHeroForm="ngForm" (ngSubmit)="addHero(addHeroForm)">
            <label for="heroname">Hero name</label>
            <input type="text" name="heroname" id="heroname" [(ngModel)]="name" required>
            <br>
            <label for="heroability">Hero ability</label>
            <select name="heroability" id="heroability"[(ngModel)]="ability" required>
                <option *ngFor="let option of abilityOptions">{{option}}</option>
            </select>
            <br>
            <label for="heropower">Hero power</label>
            <input type="number" name="heropower" id="heropower" min="0" [(ngModel)]="power" required>
            <br>
            <button type="submit">Add hero</button>
        </form>
    `
})
export class AddHeroComponent {
    name: string = "";
    ability: Ability = Ability.Attacker;
    abilityOptions = Object.values(Ability);
    power: number = 0;

    constructor(private heroesStore: HeroesStore) {
    }

    addHero(form: NgForm) {
        if (form.valid) {
            this.heroesStore.addHero(new Hero(this.name, this.ability, this.power))
            this.resetForm();
        }
    }

    private resetForm() {
        this.name = "";
        this.ability = Ability.Attacker;
        this.power = 0;
    }
}