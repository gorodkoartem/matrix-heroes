import { Guid } from "guid-typescript";

export class Hero {
    constructor(name: string, ability: Ability, power: number) {
        this.id = Guid.create().toString();
        this.name = name;
        this.ability = ability;
        this.createdDate = new Date().toUTCString();
        this.power = power;
    }

    id: string;
    name: string;
    ability: Ability;
    createdDate: string;
    power: number;
}

export enum Ability {
    Attacker,
    Defender
}