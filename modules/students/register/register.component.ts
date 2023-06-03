import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'register-student',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterStudent {
  @Input() student: any = {};
  @Input() disabledCode: boolean = false;
  @Input() title: string = 'Registro de Estudiante';
  @Input() labelAction: string = 'Registrar Estudiante';
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  

  constructor(private http: HttpClient) {}

  submitForm(event: Event) {
    event.preventDefault()
  }

  registerStudent(codigo: string, identificacion: string, nombre: string, apellido: string, fechanato: string) {

    const student = {
      codigo,
      nombre,
      apellido,
      fechanato,
      identificacion
    };

    if (Object.values(student).map((valor) => valor || '').includes('')) {
      return;
    }

    if (this.labelAction === 'Registrar Estudiante') {
      this.notifyAlert('Registrando Estudiante...', 'info');
      this.http.post('http://localhost:3010/insertar-estudiante', student)
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
      this.http.post('http://localhost:3010/editar-estudiante', student)
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
