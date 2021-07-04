import { Component, OnInit } from '@angular/core';
import { Restoran } from 'src/app/models/restoran';
import { RestoraniService } from 'src/app/services/restorani.service';
import { AppState } from 'src/app/store/app-state';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import * as LokalSelector from 'src/app/store/lokal/lokal.selectors'
import * as LokalActions from 'src/app/store/lokal/lokal.actions';

@Component({
  selector: 'app-lokal-pregled',
  templateUrl: './lokal-pregled.component.html',
  styleUrls: ['./lokal-pregled.component.scss']
})
export class LokalPregledComponent implements OnInit {

  //public restorani: Restoran[] = [];

  public restorani$: Observable<readonly Restoran[]> = of([]);

  constructor(private store: Store<AppState>) 
  {
    
  }

  ngOnInit(): void {
    this.restorani$ = this.store.select(LokalSelector.selectSviLokali);
  }


  setTrenutni(restoran: Restoran)
  {
    this.store.dispatch(LokalActions.selectLokal({lokalId: restoran.id}));
    //this._restoranService.setTrenutni(this.restorani[index]);
    //console.log(this.restorani[index]);
  }

  delete(restoran: Restoran)
  {
    console.log(restoran);
    this.store.dispatch(LokalActions.obrisiSelektovanLokal({lokalId: restoran.id}));
  }

  dodajLokal()
  {
    let lokalNaziv = <string>(<HTMLInputElement>document.querySelector(".ImeUnos")).value;
    let lokalAdresa = <string>(<HTMLInputElement>document.querySelector(".adresaUnos")).value;


    this.store.dispatch(LokalActions.dodajLokal({lokal: new Restoran(1, lokalNaziv, lokalAdresa)}));
  }

  lokModerator(index: number)
  {
    //this._restoranService.setTrenutni(this.restorani[index]);
  }
}
