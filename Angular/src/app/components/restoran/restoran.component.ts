import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Restoran } from 'src/app/models/restoran';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { RestoraniService } from 'src/app/services/restorani.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app-state';

@Component({
  selector: 'app-restoran',
  templateUrl: './restoran.component.html',
  styleUrls: ['./restoran.component.scss']
})
export class RestoranComponent implements OnInit {

  @Input() restoran: Restoran | null = null;
  @Output() onClick: EventEmitter<Restoran> = new EventEmitter<Restoran>();
  
  faCoffe = faCoffee;
  faStar = faStar;
  slobonihMestaValue: number | null = null;

  constructor() { }

  ngOnInit(): void {
    this.slobonihMestaValue = 0;
    this.slobodnihMesta();
  }
  
  clicked()
  {
    if(this.restoran)
    {
      this.onClick.emit(this.restoran);
    }
  }

  slobodnihMesta()
  {
    this.slobonihMestaValue = 0;
    if(this.restoran)
    {
      this.restoran.stos.forEach((el, index) => {
        if(el.rezervisan === "false" && this.slobonihMestaValue)
        {
          this.slobonihMestaValue = this.slobonihMestaValue + el.brojOsoba;
        }
      })
    }
  }

}
