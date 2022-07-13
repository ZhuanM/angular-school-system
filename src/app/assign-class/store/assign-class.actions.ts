import { createAction, props } from "@ngrx/store";

export const getClassTeachers = createAction(
    '[Assign Class Component] Get Class Teachers',
    props<{
        role: string,
        schoolId: any
    }>()
);

export const getClassTeachersSuccess = createAction(
    '[Assign Class Component] Get Class Teachers Success',
    props<{
        classTeachers: any,
    }>()
);

export const getAllSchools = createAction(
    '[Assign Class Component] Get All Schools'
  );
  
  export const getAllSchoolsSuccess = createAction(
    '[Assign Class Component] Get All Schools Success',
    props<{
      schools: any
    }>()
  );

export const createClass = createAction(
    '[Assign Class Component] Create Class',
    props<{
        classId: any,
        subjectId: any,
        teacherId: any
    }>()
);

export const createClassSuccess = createAction(
    '[Assign Class Component] Create Class Success'
);
