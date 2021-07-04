import { createAction, props } from "@ngrx/store";
import { Korisnik } from "src/app/models/korisnik";

export const ulogujKorisnika = createAction(
    "Logovanje korisnika",
    props<{
        logId: number
    }>()
)

//postavlja korisnika u Store
export const uspesnoLogovanje = createAction(
    "Uspesno logovanje korisnika",
    props<{
        korisnik: Korisnik
    }>()
)

export const ucitavanjeKorisnika = createAction(
    "Ucitavanje korisnika iz baze"
)

export const uspesnoUcitavanjeKorisnika = createAction(
    "Uspesno ucitani korisnici iz baze",
    props<{
        korisnici: Korisnik[]
    }>()
)

export const brisiKorisnika = createAction(
    "Brisanje korisnika",
    props<{
        korisnikId: number
    }>()
)

export const izlogovajeKorisnika = createAction(
    "Izloguj korisnika",
    props<{
        korisnik:Korisnik
    }>()
)

export const UspesnoIzlogovanKorisnika = createAction(
    "Uspesno izlogovan korisnika",
    props<{
        korisnik:Korisnik
    }>()
)

export const uspesnoBrisanjeKorisnika = createAction(
    "Uspesno brisanje korisnika iz baze"
)

export const registrovanjeNovogKorisnika = createAction(
    "Registrovanje novog korisnika",
    props<{
        noviKorisnik: Korisnik
    }>()
)

export const uspesnoRegistrovenjNovogKorisnika = createAction(
    "Uspesna registracija novog korisnika"   
)

export const izmenjivanjeKorisnika = createAction(
    "Izmenjivanje korisnika",
    props<{
        korisnikId: number,
        korisnik: Korisnik
    }>()
)

export const selectKorisnik = createAction(
    "Pretrazivanje korisnika",
    props<{
        korisnikId: number
    }>()
)

export const unaprediKorisnika = createAction(
    "Unapredjivanje korisnika u poderatora",
    props<{
        korisnikId: number,
        korisnik: Korisnik
    }>()
)

//Salje zahtev bazici
export const logovanjeKorisnika = createAction(
    "Logovanje korisnika",
    props<{
        korisnik: Korisnik
    }>()
)