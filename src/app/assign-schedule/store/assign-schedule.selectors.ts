import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "src/app/shared/models/app-state.interface";
import { State } from "./assign-schedule.reducer";

const assignScheduleSelector = createFeatureSelector<AppState, State>('assignSchedule');

export const classTeachers = createSelector(
    assignScheduleSelector,
    (state: State) => state.classTeachers
);

export const schools = createSelector(
    assignScheduleSelector,
    (state: State) => state.schools
);
