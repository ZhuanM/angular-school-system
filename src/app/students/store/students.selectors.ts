import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./students.reducer";

const studentsSelector = createFeatureSelector<AppState, State>('students');

export const students = createSelector(
    studentsSelector,
    (state: State) => state.students
);