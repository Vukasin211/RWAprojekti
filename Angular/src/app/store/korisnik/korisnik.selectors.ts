import { createAction, createSelector } from "@ngrx/store";
import { Korisnik } from "src/app/models/korisnik";
import { AppState } from "../app-state";
import { KorisnikState } from "./korisnik.reducer";

export const selectKorisnikFeatures = createSelector(
    (state: AppState) => state.korisnik,
    (korisnik) => korisnik
);

export const selectUlogovanKorisnikId = createSelector(
    selectKorisnikFeatures,
    (state: KorisnikState) => state.ulogovanKorisnikId
);

export const selectSviKorisnici = createSelector(
    selectKorisnikFeatures,
    (state: KorisnikState) => Object.values(state.entities).filter(korisnik => korisnik !== null).map(korisnik => <Korisnik>korisnik)
);

export const selectSviKorisniciAsDict = createSelector(
    selectKorisnikFeatures,
    (state: KorisnikState) => state.entities
);

// export const selectUlogonaKorisnik = createSelector(
//     selectUlogovanKorisnikId,
//     selectSviKorisniciAsDict,
//     (ulogovanId, korisnici) => korisnici[ulogovanId] ?? null
// );

export const selectUlogovanKorisnikState = createSelector(
    selectKorisnikFeatures,
    (state: KorisnikState) => state.ulogovanKorisnik
)

export const selectUlogonaKorisnik = createSelector(
    selectUlogovanKorisnikState,
    (korisnik) => korisnik ?? null
);

export const selectModeratoreIzKorisnika = createSelector(
    selectSviKorisnici,
    (sviKorisnici) => sviKorisnici.filter(korisnik => korisnik.uloga === "moderator") 
);

export const selectKorisnike = createSelector(
    selectSviKorisnici,
    (sviKorisnici) => sviKorisnici.filter(korisnik => korisnik.uloga === "korisnik") 
);
