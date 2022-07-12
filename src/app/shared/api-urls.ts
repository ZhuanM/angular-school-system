import { environment } from 'src/environments/environment';

export const apiUrls = {
  // Authentication
  loginUrl: environment.apiBaseUrl + 'authenticate',
  registerUrl: environment.apiBaseUrl + 'api/user/register',
  // Users
  usersUrl: environment.apiBaseUrl + 'api/user', // ROOT
  getAllUsersUrl: environment.apiBaseUrl + 'api/user/all', // ROOT
  // Students
  studentsUrl: environment.apiBaseUrl + 'api/student', // ROOT
  getAllStudents: environment.apiBaseUrl + 'api/student/all', // (GET)
  getStudentByIdUrl: environment.apiBaseUrl + 'api/student', // /{studentId} (GET)
  getTeacherStudentsUrl: environment.apiBaseUrl + 'api/teacher', // /{teacherId}/students (GET)
  getPrincipalStudentsUrl: environment.apiBaseUrl + 'api/student/all', // /{schoolId} (GET)
  // Parents
  parentsUrl: environment.apiBaseUrl + 'api/parent', // ROOT
  getParentByIdUrl: environment.apiBaseUrl + 'api/parent', // /{parentId} (GET)
  // Teachers
  teachersUrl: environment.apiBaseUrl + 'api/teacher', // ROOT
  getAllTeachersUrl: environment.apiBaseUrl + 'api/teacher', // (GET)
  getTeacherByIdUrl: environment.apiBaseUrl + 'api/teacher', // /{teacherId} (GET)
  getPrincipalTeachersUrl: environment.apiBaseUrl + 'api/school', // /{schoolId}/teachers (GET)
  // Principals
  principalsUrl: environment.apiBaseUrl + 'api/director', // ROOT
  getPrincipalByIdUrl: environment.apiBaseUrl + 'api/director', // /{principalId} (GET)
  createPrincipalUrl: environment.apiBaseUrl + 'api/director/register', // (POST)
  // Schools
  schoolsUrl: environment.apiBaseUrl + 'api/school',
  getSchoolsUrl: environment.apiBaseUrl + 'api/school/all',
  // Grades
  gradesUrl: environment.apiBaseUrl + 'api/grade', // ROOT
  getAllGradesUrl: environment.apiBaseUrl + 'api/grade/all', // (GET)
  getStudentGradesUrl: environment.apiBaseUrl + 'api/grade', // /{studentId} (GET)
  getParentGradesUrl: environment.apiBaseUrl + 'api/grade/students/parent', // /{parentId} (GET)
  getTeacherGradesUrl: environment.apiBaseUrl + 'api/grade/students/teacher', // /{teacherId} (GET)
  getPrincipalGradesUrl: environment.apiBaseUrl + 'api/grade/school', // /{schoolId} (GET)
  createGradeUrl: environment.apiBaseUrl + 'api/grade', // /{studentId} (POST)
  updateGradeUrl: environment.apiBaseUrl + 'api/grade', // /{gradeId} (PATCH)
  deleteGradeUrl: environment.apiBaseUrl + 'api/grade', // /{gradeId} (DELETE)
  // Absences
  absencesUrl: environment.apiBaseUrl + 'api/absence', // ROOT
  getAllAbsencesUrl: environment.apiBaseUrl + 'api/absence/all', // (GET)
  getStudentAbsencesUrl: environment.apiBaseUrl + 'api/absence', // /{studentId} (GET)
  getParentAbsencesUrl: environment.apiBaseUrl + 'api/absence/students/parent', // /{parentId} (GET)
  getTeacherAbsencesUrl: environment.apiBaseUrl + 'api/absence/students/teacher', // /{teacherId} (GET)
  getPrincipalAbsencesUrl: environment.apiBaseUrl + 'api/absence/school', // /{schoolId} (GET)
  createAbsenceUrl: environment.apiBaseUrl + 'api/absence', // /{studentId} (POST)
  updateAbsenceUrl: environment.apiBaseUrl + 'api/absence', // /{absenceId} (PATCH)
  deleteAbsenceUrl: environment.apiBaseUrl + 'api/absence', // /{absenceId} (DELETE)
  // Subjects
  subjectsUrl: environment.apiBaseUrl + 'api/subject',
  // TODO Statistics
  statisticsUrl: environment.apiBaseUrl + 'api/statistic',
  // TODO Schedule
  scheduleUrl: environment.apiBaseUrl + 'api/schedule',
}
