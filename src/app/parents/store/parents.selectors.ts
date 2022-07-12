import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./parents.reducer";

const parentsSelector = createFeatureSelector<AppState, State>('parents');

export const parents = createSelector(
    parentsSelector,
    (state: State) => state.parents
);