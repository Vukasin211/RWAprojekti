import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Restoran } from 'src/app/models/restoran';
import { AppState } from 'src/app/store/app-state';
import * as LokalActions from 'src/app/store/lokal/lokal.actions';
import * as LokalSelector from 'src/app/store/lokal/lokal.selectors';
import * as KorisnikSelector from 'src/app/store/korisnik/korisnik.selectors'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  restorani: Observable<readonly Restoran[]> = of([]);
  faStar = faStar;
  

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void 
  {
    this.restorani = this.store.select(LokalSelector.selectSviLokali);  
  }

  selectedRestoran(lokal: Restoran)
  {
    this.store.dispatch(LokalActions.selectLokal({lokalId: lokal.id}));
  }
}
