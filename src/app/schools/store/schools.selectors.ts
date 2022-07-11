import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./schools.reducer";

const schoolsSelector = createFeatureSelector<AppState, State>('schools');

export const schools = createSelector(
    schoolsSelector,
    (state: State) => state.schools
);