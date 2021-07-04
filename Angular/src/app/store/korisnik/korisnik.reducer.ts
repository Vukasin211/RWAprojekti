import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Korisnik } from "src/app/models/korisnik";
import * as Actions from "./korisnik.actions";

const adapter = createEntityAdapter<Korisnik>();

export interface KorisnikState extends EntityState<Korisnik>{
    ulogovanKorisnikId: number,
    ulogovanKorisnik: Korisnik
}

const initialState : KorisnikState = adapter.getInitialState({
    ulogovanKorisnikId: 0,
    ulogovanKorisnik: new Korisnik(0, "", "", "", "", "", "")
});

export const korisnikReducer = createReducer(
    initialState,

    // on(Actions.ulogujKorisnika, (state, {logId}) => ({
    //     ...state,
    //     ulogovanKorisnikId: logId
    // })),

    on(Actions.uspesnoLogovanje, (state, {korisnik}) => ({
        ...state,
        ulogovanKorisnik: korisnik
    })),

    on(Actions.uspesnoUcitavanjeKorisnika, (state, {korisnici}) => adapter.setAll(korisnici, state)),

    on(Actions.brisiKorisnika, (state, {korisnikId}) => adapter.removeOne(korisnikId, state)),

    on(Actions.UspesnoIzlogovanKorisnika, (state) => ({
        ...state,
        ulogovanKorisnik: new Korisnik(0, "", "", "", "", "", "")
    })),

    on(Actions.registrovanjeNovogKorisnika, (state, {noviKorisnik}) => adapter.addOne(noviKorisnik, state)),

    on(Actions.izmenjivanjeKorisnika, (state, {korisnikId, korisnik}) => {
        const targetKorisnik = state.entities[korisnikId];
        if(targetKorisnik)
        {
            return adapter.setOne({...targetKorisnik, 
                ime: korisnik.ime,
                prezime: korisnik.prezime,
                username: korisnik.username,
                password: korisnik.password,
                brTelefona: korisnik.brTelefona,
                email: korisnik.email
            }, state);
        }
        else
        {
            return state;
        }
    }),

    on(Actions.unaprediKorisnika, (state, {korisnikId, korisnik}) => {
        const targetKorisnik = state.entities[korisnikId];
        if(targetKorisnik)
        {
            return adapter.setOne({...targetKorisnik, 
                ime: korisnik.ime,
                prezime: korisnik.prezime,
                username: korisnik.username,
                password: korisnik.password,
                brTelefona: korisnik.brTelefona,
                email: korisnik.email
            }, state);
        }
        else
        {
            return state;
        }
    })

)