import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./statistics.reducer";

const statisticsSelector = createFeatureSelector<AppState, State>('statistics');

export const averageGrade = createSelector(
    statisticsSelector,
    (state: State) => state.averageGrade
);

export const totalStudents = createSelector(
    statisticsSelector,
    (state: State) => state.totalStudents
);

export const totalTeachers = createSelector(
    statisticsSelector,
    (state: State) => state.totalTeachers
);
