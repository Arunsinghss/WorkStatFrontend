import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { AddEmployeComponent } from './components/add-employe/add-employe.component';
import { ProfileComponent } from './components/profile/profile.component';
import { GetProjectComponent } from './components/get-project/get-project.component';
import { EmployeelistComponent } from './components/employeelist/employeelist.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/:id', component: RegisterComponent },
  { path: 'add-project', component: CreateProjectComponent },
  { path: 'add-project/:id', component: CreateProjectComponent },
  { path: 'add-employee', component: AddEmployeComponent },
  { path: 'employee-list', component: EmployeelistComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'projectlist', component: GetProjectComponent },
  // { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
