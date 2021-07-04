import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestoranComponent } from './components/restoran/restoran.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { RestoraniService } from './services/restorani.service';
import { DetaljniPrikazComponent } from './components/detaljni-prikaz/detaljni-prikaz.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfilComponent } from './components/profil/profil.component';
import { KorisnikPregledComponent } from './components/korisnik-pregled/korisnik-pregled.component';
import { LokalPregledComponent } from './components/lokal-pregled/lokal-pregled.component';
import { LokalEditComponent } from './components/lokal-edit/lokal-edit.component';
import { AdminToolsComponent } from './components/admin-tools/admin-tools.component';
import { KorisnikControlComponent } from './components/korisnik-control/korisnik-control.component';
import { ModeratorControlComponent } from './components/moderator-control/moderator-control.component';
import { LokalModeratorComponent } from './components/lokalModerator/lokal-moderator/lokal-moderator.component';
import { StoreModule } from '@ngrx/store';
import { lokalReducer } from './store/lokal/lokal.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { LokalEffect } from './store/lokal/lokal.effects';
import { EffectsModule } from '@ngrx/effects';
import { korisnikReducer } from './store/korisnik/korisnik.reducer';
import { KorisnikEffect } from './store/korisnik/korisnik.effects';

@NgModule({
  declarations: [
    AppComponent,
    RestoranComponent,
    HomeComponent,
    DetaljniPrikazComponent,
    LoginComponent,
    RegisterComponent,
    ProfilComponent,
    KorisnikPregledComponent,
    LokalPregledComponent,
    LokalEditComponent,
    AdminToolsComponent,
    KorisnikControlComponent,
    ModeratorControlComponent,
    LokalModeratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    StoreModule.forRoot({ lokali: lokalReducer, korisnik: korisnikReducer }),
    StoreDevtoolsModule.instrument({maxAge: 25}),
    EffectsModule.forRoot([LokalEffect, KorisnikEffect])
  ],
  providers: [RestoraniService],
  bootstrap: [AppComponent]
})
export class AppModule { }
