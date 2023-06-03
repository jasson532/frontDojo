import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Qualify } from 'src/modules/qualify/qualify.component';
import { RegisterStudent } from 'src/modules/students/register/register.component';
import { ShowStudents } from 'src/modules/students/show-students/showStudents.component';
import { ShowSubjects } from 'src/modules/subjects/show-subjects/showSubjects.component';
import { RegisterSubjects } from 'src/modules/subjects/register-subjects/registerSubjects.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterStudent,
    ShowStudents,
    RegisterSubjects,
    ShowSubjects,
    Qualify
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    RegisterStudent,
    ShowStudents,
    RegisterSubjects,
    ShowSubjects,
    Qualify
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
