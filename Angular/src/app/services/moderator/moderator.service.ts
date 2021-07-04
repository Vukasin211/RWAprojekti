import { Injectable } from '@angular/core';
import { Moderator } from 'src/app/models/moderator';
import { Restoran } from 'src/app/models/restoran';

@Injectable({
  providedIn: 'root'
})
export class ModeratorService {

  moderatori: Moderator[]
  constructor() 
  {
    this.moderatori = [];

    this.moderatori.push(new Moderator("Dragomir", "DragomirovaSifra"));
    this.moderatori.push(new Moderator("Zoran", "ZoranSifra"));
    this.moderatori.push(new Moderator("Mimor", "MimorSifra"));
    this.moderatori.push(new Moderator("Mitar", "MitarSifra"));

    /*
    this.moderatori[0].setLokal(new Restoran("1" ,"Tramvaj" ,4.5, "http://www.kudanaklopu.com/test_knk/wp-content/uploads/2014/10/40221-nis-poslasticarnica-Tramvaj.jpg" ,
    "Obrnoviceva 20","060 5796101"));

    this.moderatori[1].setLokal(new Restoran("2" ,"Square Cafe" ,4.5, "http://cafesquarenis.rs/img/galerija/25.jpg" ,
    "Park Svetog Save","065 5495979"));

    this.moderatori[2].setLokal(new Restoran("3" ,"Pandora" ,4.5, "http://www.kudanaklopu.com/test_knk/wp-content/uploads/2016/03/pandora.jpg" ,
    "Lole Ribara 2","018 521953"));

    this.moderatori[3].setLokal(new Restoran("4" ,"Tesla" ,4.4, "https://10619-2.s.cdn12.com/rests/original/407_52828879.jpg" ,
    "Kopitareva","018 517194"));
    */
  }

  getAll()
  {
    return this.moderatori;
  }
}
