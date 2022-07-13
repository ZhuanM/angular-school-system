import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./classes.reducer";

const classesSelector = createFeatureSelector<AppState, State>('classes');

export const classes = createSelector(
    classesSelector,
    (state: State) => state.classes
);