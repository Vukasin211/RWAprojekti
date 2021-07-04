import { state } from "@angular/animations";
import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Action } from "rxjs/internal/scheduler/Action";
import { galerija } from "src/app/models/galerija";
import { Restoran } from "src/app/models/restoran";
import * as Actions from './lokal.actions';

const adapter = createEntityAdapter<Restoran>();

export interface LokalState extends EntityState<Restoran>{
    selectedLokalId: number
}

const initialState : LokalState = adapter.getInitialState({
    selectedLokalId: 0
});

export const lokalReducer = createReducer(
    initialState,

    on(Actions.uspesnoUcitaniLokali,(state,{lokali}) => adapter.setAll(lokali, state)),

    on(Actions.dodajLokal, (state, {lokal}) => adapter.addOne(lokal, state)),

    on(Actions.selectLokal, (state,{lokalId}) => ({
        ...state,
        selectedLokalId: lokalId
    })),

    on(Actions.ucitajLokal, (state, {lokal}) => adapter.addOne(lokal, state)),

    on(Actions.obrisiSelektovanLokal, (state, {lokalId}) => adapter.removeOne(lokalId, state)),

    on(Actions.obrisiSelektovanuSlikuLokala, (state, {lokalId, slikaId}) => {
        const targetLokal = state.entities[lokalId];
        if(targetLokal)
        {
            return  adapter.setOne({...targetLokal, galerijas: targetLokal.galerijas.filter(slika => slika.id != slikaId)}, state);
        }
        else
        {
            return state;
        }
    }),

    on(Actions.dodajSelektovanomLokaluSliku, (state, {lokalId, novaGalerija, slika}) => {
        const targetLokal = state.entities[lokalId];
        if(targetLokal)
        {
            return adapter.setOne({...targetLokal, galerijas: novaGalerija}, state);
        }
        else
        {
            return state;
        }
    }),

    on(Actions.dodajStoSelektovanomLokalu, (state, {lokalId,sto,noviStolovi}) => {
         const targetLokal = state.entities[lokalId];
         if(targetLokal)
         {
            return adapter.setOne({...targetLokal, stos: noviStolovi}, state);
         }
         else
         {
             return state;
         }
    }),

    on(Actions.rezervisiStoUlokalu, (state, {lokalId,sto, brOsova, stolovi}) => {
        const targetLokal = state.entities[lokalId];
         if(targetLokal)
         {
            return adapter.setOne({...targetLokal, stos: stolovi}, state);
         }
         else
         {
             return state;
         }
    }),

    on(Actions.obrisiStoUlokalu, (state, {lokalId, sto}) =>{
        const targetLokal = state.entities[lokalId];
        if(targetLokal)
        {
            return  adapter.setOne({...targetLokal, stos: targetLokal.stos.filter(stariSto => stariSto.id != sto.id)}, state);
        }
        else    
        {
            return state
        }
    }),

    on(Actions.otkazivanjeRezervacije, (state, {stoRezervacijaId, lokalId, noviStolovi}) => {
        const targetLokal = state.entities[lokalId];
        if(targetLokal)
        {
            return  adapter.setOne({...targetLokal, stos: noviStolovi}, state);
        }
        else    
        {
            return state
        }
    }),

    on(Actions.dodavanjeMape, (state, {mapaUrl, lokalId, lokal}) => {
        const targetLokal = state.entities[lokalId];
        if(targetLokal)
        {
            return  adapter.setOne({...targetLokal, mapaLokacija: mapaUrl}, state);
        }
        else    
        {
            return state
        }
    }),

    on(Actions.dodavanjeDogadjaja, (state, {noviDogadjaj, lokalId, lokal}) => {
        const targetLokal = state.entities[lokalId];
        if(targetLokal)
        {
            return  adapter.setOne({...targetLokal, dogadjaj: noviDogadjaj}, state);
        }
        else    
        {
            return state
        }
    }),

    on(Actions.dodajModeratora, (state, {lokalId, newModerators}) => {
        const targetLokal = state.entities[lokalId];
        if(targetLokal)
        {
            return  adapter.setOne({...targetLokal, moderators:newModerators}, state);
        }
        else    
        {
            return state
        }
    }),

    on(Actions.izmeniLokalMapa, (state,{lokalId, newLokal, mapaURL}) =>{
        const targetLokal = state.entities[lokalId];
        if(targetLokal)
        {
            return  adapter.setOne({...targetLokal, mapaLokacija: mapaURL}, state);
        }
        else    
        {
            return state
        }
    })

    
)