import * as fromAuth from '../../auth/store/auth.reducer';
import * as fromLoader from '../../loader/store/loader.reducer';
import * as fromHeader from '../../header/store/header.reducer';
import * as fromHome from '../../home/store/home.reducer';
import * as fromGrades from '../../grades/store/grades.reducer';
import * as fromAbsences from '../../absences/store/absences.reducer';
import * as fromStudents from '../../students/store/students.reducer';
import * as fromTeachers from '../../teachers/store/teachers.reducer';
import * as fromSubjects from '../../subjects/store/subjects.reducer';
import * as fromSchools from '../../schools/store/schools.reducer';
import * as fromSchool from '../../school/store/school.reducer';
import * as fromUsers from '../../users/store/users.reducer';
import * as fromStatistics from '../../statistics/store/statistics.reducer';

export interface AppState {
    auth: fromAuth.State,
    loader: fromLoader.State
    header: fromHeader.State,
    home: fromHome.State,
    grades: fromGrades.State,
    absences: fromAbsences.State,
    students: fromStudents.State,
    teachers: fromTeachers.State,
    subjects: fromSubjects.State,
    schools: fromSchools.State,
    school: fromSchool.State,
    users: fromUsers.State,
    statistics: fromStatistics.State,
};