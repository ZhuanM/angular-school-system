import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./absences.reducer";

const absencesSelector = createFeatureSelector<AppState, State>('absences');

export const absences = createSelector(
    absencesSelector,
    (state: State) => state.absences
);