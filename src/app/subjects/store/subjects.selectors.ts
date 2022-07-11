import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./subjects.reducer";

const subjectsSelector = createFeatureSelector<AppState, State>('subjects');

export const subjects = createSelector(
    subjectsSelector,
    (state: State) => state.subjects
);