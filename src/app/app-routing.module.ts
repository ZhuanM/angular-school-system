import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbsencesComponent } from './absences/absences.component';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { AutoLoginGuard } from './auth/auto-login.guard';
import { PrincipalGuard } from './auth/principal.guard';
import { StudentsPageGuard } from './auth/students-page.guard';
import { SubjectsPageGuard } from './auth/subjects-page.guard';
import { TeachersPageGuard } from './auth/teachers-page.guard';
import { GradesComponent } from './grades/grades.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ParentsComponent } from './parents/parents.component';
import { PrincipalsComponent } from './principals/principals.component';
import { RegisterComponent } from './register/register.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SchoolComponent } from './school/school.component';
import { SchoolsComponent } from './schools/schools.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TeachersComponent } from './teachers/teachers.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [ AutoLoginGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [ AutoLoginGuard ] },
  { path: 'grades', component: GradesComponent, canActivate: [ AuthGuard ] },
  { path: 'absences', component: AbsencesComponent, canActivate: [ AuthGuard ] },
  { path: 'students', component: StudentsComponent, canActivate: [ StudentsPageGuard, AuthGuard ] },
  { path: 'parents', component: ParentsComponent, canActivate: [ AdminGuard, AuthGuard ] },
  { path: 'teachers', component: TeachersComponent, canActivate: [ TeachersPageGuard, AuthGuard ] },
  { path: 'principals', component: PrincipalsComponent, canActivate: [ AdminGuard, AuthGuard ] },
  { path: 'subjects', component: SubjectsComponent, canActivate: [ SubjectsPageGuard, AuthGuard ] },
  { path: 'school', component: SchoolComponent, canActivate: [ PrincipalGuard, AuthGuard ] },
  { path: 'schools', component: SchoolsComponent, canActivate: [ AdminGuard, AuthGuard ] },
  { path: 'users', component: UsersComponent, canActivate: [ AdminGuard, AuthGuard ] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [ AuthGuard ] },
  { path: 'schedule', component: ScheduleComponent, canActivate: [ AuthGuard ] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
