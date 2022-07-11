import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./grades.reducer";

const gradesSelector = createFeatureSelector<AppState, State>('grades');

export const grades = createSelector(
    gradesSelector,
    (state: State) => state.grades
);