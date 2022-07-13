import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./assign-class.reducer";

const assignClassSelector = createFeatureSelector<AppState, State>('assignClass');

export const classTeachers = createSelector(
    assignClassSelector,
    (state: State) => state.classTeachers
);

export const schools = createSelector(
    assignClassSelector,
    (state: State) => state.schools
);
