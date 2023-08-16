import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HeroesListComponent } from './components/heroesList.component';
import { HeroDetailsComponent } from './components/heroDetails.component';
import { HeroesStore } from './state/heroes.store';
import { FormsModule } from '@angular/forms';
import { AddHeroComponent } from './components/addHero.component';
import { LoginComponent } from './components/login.component';
import { TrainersStore } from './state/trainers.store';
import { AppConfigService } from './service/app-config.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroDetailsComponent,
    AddHeroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HeroesStore, TrainersStore,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
