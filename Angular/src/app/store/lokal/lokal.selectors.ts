import { createSelector } from "@ngrx/store";
import { Restoran } from "src/app/models/restoran";
import { AppState } from "../app-state";
import { LokalState } from "./lokal.reducer";

export const selectLokalFeature = createSelector(
    (state: AppState) => state.lokali,
    (lokali) => lokali
);

export const selectSviLokali = createSelector(
    selectLokalFeature,
    (state: LokalState) => Object.values(state.entities).filter(lokal => lokal !== null).map(lokal => <Restoran>lokal)
);

export const selectLokalAsDict = createSelector(
    selectLokalFeature,
    (state: LokalState) => state.entities
);

export const selectSelectedLokalId = createSelector(
    selectLokalFeature,
    (state: LokalState) => state.selectedLokalId
);

export const selectSelectedLokal = createSelector(
    selectLokalAsDict,
    selectSelectedLokalId,
    (lokali, lokalId) => lokali[lokalId] ?? null
);

export const selectSelectedLokalEvent = createSelector(
    selectLokalAsDict,
    selectSelectedLokalId,
    (lokali, lokalId) => lokali[lokalId]?.dogadjaj ?? null
);

export const selectSelectedLokalStolovi = createSelector(
    selectLokalAsDict,
    selectSelectedLokalId,
    (lokali, lokalId) => lokali[lokalId]?.stos ?? null
)