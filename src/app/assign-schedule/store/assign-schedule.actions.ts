import { createAction, props } from "@ngrx/store";

export const getClassTeachers = createAction(
    '[Assign Schedule Component] Get Class Teachers',
    props<{
        role: string,
        schoolId: any
    }>()
);

export const getClassTeachersSuccess = createAction(
    '[Assign Schedule Component] Get Class Teachers Success',
    props<{
        classTeachers: any,
    }>()
);

export const getAllSchools = createAction(
    '[Assign Schedule Component] Get All Schools'
  );
  
  export const getAllSchoolsSuccess = createAction(
    '[Assign Schedule Component] Get All Schools Success',
    props<{
      schools: any
    }>()
  );

export const createSchedule = createAction(
    '[Assign Schedule Component] Create Schedule',
    props<{
        classTeacherId: any,
        weekDay: any,
        timestamp: any
    }>()
);

export const createScheduleSuccess = createAction(
    '[Assign Schedule Component] Create Schedule Success'
);
