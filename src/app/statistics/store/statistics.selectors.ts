import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./statistics.reducer";

const statisticsSelector = createFeatureSelector<AppState, State>('statistics');

export const statistics = createSelector(
    statisticsSelector,
    (state: State) => state.statistics
);
