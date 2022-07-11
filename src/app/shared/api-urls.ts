import { environment } from 'src/environments/environment';

export const apiUrls = {
  // Authentication
  loginUrl: environment.apiBaseUrl + 'authenticate',
  registerUrl: environment.apiBaseUrl + 'api/user/register',
  // Users
  usersUrl: environment.apiBaseUrl + 'api/user',
  // Students
  studentsUrl: environment.apiBaseUrl + 'api/student',
  // Parents
  parentsUrl: environment.apiBaseUrl + 'api/parent',
  // Teachers
  teachersUrl: environment.apiBaseUrl + 'api/teacher',
  // Principals
  createPrincipalUrl: environment.apiBaseUrl + 'api/director/register',
  principalsUrl: environment.apiBaseUrl + 'api/director',
  // Schools
  schoolsUrl: environment.apiBaseUrl + 'api/school',
  getSchoolsUrl: environment.apiBaseUrl + 'api/school/all',
  // Grades
  gradesUrl: environment.apiBaseUrl + 'api/grade',
  // Absences
  absencesUrl: environment.apiBaseUrl + 'api/absence',
  // Subjects
  subjectsUrl: environment.apiBaseUrl + 'api/subject',
  // TODO Statistics
  statisticsUrl: environment.apiBaseUrl + 'api/statistic',
  // TODO Schedule
  scheduleUrl: environment.apiBaseUrl + 'api/schedule',
}
