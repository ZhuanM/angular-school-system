import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./school.reducer";

const schoolSelector = createFeatureSelector<AppState, State>('school');

export const schoolName = createSelector(
    schoolSelector,
    (state: State) => state.schoolName
);

export const schoolAddress = createSelector(
    schoolSelector,
    (state: State) => state.schoolAddress
);
