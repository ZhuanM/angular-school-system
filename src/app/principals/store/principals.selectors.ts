import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/models/app-state.interface";
import { State } from "./principals.reducer";

const principalsSelector = createFeatureSelector<AppState, State>('principals');

export const principals = createSelector(
    principalsSelector,
    (state: State) => state.principals
);