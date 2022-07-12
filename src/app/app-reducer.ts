import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './shared/models/app-state.interface';
import * as fromAuth from './auth/store/auth.reducer';
import * as fromLoader from './loader/store/loader.reducer';
import * as fromHeader from './header/store/header.reducer';
import * as fromHome from './home/store/home.reducer';
import * as fromGrades from './grades/store/grades.reducer';
import * as fromAbsences from './absences/store/absences.reducer';
import * as fromStudents from './students/store/students.reducer';
import * as fromTeachers from './teachers/store/teachers.reducer';
import * as fromSubjects from './subjects/store/subjects.reducer';
import * as fromSchools from './schools/store/schools.reducer';
import * as fromSchool from './school/store/school.reducer';
import * as fromUsers from './users/store/users.reducer';
import * as fromStatistics from './statistics/store/statistics.reducer';
import * as fromSchedule from './schedule/store/schedule.reducer';
import * as fromPrincipals from './principals/store/principals.reducer';
import * as fromParents from './parents/store/parents.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  loader: fromLoader.loaderReducer,
  header: fromHeader.headerReducer,
  home: fromHome.homeReducer,
  grades: fromGrades.gradesReducer,
  absences: fromAbsences.absencesReducer,
  students: fromStudents.studentsReducer,
  teachers: fromTeachers.teachersReducer,
  subjects: fromSubjects.subjectsReducer,
  schools: fromSchools.schoolsReducer,
  school: fromSchool.schoolReducer,
  users: fromUsers.usersReducer,
  statistics: fromStatistics.statisticsReducer,
  schedule: fromSchedule.scheduleReducer,
  principals: fromPrincipals.principalsReducer,
  parents: fromParents.parentsReducer,
};
