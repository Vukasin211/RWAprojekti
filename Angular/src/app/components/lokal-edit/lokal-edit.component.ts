import { Component, OnInit } from '@angular/core';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Restoran } from 'src/app/models/restoran';
import { RestoraniService } from 'src/app/services/restorani.service';
import { AppState } from 'src/app/store/app-state';
import { selectSelectedLokal, selectSelectedLokalEvent, selectSelectedLokalId } from 'src/app/store/lokal/lokal.selectors';
import * as LokalActions from 'src/app/store/lokal/lokal.actions';
import * as LokalSelector from 'src/app/store/lokal/lokal.selectors';
import * as KorisnikSelector from 'src/app/store/korisnik/korisnik.selectors';
import { Sto } from 'src/app/models/sto';
import { galerija } from 'src/app/models/galerija';
import { Subscription } from 'rxjs';
import { Korisnik } from 'src/app/models/korisnik';
@Component({
  selector: 'app-lokal-edit',
  templateUrl: './lokal-edit.component.html',
  styleUrls: ['./lokal-edit.component.scss']
})
export class LokalEditComponent implements OnInit {

  //public restoran: Restoran;
  public restoran$: Observable<Restoran | null> = of(null);
  public event$: Observable<string | null> = of(null);
  public mapSubbscripiton: Subscription | null = null;
  public imenaKorisnikaRezervacije: string[] | null = [];
  public kornsici: Korisnik[] = [];
  public stolovi: Sto[] | null = [];

  public currentSubscription: Subscription | null = null;

  constructor(private store: Store<AppState>) { }

  faStarHalf = faStarHalf;
  faStar = faStar;

  ngOnInit(): void {

    this.restoran$ = this.store.select(selectSelectedLokal);
    
    let nesto = (<HTMLInputElement>document.querySelector(".dogadjajUnos"));

    this.currentSubscription = this.store.select(KorisnikSelector.selectSviKorisnici).subscribe(
      (korisnici) => {
        this.kornsici = korisnici;
      }
    )

    this.currentSubscription = this.store.select(LokalSelector.selectSelectedLokalStolovi).subscribe(
      (stolovi) => {
        this.stolovi = stolovi;
        this.rezervacijeNameCalc();
      }
    )
  }

  otvoriSliku(slika: galerija, restoran: Restoran)
  {
    //window.open(slika,"_blank");
  }

  rezervacijeNameCalc()
  {
    if(this.stolovi)
    this.stolovi.forEach((el, index) =>{
      let rezervisanFlag = false;
      this.kornsici.forEach((korisik, index) =>{
        if(el.korisnikId === korisik.id && el.korisnikId !== 27)
        {
          this.imenaKorisnikaRezervacije?.push(korisik.username);
          rezervisanFlag = true
        }
      })
       if(rezervisanFlag === false)
       {
         this.imenaKorisnikaRezervacije?.push("");
       }
    })
  }

  klik()
  {
    window.open('https://www.google.com/search?tbs=lf:1,lf_ui:9&tbm=lcl&sxsrf=ALeKk00_C_G5WFvkq3QUFZ4b9s3GWqWm1g:1621332594752&q=tramvaj+nis&rflfq=1&num=10&ved=2ahUKEwjqwv3K_tLwAhXL5KQKHV9DDj0QtgN6BAgIEAc#rlfi=hd:;si:;mv:[[43.3200771,21.8951761],[43.319936299999995,21.8951101]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!1m4!1u1!2m2!1m1!1e1!1m4!1u1!2m2!1m1!1e2!2m1!1e2!2m1!1e1!2m1!1e3!3sIAE,lf:1,lf_ui:9',"_blank");
  }

  deleteImage(galerija: galerija, restoran: Restoran)
  {
    this.store.dispatch(LokalActions.obrisiSelektovanuSlikuLokala({slikaId: galerija.id, lokalId: restoran.id}));
    console.log(galerija);
  }

  dodajSliku(restoran: Restoran, newSlike: galerija[])
  {
    let temp = <string>(<HTMLInputElement>document.querySelector(".slikaUnos")).value;
    newSlike = Object.assign([], newSlike);
    newSlike.push(new galerija(0, temp, restoran.id));
    this.store.dispatch(LokalActions.dodajSelektovanomLokaluSliku({slika: new galerija(0, temp, restoran.id), novaGalerija: newSlike, lokalId: restoran.id}))
  }

  dodajSto(kapacitet: number, restoran: Restoran, stolovi: Sto[])
  {
    stolovi = Object.assign([], stolovi);
    let noviSto = new Sto(0, restoran.id, kapacitet, "false");
    stolovi.push(noviSto);
    this.store.dispatch(LokalActions.dodajStoSelektovanomLokalu({lokalId: restoran.id,sto: noviSto, noviStolovi: stolovi}));
  }

  deleteSto(restoran: Restoran, sto: Sto)
  {
    this.store.dispatch(LokalActions.obrisiStoUlokalu({lokalId: restoran.id, sto: sto}));
  }

  otvoriMapu(mapa: string)
  {
    
  }
  
  dodajMapu(restoran: Restoran)
  {
    let tempLokal;
    let mapa = <string>(<HTMLInputElement>document.querySelector(".mapUnos")).value;
    this.store.dispatch(LokalActions.izmeniLokalMapa({lokalId: restoran.id, newLokal: restoran, mapaURL: mapa}));
    this.mapSubbscripiton = this.store.select(LokalSelector.selectSviLokali).subscribe(
      (lokali) => 
      {
        if(lokali)
        {
         lokali.forEach((el,index) =>{
           if(el.id === restoran.id)
           {
             tempLokal = el;
           }
         })    
        }
      }   
    )
    if(tempLokal)
    this.store.dispatch(LokalActions.dbmsMapa({newLokal: tempLokal, lokalId: restoran.id}))
  }

  izmeniDogadjaj(restoran: Restoran)
  {
    let event = <string>(<HTMLInputElement>document.querySelector(".dogadjajUnos")).value;
    this.store.dispatch(LokalActions.dodavanjeDogadjaja({lokal: restoran, noviDogadjaj: event, lokalId: restoran.id}))
  }
}
