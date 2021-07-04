import { Component, OnInit } from '@angular/core';
import { Restoran } from 'src/app/models/restoran';
import { RestoraniService } from 'src/app/services/restorani.service';
import { faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';
import * as LokalSelector from 'src/app/store/lokal/lokal.selectors';
import * as LokalActions from 'src/app/store/lokal/lokal.actions';
import * as KorisnikSelector from 'src/app/store/korisnik/korisnik.selectors';
import * as KorisnikActions from 'src/app/store/korisnik/korisnik.actions';
import { Observable, of } from 'rxjs';
import { Korisnik } from 'src/app/models/korisnik';
import { selectSelectedLokal } from 'src/app/store/lokal/lokal.selectors';
import { Subscription } from 'rxjs';
import { Sto } from 'src/app/models/sto';
import { galerija } from 'src/app/models/galerija';
import { KorisnikService } from 'src/app/services/korisnik/korisnik.service';

@Component({
  selector: 'app-detaljni-prikaz',
  templateUrl: './detaljni-prikaz.component.html',
  styleUrls: ['./detaljni-prikaz.component.scss']
})
export class DetaljniPrikazComponent implements OnInit {

  restoran$ : Observable<Restoran | null> = of(null);
  currentSubscription: Subscription | null = null;
  currentKorisnikSubscription: Subscription | null = null;
  localLokal: Restoran | null = null;
  sendSto: Sto | null = null;

  eventFlag: boolean | null = null;

  korisnik: Korisnik | null = null;
  localStorageKorisnik: Korisnik | null = null;
  stoZa2: number;
  stoZa4: number;
  stoZa6: number;
  separe: number;
  kapacitet: number;
  zauzeto: number;

  constructor(private store: Store<AppState>, private _korisnikService: KorisnikService)
  { 
    this.stoZa2 = 0;
    this.stoZa4 = 0;
    this.stoZa6 = 0;
    this.separe = 0;
    this.kapacitet = 0;
    this.zauzeto = 0;
  }

  faStarHalf = faStarHalf;
  faStar = faStar;

  ngOnInit(): void {

    this.restoran$ = this.store.select(LokalSelector.selectSelectedLokal);
    this.currentSubscription = this.store.select(LokalSelector.selectSelectedLokal).subscribe(
      (lokal) => {
        this.localLokal = lokal;
        if(this.localLokal)
        {
          this.slobodniStolovi(this.localLokal.stos);
          this.slobodnaMesta(this.localLokal.stos)
          if(this.localLokal.dogadjaj !== "nema")
          {
            this.eventFlag = true;
          }
        }
      }
    )

    /*
    this.currentKorisnikSubscription = this.store.select(KorisnikSelector.selectUlogonaKorisnik).subscribe(
      (korisnik) => {
        this.korisnik = korisnik;
      }
    )
    */
      this.korisnik = this._korisnikService.getUlogovanKorisnik();
  }

  slobodnaMesta(stolovi: Sto[])
  {
    this.kapacitet = 0;
    this.zauzeto = 0;
    if(stolovi)
    {
      stolovi.forEach((el, index) => {
        this.kapacitet = this.kapacitet + el.brojOsoba;
        if(el.rezervisan === "true")
        {
          this.zauzeto = this.zauzeto + el.brojOsoba;
        }
      })
    }
  }

  slobodniStolovi(stolovi: Sto[])
  {
    this.stoZa2 = 0;
    this.stoZa4 = 0;
    this.stoZa6 = 0;
    this.separe = 0;
    if(stolovi)
    {
      stolovi.forEach((el, index) =>{
        if(el.rezervisan === "false")
        {
          if(el.brojOsoba === 2)
          {
            this.stoZa2++;
          }
          if(el.brojOsoba === 4)
          {
            this.stoZa4++;
          }
          if(el.brojOsoba === 6)
          {
            this.stoZa6++;
          }
          if(el.brojOsoba=== 10)
          {
            this.separe++;
          }
        }
      });
    }  
  }

  otvoriSliku(slikaURL: string)
  {
    window.open(slikaURL,"_blank");
  }

  otvoriMapu(mapaURL: string)
  {
    window.open("https://www.google.rs/maps/search/mapa/@43.3158715,21.8888793,14.67z?dcr=0","_blank");
  }

  rezervisiSto(kolicina: number, stolovi: Sto[])
  {
    
    let rezervacijaCheck = false;
    let noviStolovi = stolovi;
    noviStolovi = Object.assign([], noviStolovi);
    noviStolovi.forEach((el, index) =>{
      if(el.rezervisan === "false" && el.brojOsoba === kolicina)
      {
        let tempSto = new Sto(el.id, el.kaficId, el.brojOsoba, "true");
        noviStolovi.splice(index, 1);
        noviStolovi.push(tempSto);
        rezervacijaCheck = true;
        this.sendSto = tempSto;
      }
    })

    if(this.localLokal && rezervacijaCheck !== false && this.sendSto)
    {
      alert("Uspesno ste rezervisali sto");
      this.localStorageKorisnik = this._korisnikService.getUlogovanKorisnik();
      if(this.localStorageKorisnik)
      this.store.dispatch(LokalActions.rezervisiStoUlokalu({lokalId: this.localLokal.id, brOsova: kolicina, stolovi: noviStolovi, sto: this.sendSto, korisnikId: this.localStorageKorisnik.id}))
    }

    this.slobodniStolovi(noviStolovi);
  }

  otkaziRezervaciju(brOsoba: number, stolovi: Sto[])
  {
    let stoId = 0;
    let rezervacijaCheck = false;
    let newStolovi = stolovi;
    newStolovi = Object.assign([], newStolovi);

    this.localStorageKorisnik = this._korisnikService.getUlogovanKorisnik();
      newStolovi.forEach((el, index) =>{
        if(this.localStorageKorisnik)
        {
          if(el.korisnikId === this.localStorageKorisnik.id && el.rezervisan === "true" && el.brojOsoba === brOsoba)
          {
            alert("Uspesno ste otkazali rezervaciju");
            stoId = el.id;
            this.store.dispatch(LokalActions.otkazivanjeRezervacije({sto: el, stoRezervacijaId: stoId, lokalId: this.localStorageKorisnik.id, noviStolovi: stolovi}));
          }
        }
      })
  }

  oceni(ocena: number)
  {
    this.localStorageKorisnik = this._korisnikService.getUlogovanKorisnik();
    if(this.localLokal && this.localStorageKorisnik)
    {
      
      this.store.dispatch(LokalActions.oceniLokal({lokalId:this.localLokal.id, ocena: ocena, lokal: this.localLokal, korisnikId: this.localStorageKorisnik.id}))
    }
    
  }
}
