import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./schedule.reducer";

const scheduleSelector = createFeatureSelector<AppState, State>('schedule');

export const schedule = createSelector(
    scheduleSelector,
    (state: State) => state.schedule
);