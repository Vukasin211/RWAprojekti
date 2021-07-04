import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Korisnik } from 'src/app/models/korisnik';
import { AppState } from 'src/app/store/app-state';
import * as KorisnikSelector from 'src/app/store/korisnik/korisnik.selectors';
import * as KorisnikActions from 'src/app/store/korisnik/korisnik.actions';
import * as LokalSelector from 'src/app/store/lokal/lokal.selectors';
import * as LokalActions from 'src/app/store/lokal/lokal.actions';
import { Subscription } from 'rxjs';
import { Restoran } from 'src/app/models/restoran';

@Component({
  selector: 'app-korisnik-control',
  templateUrl: './korisnik-control.component.html',
  styleUrls: ['./korisnik-control.component.scss']
})
export class KorisnikControlComponent implements OnInit {

  //pretrazen: Korisnik | null = null;
  public korisnici$: Observable<readonly Korisnik []> = of([]);
  public pretrazen$: Observable<Korisnik | null> = of(null);

  public updateLokal: Restoran | null = null;

  currentSubscription: Subscription | null = null;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void 
  {
      this.store.dispatch(KorisnikActions.ucitavanjeKorisnika());
      this.korisnici$ = this.store.select(KorisnikSelector.selectKorisnike);
  }

  delete(korisnik: Korisnik)
  {
    console.log(korisnik.id);
    this.store.dispatch(KorisnikActions.brisiKorisnika({korisnikId: korisnik.id}));
  }

  search()
  {
    let temp = (<HTMLInputElement>document.querySelector(".usernameUnos")).value;

    let idPretrazenog = 0;

    /*
    korisnici.forEach((el, index) =>{
      if(el.username === temp)
        idPretrazenog = el.id;
    })
    */

    this.store.dispatch(KorisnikActions.selectKorisnik({korisnikId: idPretrazenog}))
    //this.pretrazen$ = this.store.select(KorisnikSelector.selectSelectedKorisnik);
  }

  deleteConcreate()
  {
    
  }

  unapredi(korisnikNext: Korisnik)
  {
    //let lokName = (<HTMLInputElement>document.querySelector(".imeRestorana")).value;
    let lokal = "";
    let kaficExist = false
    this.store.dispatch(KorisnikActions.unaprediKorisnika({korisnikId: korisnikNext.id, korisnik: korisnikNext}));
    
    //let noviModeratori = noviKorisnici;
   // noviModeratori = Object.assign([], noviModeratori);
    /*
    this.currentSubscription = this.store.select(LokalSelector.selectSviLokali).subscribe(
      (lokali) => 
      {
        if(lokali)
        {
          lokali.forEach((el, index) =>{
            if(el.naziv === lokName)
            {
              this.updateLokal = el;
              kaficExist = true;
            }
          })
          if(kaficExist != false && this.updateLokal)
          {
            let noviModeratori = this.updateLokal.moderators;
            noviModeratori = Object.assign([], noviModeratori);
            noviModeratori.push(korisnikNext);
            this.store.dispatch(LokalActions.dodajModeratora({lokalId: this.updateLokal.id, moderator: korisnikNext, newModerators: noviModeratori}));
          }
        }
      }
    )
      */
  }
}
