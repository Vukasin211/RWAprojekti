import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RestoraniService } from "src/app/services/restorani.service";
import * as KorisniklActions from "./korisnik.actions";
import { catchError, exhaustMap, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { KorisnikService } from "src/app/services/korisnik/korisnik.service";

@Injectable()
export class KorisnikEffect {
    constructor(private _korisnikService: KorisnikService, private actions$: Actions) {}

    dbmsloadEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(KorisniklActions.ucitavanjeKorisnika),
            mergeMap(() => this._korisnikService.getAll().pipe(
                map((korisnici) => (KorisniklActions.uspesnoUcitavanjeKorisnika({korisnici}))),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );
  
    dbmsDeleteEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(KorisniklActions.brisiKorisnika),
            exhaustMap((korisnik) => this._korisnikService.deleteLokal(korisnik.korisnikId).pipe(
                map(() => (KorisniklActions.uspesnoBrisanjeKorisnika())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmsAddEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(KorisniklActions.registrovanjeNovogKorisnika),
            exhaustMap((korisnik) => this._korisnikService.dodaKorisnika(korisnik.noviKorisnik).pipe(
                map(() => (KorisniklActions.ucitavanjeKorisnika())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    // dbmsEditEffect$ = createEffect(() => 
    //     this.actions$.pipe(
    //         ofType(KorisniklActions.izmenjivanjeKorisnika),
    //         exhaustMap((korisnik) => this._korisnikService.izmeniKorisnika(korisnik.korisnik).pipe(
    //             map(() => (KorisniklActions.ucitavanjeKorisnika())),
    //             catchError(() => of({type: "load error"}))
    //             )
    //         )
    //     )
    // );

    dbmsUnaprediKorisnika$ = createEffect(() => 
        this.actions$.pipe(
            ofType(KorisniklActions.unaprediKorisnika),
            exhaustMap((korisnik) => this._korisnikService.unaprediKorisnika(korisnik.korisnik).pipe(
                map(() => (KorisniklActions.ucitavanjeKorisnika())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );


    dbmsLogovanjeKorisnika$ = createEffect(() => 
        this.actions$.pipe(
            ofType(KorisniklActions.logovanjeKorisnika),
            exhaustMap((korisnik) => this._korisnikService.korisnikLogin(korisnik.korisnik).pipe(
                map((korisnik) => (KorisniklActions.uspesnoLogovanje({korisnik}))),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    // dbmsIzlogovanjeKorisnika$ = createEffect(() => 
    //     this.actions$.pipe(
    //         ofType(KorisniklActions.izlogovajeKorisnika),
    //         exhaustMap((korisnik) => this._korisnikService.korisnikLogOut(korisnik.korisnik).pipe(
    //             map((korisnik) => (KorisniklActions.UspesnoIzlogovanKorisnika({korisnik}))),
    //             catchError(() => of({type: "load error"}))
    //             )
    //         )
    //     )
    // );

    dbmsEditEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(KorisniklActions.izmenjivanjeKorisnika),
            exhaustMap((korisnik) => this._korisnikService.izmeniKorisnika(korisnik.korisnik).pipe(
                map((korisnik) => (KorisniklActions.logovanjeKorisnika({korisnik}))),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );
}