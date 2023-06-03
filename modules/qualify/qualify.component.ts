import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Modal } from "bootstrap";

@Component({
  selector: 'qualify-student',
  templateUrl: './qualify.component.html',
  styleUrls: ['./qualify.component.scss'],
})
export class Qualify implements OnInit {
  public students: any = [];
  public subjects: any = [];
  public qualifies: any = [];

  public idStudent: string = '';
  public idSubject: string = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.getStudents();
    this.getSubjects();
  }

  getStudents() {
    this.http.get('http://localhost:3010/estudiantes')
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.students = response
        },
        error: (error) => {
          console.error('Error al enviar los datos:', error);
        }
      });
  }

  getSubjects() {
    this.http.get('http://localhost:3010/asignaturas')
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.subjects = response
        },
        error: (error) => {
          console.error('Error al enviar los datos:', error);
        }
      });
  }

  getQualifies(event: any, type: string) {
    const value = event.target.value;
    if (type === 'student') {
      this.idStudent = value;
    } else {
      this.idSubject = value;
    }
    
    if (![this.idStudent, this.idSubject].includes('')) {
      console.log('NOS VAMOS A TRAER LAS NOTAS');
      this.http.post('http://localhost:3010/notas', {student: this.idStudent, subject: this.idSubject})
      .subscribe({
        next: (response: any) => {
          
          for (let index = 0; index <= 2; index++) {
            if (!response[index]) {
              response[index] = {nota: 0}
            }
          }
          console.log('Respuesta del servidor:', response);
          this.qualifies = response;
        },
        error: (error) => {
          console.log('Error al enviar los datos:', error);
        }
      });
    }

  }

  calcularPromedioNotas(): number {
    let sumaNotas = 0;
    let cantidadNotas = 0;
  
    for (let qualify of this.qualifies) {
      sumaNotas += qualify.nota;
      cantidadNotas++;
    }
  
    const promedio = cantidadNotas > 0 ? sumaNotas / cantidadNotas : 0;
  
    return promedio;
  }

}
