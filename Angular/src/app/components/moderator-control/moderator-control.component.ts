import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Observable } from 'rxjs';
import { Korisnik } from 'src/app/models/korisnik';
import { Moderator } from 'src/app/models/moderator';
import { Restoran } from 'src/app/models/restoran';
import { AppState } from 'src/app/store/app-state';
import * as KorisnikSelector from 'src/app/store/korisnik/korisnik.selectors'
import * as KorisnikActions from 'src/app/store/korisnik/korisnik.actions'

@Component({
  selector: 'app-moderator-control',
  templateUrl: './moderator-control.component.html',
  styleUrls: ['./moderator-control.component.scss']
})
export class ModeratorControlComponent implements OnInit {

  moderatori: Moderator[] = [];
  lokali: Restoran[] = [];
  pretrazen: Moderator | null = null;

  moderatori$: Observable<readonly Korisnik []> = of([]);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void 
  {
    this.store.dispatch(KorisnikActions.ucitavanjeKorisnika());
    this.moderatori$ = this.store.select(KorisnikSelector.selectModeratoreIzKorisnika);
  }

  delete(moderator: Korisnik)
  {
    this.store.dispatch(KorisnikActions.brisiKorisnika({korisnikId: moderator.id}));
  }

  dodajModeratora()
  {
    /*
    let username = (<HTMLInputElement>document.querySelector(".usernameUnos")).value
    let password = (<HTMLInputElement>document.querySelector(".passwordUnos")).value
    let lokal = (<HTMLInputElement>document.querySelector(".lokalUnos")).value
    

    let lokalFlag = false;
    let imeFlag = true;

    if(username !== "" && password !== "")
    {
      this.moderatori.forEach((el, index) =>{
        if(el.username === username)
        {
          imeFlag = false;
        }
      });
    }

    if(lokal !== "")
    {
      this.lokali.forEach((el, index) =>{
        if(el.naziv === lokal)
        {
          lokalFlag = true;
        }
      });
    }

    if(imeFlag !== true)
    {
      alert("Nevalidno ime");
    }
    else if(lokalFlag === false)
    {
      alert("Ne postoji lokal za unetog moderatora");
    }
    else if(lokalFlag === true && imeFlag === true)
    {
      let mod = new Moderator(username, password);
      
      this.lokali.forEach((el, index) =>{
        if(el.naziv === lokal)
        {
          mod.setLokal(el);
          //el.setModerator(mod);
          console.log(el);
        }
      });
      this.moderatori.push(mod);
    }
    */
  }

  search()
  {
    let temp = (<HTMLInputElement>document.querySelector(".usernameModeratorUnos")).value;

    this.moderatori.forEach(el =>{

      console.log(el.username);

      if(el.username === temp)
      {
        this.pretrazen = el;
      }
    })    
  }

  deleteConcreate()
  {
    this.moderatori.forEach((el, index) =>{
      if(el === this.pretrazen)
      {
        this.moderatori.splice(index,1);
      }
    })
  }
}
