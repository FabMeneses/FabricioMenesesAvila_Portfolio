import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import emailjs from '@emailjs/browser';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Configuración de EmailJS
  private readonly EMAILJS_PUBLIC_KEY = '_bfqJjp9VCV73OwEB';
  private readonly EMAILJS_SERVICE_ID = 'service_o3hu3g6';
  private readonly EMAILJS_TEMPLATE_ID = 'template_jr59ma1';

  constructor() {
    // Inicializar EmailJS con tu Public Key
    emailjs.init(this.EMAILJS_PUBLIC_KEY);
  }

  sendEmail(data: ContactFormData): Observable<any> {
    return new Observable(observer => {
      // Enviar email usando EmailJS
      emailjs
        .send(
          this.EMAILJS_SERVICE_ID,
          this.EMAILJS_TEMPLATE_ID,
          {
            from_name: data.name,
            from_email: data.email,
            subject: data.subject,
            message: data.message,
            to_email: 'fmenesesavila1@gmail.com'
          }
        )
        .then(
          (response) => {
            observer.next({ success: true, response });
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
    });
  }
}

