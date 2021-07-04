import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, Subscription } from 'rxjs';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from 'src/app/services/korisnik/korisnik.service';
import { AppState } from 'src/app/store/app-state';
import * as KorisnikSelector from 'src/app/store/korisnik/korisnik.selectors'
import * as KorisnikActions from 'src/app/store/korisnik/korisnik.actions'

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  korisnik: Korisnik | null = null;
  public korisnici$: Observable<readonly Korisnik[]> = of([]); 
  currentSubscription: Subscription | null = null;

  constructor(private store: Store<AppState>, private _korisnikService: KorisnikService) { }

  ngOnInit(): void {

    ///this.store.dispatch(KorisnikActions.ulogujKorisnika({logId: this._korisnikService.getUlogovanKorisnik().id}))
    this.currentSubscription = this.store.select(KorisnikSelector.selectUlogonaKorisnik).subscribe(
      (korisnik) => {
        
        this.korisnik = korisnik;

        if(this.korisnik)
        {
          let dataClass = [".imeUnos", ".prezimeUnos", ".usernameUnos", ".passwordUnos", ".emailUnos", ".mobBrUnos"];
          let data = [this.korisnik.ime, this.korisnik.prezime, this.korisnik.username, this.korisnik.password, this.korisnik.email, this.korisnik.brTelefona];
          dataClass.forEach((el,index) =>{
            let nesto = (<HTMLInputElement>document.querySelector(el));
            if(nesto)
            {
              nesto.value = data[index];
            }
          });
        }
      }
    )

    this.korisnici$ = this.store.select(KorisnikSelector.selectSviKorisnici);
  }

  commitChange()
  {
    let dataClass = [".imeUnos", ".prezimeUnos", ".usernameUnos", ".emailUnos", ".mobBrUnos", ".passwordUnos"];
    let data = ["", "", "", "", "", ""];
    dataClass.forEach((el,index) =>{
      let inputEl = (<HTMLInputElement>document.querySelector(el)).value;
      if(inputEl)
      {
        data[index] = inputEl;
      }
    });

    if(this.korisnik)
    {
      this.store.dispatch(KorisnikActions.izmenjivanjeKorisnika({korisnikId: this.korisnik.id, korisnik: new Korisnik(this.korisnik.id, data[0], data[1], data[2], data[3], data[4], data[5])}))
      console.log(this.korisnik)
    }
  }


}
