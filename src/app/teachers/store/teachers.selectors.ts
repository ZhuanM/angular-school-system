import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./teachers.reducer";

const teachersSelector = createFeatureSelector<AppState, State>('teachers');

export const teachers = createSelector(
    teachersSelector,
    (state: State) => state.teachers
);