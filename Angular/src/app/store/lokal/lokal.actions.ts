import { createAction, props } from "@ngrx/store";
import { galerija } from "src/app/models/galerija";
import { Korisnik } from "src/app/models/korisnik";
import { Restoran } from "src/app/models/restoran";
import { Sto } from "src/app/models/sto";

export const selectLokal = createAction(
    "Selektovan lokal",
    props<{
        lokalId: number
    }>()
)

export const ucitajLokal = createAction(
    "Ucitaj lokal",
    props<{
        lokal: Restoran
    }>()
)

export const ucitajLokale = createAction(
    "Ucitavanje lokala iz baze"
)

export const uspesnoUcitaniLokali = createAction(
    "Uspesno ucitani lokali iz baze",
    props<{
        lokali: Restoran[]
    }>()
)

export const dodajLokal = createAction(
    "Uspesno dodavanje lokal",
    props<{
        lokal: Restoran
    }>()
)

export const dodavanjeLokala = createAction(
    "Doadavanje lokla",
    props<{
        lokal: Restoran
    }>()
)

export const obrisiSelektovanLokal = createAction(
    "Obrisi lokal",
    props<{
        lokalId: number
    }>()
)

export const uspesnoBrisanjeLokala = createAction(
    "Uspesno obrisan lokal"
)

export const obrisiSelektovanuSlikuLokala = createAction(
    "Obrisi sliku",
    props<{
        lokalId: number,
        slikaId: number
    }>()
)

export const dodajSelektovanomLokaluSliku = createAction(
    "Dodaj sliku",
    props<{
        lokalId: number,
        slika: galerija,
        novaGalerija: galerija[]
    }>()
)

export const dodajStoSelektovanomLokalu = createAction(
    "Dodaj sto",
    props<{
        lokalId: number,
        sto: Sto
        noviStolovi: Sto[]
    }>()
)

export const rezervisiStoUlokalu = createAction(
    "Rezervisaje stola",
    props<{
        korisnikId: number,
        lokalId: number,
        brOsova: number,
        stolovi: Sto[],
        sto: Sto
    }>()
)

export const obrisiStoUlokalu = createAction(
    "Brisanje stola",
    props<{
        lokalId: number,
        sto: Sto
    }>()
)

export const oceniLokal = createAction(
    "Ocenjivanje lokala",
    props<{
        lokal: Restoran,
        lokalId: number,
        ocena: number,
        korisnikId: number,
    }>()
)

export const otkazivanjeRezervacije = createAction(
    "Otkazivanje rezervacije",
    props<{
        sto: Sto,
        stoRezervacijaId: number,
        lokalId: number,
        noviStolovi: Sto[]
    }>()
)

export const dodavanjeMape = createAction(
    "Dodavanje mape",
    props<{
        lokal: Restoran,
        mapaUrl: string,
        lokalId: number
    }>()
)

export const dodavanjeDogadjaja = createAction(
    "Dodavanje dogadjaja",
    props<{
        lokal: Restoran,
        noviDogadjaj: string,
        lokalId: number
    }>()
)

export const dodajModeratora = createAction(
    "Dodavanje moderatora lokalu",
    props<{
        lokalId: number,
        moderator: Korisnik,
        newModerators: Korisnik[]
    }>()
)

export const izmeniLokalMapa = createAction(
    "Izmenjivanje lokala",
    props<{
        lokalId: number,
        newLokal: Restoran,
        mapaURL: string
    }>()
)

export const dbmsMapa = createAction(
    "Mapa edit dbms",
    props<{
        newLokal: Restoran,
        lokalId: number
    }>()
)