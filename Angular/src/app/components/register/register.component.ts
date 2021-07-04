import { Component, OnInit} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik/korisnik.service';
import * as KorisnikSelector from 'src/app/store/korisnik/korisnik.selectors';
import * as KorisnikActions from 'src/app/store/korisnik/korisnik.actions'
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public korisnici$: Observable<readonly Korisnik[]> = of([]);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void 
  {
    this.korisnici$ = this.store.select(KorisnikSelector.selectSviKorisnici);
  }

  
  registracija(korisnici: readonly Korisnik[])
  {
    let podaciFlag = true

    console.log("registracija");
    let input = [".imeUnos", ".prezimeUnos", ".usernameUnos", ".passwordUnos", ".emailUnos", ".mobBrUnos"];
    let podaci = ["", "", "", "", "", ""];
    input.forEach((el, index) =>{
      let inputEl = (<HTMLInputElement>document.querySelector(el)).value;
      if(inputEl !== "")
      {
        console.log(el + " " + inputEl);
        podaci[index] = inputEl;
      }
      else if (inputEl === "")
      {
        podaciFlag = false;
        alert("Ne ispunjava uslove za registraciju");
      }
      
    });

    korisnici.forEach((el, index) => {
      console.log(el + " " + input)
      if (el.username === podaci[2] || el.email === podaci[4] || el.brTelefona === podaci[5])
      {
        podaciFlag = false;
        console.log("ispitivanje postojanja istog korisnika")
        if (el.username === podaci[2])
        {
          alert("Postoji korisnik sa takvim username-om");
        }
        if (el.email === podaci[4])
        {
          alert("Ovaj email je vec u upotrebi");
        }
        if (el.brTelefona === podaci[5])
        {
          alert("Broj telefona je vec u upotrebi");
        }
      }

    });

    if(podaciFlag === true)
    {
      console.log("slanje novo korisnika" + new Korisnik(1, podaci[0], podaci[1], podaci[2], podaci[4], podaci[5], podaci[3]));
      this.store.dispatch(KorisnikActions.registrovanjeNovogKorisnika({noviKorisnik: new Korisnik(1, podaci[0], podaci[1], podaci[2], podaci[4], podaci[5], podaci[3])}))
    }
  }
}
