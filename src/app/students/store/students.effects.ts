import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { StudentsService } from '../students.service';
import * as StudentsActions from './students.actions';


@Injectable()
export class StudentsEffects {
    constructor(
        private actions$: Actions,
        private studentsService: StudentsService
    ) { }

    getAllStudents$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentsActions.getStudents),
            switchMap(action => {
                return this.studentsService.getStudents(action.role, action.teacherId, action.schoolId)
                    .pipe(
                        map(response => {
                            return StudentsActions.getStudentsSuccess(
                                {
                                    students: response,
                                }
                            )
                        }),
                    );
            })
        )
    );

    updateStudent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentsActions.updateStudent),
            switchMap(action => {
                return this.studentsService.updateStudent(action.student)
                    .pipe(
                        map(response => {
                            return StudentsActions.updateStudentSuccess();
                        })
                    )
            })
        )
    );

    deleteStudent$ = createEffect(() =>
        this.actions$.pipe(
            ofType(StudentsActions.deleteStudent),
            switchMap(action => {
                return this.studentsService.deleteStudent(action.studentId)
                    .pipe(
                        map(response => {
                            return StudentsActions.deleteStudentSuccess();
                        })
                    )
            })
        )
    );
}
