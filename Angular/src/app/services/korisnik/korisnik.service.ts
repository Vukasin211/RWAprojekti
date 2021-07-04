import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Korisnik } from 'src/app/models/korisnik';
import * as KorisnikActions from 'src/app/store/korisnik/korisnik.actions'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  constructor(private httpClient: HttpClient, private store: Store<Korisnik>) { }

  getAll()
  {
    console.log(this.httpClient.get<Korisnik[]>(environment.apiUrl + "VratiKorisnike").pipe(catchError(errorHandler)))
    return this.httpClient.get<Korisnik[]>(environment.apiUrl + "VratiKorisnike").pipe(catchError(errorHandler));
  }

  deleteLokal(korisnikId: number)
  {
    console.log(korisnikId)
    return this.httpClient.delete<Korisnik>(environment.apiUrl + "ObrisiKorisnika/" + korisnikId).pipe(catchError(errorHandler));
  }

  dodaKorisnika(noviKorisnik: Korisnik)
  {
    return this.httpClient.post<Korisnik>(environment.apiUrl + "DodajKorisnika", noviKorisnik).pipe(catchError(errorHandler));
  }

  izmeniKorisnika(korisnik: Korisnik)
  {
    console.log(korisnik)
    return this.httpClient.put<Korisnik>(environment.apiUrl + "IzmeniKorisnika/" + korisnik.id , korisnik).pipe(catchError(errorHandler));
  }

  unaprediKorisnika(korisnik: Korisnik)
  {
    return this.httpClient.put<Korisnik>(environment.apiUrl + "IzmeniUloguUKorisnikaUModeratora/" + korisnik.id , korisnik).pipe(catchError(errorHandler));
  }

  getUlogovanKorisnik()
  {
    let localStorageItem = JSON.parse(<string>localStorage.getItem("korisnik"));
    return localStorageItem == null ? null : localStorageItem.korisnik;
  }

  setUlogovanKorisnik(saveKorisnik: Korisnik)
  {
    localStorage.setItem("korisnik", JSON.stringify({korisnik: saveKorisnik}))
  }

  izlogujKorisnika()
  {
    localStorage.clear();
  }

  korisnikLogin(korisnik: Korisnik)
  {
    return this.httpClient.put<Korisnik>(environment.apiUrl + "Logovanje/", korisnik).pipe(catchError(errorHandler));
  }

  korisnikLogOut()
  {
    let tempKorisnik = this.getUlogovanKorisnik();
    localStorage.clear();
    return this.httpClient.put<Korisnik>(environment.apiUrl + "Izloguj/" + tempKorisnik.id, tempKorisnik).pipe(catchError(errorHandler));
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
