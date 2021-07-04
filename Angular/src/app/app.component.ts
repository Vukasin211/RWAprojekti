import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { Korisnik } from './models/korisnik';
import { Restoran } from './models/restoran';
import { KorisnikService } from './services/korisnik/korisnik.service';
import { AppState } from './store/app-state';
import { ucitajLokale } from './store/lokal/lokal.actions';
import * as KorisnikSelector from 'src/app/store/korisnik/korisnik.selectors';
import * as KorisnikActions from 'src/app/store/korisnik/korisnik.actions';
import * as LokalSelector from 'src/app/store/lokal/lokal.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'SWEproj';

  profilNav: string | null = null;
  profilRoute: string | null = null;

  
  currentKorisnik: Korisnik | null = null;
  korisnici: Korisnik | null = null;
  currentSubscription: Subscription | null = null;
  currentLokalSubscription: Subscription | null = null;


  izlogujButton: boolean | null = null;
  loginButton: boolean | null = null;

  constructor(private store: Store<AppState>, private _korisnikService: KorisnikService){ }
    
  ngOnInit()
  {
    this.profilRoute = "register";
    this.store.dispatch(ucitajLokale());
    this.loginButton = true;

    let loginKorisnik = this._korisnikService.getUlogovanKorisnik();
    if(loginKorisnik !== null)
    {
      if(loginKorisnik.ime !== "")
      this.store.dispatch(KorisnikActions.logovanjeKorisnika({korisnik: loginKorisnik}));
    }

    this.currentSubscription = this.store.select(KorisnikSelector.selectUlogonaKorisnik).subscribe(
      (korisnik) => 
      {
        if(korisnik !== null)
        {
          console.log(korisnik);
          this.loguj(korisnik);
        }
      }   
    ) 
  }

  loguj(korisnik: Korisnik)
  {
    console.log(korisnik);
    if(korisnik === null)
    {    
      this.profilRoute = "register";
      this.izlogujButton = null;
      this.profilNav = "Registracija";
      this.loginButton = true;
    }
    
    else if(korisnik.ime === "" && korisnik.prezime === "")
    {
          this.profilRoute = "register";
          this.izlogujButton = null;
          this.profilNav = "Registracija";
          this.loginButton = true;
          
    }
    else if(korisnik)
    {
          console.log(korisnik);
          this.profilNav = korisnik.ime;
          this.loginButton = null;
          if(korisnik.uloga === "admin")
          {
            this.profilRoute = "admin";
            this.izlogujButton = true;
          }
          else if(korisnik.uloga === "moderator")
          {
            this.currentKorisnik = korisnik;
            this.profilRoute = "lokaliControl"
            this.izlogujButton = true;
          }
          else if(korisnik.ime !== "" && korisnik.prezime !== "")
          { 
            this.profilRoute = "profil";
            //this.store.dispatch(KorisnikActions.ulogujKorisnika({logId: korisnik.id}));
            this.izlogujButton = true;
          }
          this._korisnikService.setUlogovanKorisnik(korisnik);
    }
      
  }
  
  izloguj()
  {
    //this.store.dispatch(KorisnikActions.izlogovajeKorisnika(this._korisnikService.getUlogovanKorisnik()));
    this._korisnikService.korisnikLogOut();
    this.loguj(this._korisnikService.getUlogovanKorisnik());
  }

}
