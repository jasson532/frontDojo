import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'register-subjects',
  templateUrl: './registerSubjects.component.html',
  styleUrls: ['./registerSubjects.component.scss'],
})

export class RegisterSubjects {
  @Input() subject: any = {};
  @Input() title: string = 'Registro de Asignaturas';
  @Input() labelAction: string = 'Registrar Asignatura';
  @Output() closeModal: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {}

  submitForm(event: Event) {
    event.preventDefault()
  }

  registerSubject(nombre: string) {
    const subject: any = {
      nombre,
    };

    if (Object.values(subject).map((valor) => valor || '').includes('')) {
      return;
    }

    if (this.labelAction === 'Registrar Asignatura') {
      this.notifyAlert('Registrando Asignatura...', 'info');
      this.http.post('http://localhost:3010/insertar-asignatura', subject)
      .subscribe({
        next: (response: any) => {
          console.log('Respuesta del servidor:', response);
          setTimeout(() => this.notifyAlert(response.mensaje??'', 'success'), 3000);
        },
        error: (error) => {
          console.log('Error al enviar los datos:', error);
          setTimeout(() => this.notifyAlert('Lo sentimos ha ocurrido un error', 'danger'), 3000);
        }
      });
    } else {
      subject.id = this.subject.id
      this.http.post('http://localhost:3010/editar-asignatura', subject)
      .subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          this.closeModal.emit();
        },
        error: (error) => {
          console.log('Error al enviar los datos:', error);
          this.closeModal.emit();
        }
      });
    }
    
  }

  notifyAlert(description: string, classAlert: string) {
    const elAlert = document.getElementById('alert-register');
    if (elAlert) {
      elAlert.innerHTML = `<div class="alert alert-${classAlert}" role="alert">${description}</div>`;
    }
  }
  
}
