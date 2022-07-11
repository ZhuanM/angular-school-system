import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AbsencesComponent } from './absences/absences.component';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
import { AutoLoginGuard } from './auth/auto-login.guard';
import { GradesComponent } from './grades/grades.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SchoolsComponent } from './schools/schools.component';
import { StudentsComponent } from './students/students.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { TeachersComponent } from './teachers/teachers.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [ AutoLoginGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [ AutoLoginGuard ] },
  { path: 'grades', component: GradesComponent, canActivate: [ AuthGuard ] },
  { path: 'absences', component: AbsencesComponent, canActivate: [ AuthGuard ] },
  { path: 'students', component: StudentsComponent, canActivate: [ AuthGuard ] },
  { path: 'teachers', component: TeachersComponent, canActivate: [ AuthGuard ] },
  { path: 'subjects', component: SubjectsComponent, canActivate: [ AuthGuard ] },
  { path: 'schools', component: SchoolsComponent, canActivate: [ AdminGuard, AuthGuard ] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
