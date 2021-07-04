import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Moderator } from '../models/moderator';
import { Restoran } from '../models/restoran';
import { AppState } from '../store/app-state';
import { ModeratorService } from './moderator/moderator.service';
import { Store } from '@ngrx/store';
import * as LokalActions from 'src/app/store/lokal/lokal.actions';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { testModel } from '../models/testModel';
import { galerija } from '../models/galerija';
import { Sto } from '../models/sto';
import * as KorisnikSelector from 'src/app/store/korisnik/korisnik.selectors'
import { Subscription } from 'rxjs';
import { Korisnik } from '../models/korisnik';

@Injectable({
  providedIn: 'root'
})
export class RestoraniService {
  
  currentSubscription: Subscription | null = null;
  currentKorisnik: Korisnik | null = null;

  
  constructor(private httpClient: HttpClient,private _moderatorService: ModeratorService, private store: Store<AppState>)
  {

  }

  getAll()
  {
    //return this.httpClient.get<Restoran[]>(environment.apiUrl + "lokali").pipe(catchError(errorHandler));
    return this.httpClient.get<Restoran[]>(environment.apiUrl + "VratiKafice").pipe(catchError(errorHandler));
  }

  sendLokal(lokal: Restoran)
  {
    //return this.httpClient.post<Restoran>(environment.apiUrl + "lokali", lokal).pipe(catchError(errorHandler));
    return this.httpClient.post<Restoran>(environment.apiUrl + "DodajKafic", lokal).pipe(catchError(errorHandler));
  }

  dodajSlikuLokalu(slika: galerija)
  {
    //return this.httpClient.put<Restoran>(environment.apiUrl + "lokali", lokal).pipe(catchError(errorHandler));
    return this.httpClient.post<Restoran>(environment.apiUrl + "DodajGaleriju", slika).pipe(catchError(errorHandler));
  }

  deleteSlika(slikaId: number)
  {
    //return this.httpClient.delete<Restoran>()
    console.log(slikaId);
    return this.httpClient.delete<Restoran>(environment.apiUrl + "ObrisiGaleriju/" + slikaId).pipe(catchError(errorHandler));
  }

  deleteLokal(lokalId: number)
  {
    //return this.httpClient.delete<Restoran>()
    return this.httpClient.delete<Restoran>(environment.apiUrl + "ObrisiKafic/" + lokalId).pipe(catchError(errorHandler));
  }

  dodajSto(sto: Sto)
  {
    console.log(sto);
    return this.httpClient.post<Restoran>(environment.apiUrl + "DodajSto", sto).pipe(catchError(errorHandler));
  }

  deleteSto(sto: Sto)
  {
    return this.httpClient.delete<Restoran>(environment.apiUrl + "ObrisiSto/" + sto.id).pipe(catchError(errorHandler));
  }

  rezervisiSto(sto: Sto, brOsoba: number, lokalId: number, korisnikId: number)
  {
    return this.httpClient.put<Restoran>(environment.apiUrl + "DodajRezervaciju/" + korisnikId + "/" + brOsoba + "/" + lokalId, sto).pipe(catchError(errorHandler));
  }

  oceni(idLokala: number, ocena: number, lokal: Restoran, korisnikId: number)
  {
    return this.httpClient.post<Restoran>(environment.apiUrl + "DodajOcenu/" + idLokala + "/" + korisnikId + "/" + ocena, lokal).pipe(catchError(errorHandler));
  }

  dodavanjeMape(mapaUrl: string, idLokala: number, lokal: Restoran)
  {
    console.log(mapaUrl);
    return this.httpClient.put<Restoran>(environment.apiUrl + "IzmeniMapuKafica/" + idLokala + "/" + mapaUrl, lokal).pipe(catchError(errorHandler));
  }

  otkaziRezervaciju(idStola: number, sto: Sto)
  {
    console.log(idStola);
    return this.httpClient.put<Restoran>(environment.apiUrl + "UkloniRezervaciju/" + idStola, sto).pipe(catchError(errorHandler));
  }

  dodajDogadjaj(dogadjaj: string, idLokala: number, lokal: Restoran)
  {
    return this.httpClient.put<Restoran>(environment.apiUrl + "IzmeniDogadjajKafica/" + idLokala + "/" + dogadjaj, lokal).pipe(catchError(errorHandler));
  }

  izmeniLokalMapa(idLokala: number, lokal: Restoran)
  {
    console.log(lokal);
    return this.httpClient.put<Restoran>(environment.apiUrl + "IzmeniKafic/" + idLokala, lokal).pipe(catchError(errorHandler));
  }

}

const errorHandler = (error: HttpErrorResponse) => {
  alert(error.error)
  const errorMessage =
    error.status === 0
      ? `Can't connect to API ${error.error}`
      : `Backend returned code ${error.status}`;

  return throwError(errorMessage);
};
