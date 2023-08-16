import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer } from '../models/trainer';
import { AppConfigService } from './app-config.service';

@Injectable({
    providedIn: 'root'
})
export class TrainersDataService {
    private _trainersUrl: string;

    constructor(private _httpClient: HttpClient, config: AppConfigService) {
        this._trainersUrl = `${config.apiBaseUrl}/trainers`;
    }

    getTrainer(trainer: string): Observable<Trainer> {
        return this._httpClient.get<Trainer>(`${this._trainersUrl}/${trainer}`);
    }

    addTrainer(trainer: Trainer): Observable<Trainer> {
        return this._httpClient.post<Trainer>(this._trainersUrl, trainer);
    }
}