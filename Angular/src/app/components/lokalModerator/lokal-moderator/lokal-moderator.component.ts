import { Component, OnInit } from '@angular/core';
import { Moderator } from 'src/app/models/moderator';
import { RestoraniService } from 'src/app/services/restorani.service';

@Component({
  selector: 'app-lokal-moderator',
  templateUrl: './lokal-moderator.component.html',
  styleUrls: ['./lokal-moderator.component.scss']
})
export class LokalModeratorComponent implements OnInit {

  moderatori: Moderator[] = [];

  constructor(private _restoranService: RestoraniService) { }

  ngOnInit(): void {
    ///this.moderatori = this._restoranService.getTrenutni().moderatori;
    //console.log(this.moderatori);
  }

  delete(index: number)
  {
    this.moderatori.splice(index, 1);
  }

}
