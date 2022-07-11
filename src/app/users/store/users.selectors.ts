import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./users.reducer";

const usersSelector = createFeatureSelector<AppState, State>('users');

export const users = createSelector(
    usersSelector,
    (state: State) => state.users
);