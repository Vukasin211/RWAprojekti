import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik/korisnik.service';
import * as KorisnikActions from 'src/app/store/korisnik/korisnik.actions'
import * as KorisnikSelector from 'src/app/store/korisnik/korisnik.selectors'
import { AppState } from 'src/app/store/app-state';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  korisnici$: Observable<Korisnik[]> = of([]);

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

  }

  logIn(korisnici: Korisnik[])
  {
    let inputUsername = (<HTMLInputElement>document.querySelector(".usernameUnos")).value;
    let inputPassword = (<HTMLInputElement>document.querySelector(".passwordUnos")).value;

    let logKorisnik = new Korisnik(0, "", "", inputUsername, "", "", inputPassword)
    this.store.dispatch(KorisnikActions.logovanjeKorisnika({korisnik: logKorisnik}));
  }

}
