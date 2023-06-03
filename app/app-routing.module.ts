import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from 'src/modules/home/home.component';
import { Qualify } from 'src/modules/qualify/qualify.component';
import { RegisterStudent } from 'src/modules/students/register/register.component';
import { ShowStudents } from 'src/modules/students/show-students/showStudents.component';
import { ShowSubjects } from 'src/modules/subjects/show-subjects/showSubjects.component';
import { RegisterSubjects } from 'src/modules/subjects/register-subjects/registerSubjects.component';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'calificar', component: Qualify },
  { path: 'mostrar', component: ShowStudents },
  { path: 'registrar', component: RegisterStudent },
  { path: 'mostrar-asignaturas', component: ShowSubjects },
  { path: 'registrar-asignatura', component: RegisterSubjects }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
