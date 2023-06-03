import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { Modal } from "bootstrap";

@Component({
  selector: 'show-student',
  templateUrl: './showStudents.component.html',
  styleUrls: ['./showStudents.component.scss'],
})
export class ShowStudents implements OnInit{
  public students: any = [];
  public student: any = {};
  
  private modalForm: any;
  private modalDelete: any;

  constructor(private http: HttpClient) {
    this.getStudents();
  }

  ngOnInit() {
    const elForm = document.getElementById('modalFormStudent');
    const elDelete = document.getElementById('modalDeleteStudent');
    
    this.modalForm = elForm && new Modal(elForm, {});
    this.modalDelete = elDelete && new Modal(elDelete, {});
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

  openModalForm(studentSelected: any) {
    studentSelected.fechanato = this.formatDates(studentSelected.fechanato)
    this.student = studentSelected;
    this.modalForm.show();
  }

  openModalDelete(studentSelected: any) {
    this.student = studentSelected;
    this.modalDelete.show()
  } 

  formatDates(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }

  deleteStudent(student: any) {
    this.http.post('http://localhost:3010/eliminar-estudiante', student)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.getStudents();
          this.modalDelete.hide()
        },
        error: (error) => {
          console.log('Error al enviar los datos:', error);
          this.modalDelete.hide()
        }
      });
      
  }

  closeModalForm() {
    this.modalForm.hide();
    this.getStudents();
  }

}
