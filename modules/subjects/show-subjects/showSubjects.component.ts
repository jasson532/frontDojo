import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Modal } from "bootstrap";

@Component({
  selector: 'show-subjects',
  templateUrl: './showSubjects.component.html',
  styleUrls: ['./showSubjects.component.scss'],
})

export class ShowSubjects implements OnInit{
  public subjects: any = [];
  public subject: any = {};
  
  private modalForm: any;
  private modalDelete: any;

  constructor(private http: HttpClient) {
    this.getSubjects();
  }

  ngOnInit() {
    const elForm = document.getElementById('modalFormSubject');
    const elDelete = document.getElementById('modalDeleteSubject');
    
    this.modalForm = elForm && new Modal(elForm, {});
    this.modalDelete = elDelete && new Modal(elDelete, {});
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

  openModalForm(subjectSelected: any) {
    this.subject = subjectSelected;
    console.log('this.subject ', this.subject);
    
    this.modalForm.show();
  }

  openModalDelete(subjectSelected: any) {
    this.subject = subjectSelected;
    this.modalDelete.show()
  }

  deleteSubject(subject: any) {
    this.http.post('http://localhost:3010/eliminar-asignatura', subject)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.getSubjects();
          this.modalDelete.hide()
        },
        error: (error) => {
          this.modalDelete.hide()
        }
      });
      
  }

  closeModalForm() {
    this.modalForm.hide();
    this.getSubjects();
  }

}
