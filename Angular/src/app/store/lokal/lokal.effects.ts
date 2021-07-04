import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RestoraniService } from "src/app/services/restorani.service";
import * as LokalActions from "./lokal.actions";
import { catchError, exhaustMap, map, mergeMap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class LokalEffect {
    constructor(private _lokalService: RestoraniService, private actions$: Actions) {}

    dbmsloadEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LokalActions.ucitajLokale),
            mergeMap(() => this._lokalService.getAll().pipe(
                map((lokali) => (LokalActions.uspesnoUcitaniLokali({lokali}))),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );
  
    dbmsAddEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LokalActions.dodajLokal),
            exhaustMap((lokal) => this._lokalService.sendLokal(lokal.lokal).pipe(
                map(() => (LokalActions.ucitajLokale())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmsDeleteEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LokalActions.obrisiSelektovanLokal),
            exhaustMap((lokal) => this._lokalService.deleteLokal(lokal.lokalId).pipe(
                map(() => (LokalActions.uspesnoBrisanjeLokala())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmsAddImageEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LokalActions.dodajSelektovanomLokaluSliku),
            exhaustMap((lokal) => this._lokalService.dodajSlikuLokalu(lokal.slika).pipe(
                map(() => (LokalActions.ucitajLokale())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmsDeleteImageEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LokalActions.obrisiSelektovanuSlikuLokala),
            exhaustMap((lokal) => this._lokalService.deleteSlika(lokal.slikaId).pipe(
                map(() => (LokalActions.ucitajLokale())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmsStoAddEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LokalActions.dodajStoSelektovanomLokalu),
            exhaustMap((lokal) => this._lokalService.dodajSto(lokal.sto).pipe(
                map(() => (LokalActions.ucitajLokale())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmsDeleteAddEffect$ = createEffect(() => 
        this.actions$.pipe(
            ofType(LokalActions.obrisiStoUlokalu),
            exhaustMap((lokal) => this._lokalService.deleteSto(lokal.sto).pipe(
                map(() => (LokalActions.ucitajLokale())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmsRezervisiStoEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LokalActions.rezervisiStoUlokalu),
            exhaustMap((lokal) => this._lokalService.rezervisiSto(lokal.sto, lokal.brOsova, lokal.lokalId, lokal.korisnikId).pipe(
                map(() => (LokalActions.ucitajLokale())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmsOceniLokalEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LokalActions.oceniLokal),
            exhaustMap((lokal) => this._lokalService.oceni(lokal.lokalId,lokal.ocena, lokal.lokal, lokal.korisnikId).pipe(
                map(() => (LokalActions.ucitajLokale())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmDodavanjeMapeEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LokalActions.dodavanjeMape),
            exhaustMap((lokal) => this._lokalService.dodavanjeMape(lokal.mapaUrl, lokal.lokalId, lokal.lokal).pipe(
                map(() => (LokalActions.ucitajLokale())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmDodavanjeDogadjajaEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LokalActions.dodavanjeDogadjaja),
            exhaustMap((lokal) => this._lokalService.dodajDogadjaj(lokal.noviDogadjaj, lokal.lokalId, lokal.lokal).pipe(
                map(() => (LokalActions.ucitajLokale())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmIzmeniLokalMapa2Effect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LokalActions.dbmsMapa),
            exhaustMap((lokal) => this._lokalService.izmeniLokalMapa(lokal.lokalId, lokal.newLokal).pipe(
                map(() => (LokalActions.ucitajLokale())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );

    dbmOtkazivanjeRezervacijeEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(LokalActions.otkazivanjeRezervacije),
            exhaustMap((lokal) => this._lokalService.otkaziRezervaciju(lokal.stoRezervacijaId, lokal.sto).pipe(
                map(() => (LokalActions.ucitajLokale())),
                catchError(() => of({type: "load error"}))
                )
            )
        )
    );
}