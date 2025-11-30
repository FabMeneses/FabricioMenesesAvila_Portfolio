import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-home',
  imports: [AnimateOnScrollDirective, ReactiveFormsModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block w-full grow' },
})
export class HomeComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isSubmitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal(false);

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting.set(true);
      this.submitSuccess.set(false);
      this.submitError.set(false);

      this.contactService.sendEmail(this.contactForm.value).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.submitSuccess.set(true);
          this.contactForm.reset();
          setTimeout(() => {
            this.submitSuccess.set(false);
          }, 5000);
        },
        error: () => {
          this.isSubmitting.set(false);
          this.submitError.set(true);
          setTimeout(() => {
            this.submitError.set(false);
          }, 5000);
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
