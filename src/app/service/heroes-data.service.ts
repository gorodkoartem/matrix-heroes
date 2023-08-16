import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../models/hero';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeroesDataService {
    private _heroesUrl: string = 'http://localhost:3000/heroes';

    constructor(private _httpClient: HttpClient) { }

    getHeroes(): Observable<Hero[]> {
        return this._httpClient.get<Hero[]>(this._heroesUrl);
    }

    getHero(heroId: string): Observable<Hero> {
        return this._httpClient.get<Hero>(`${this._heroesUrl}/${heroId}`);
    }

    addHero(hero: Hero): Observable<Hero> {
        return this._httpClient.post<Hero>(this._heroesUrl, hero);
    }

    deleteHero(heroId: string): Observable<any> {
        return this._httpClient.delete(`${this._heroesUrl}/${heroId}`);
    }

    updateHero(hero: Hero): Observable<Hero> {
        return this._httpClient.put<Hero>(`${this._heroesUrl}/${hero.id}`, hero);
    }
}