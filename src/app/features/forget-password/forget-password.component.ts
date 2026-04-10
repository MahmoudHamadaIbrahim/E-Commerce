import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  step = signal<number>(1);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  code: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]);
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
  ]);

  showPassword(element: HTMLInputElement): void {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }

  submitEmail(event: Event): void {
    event.preventDefault();
    if (this.email.valid) {
      const data = { email: this.email.value };
      this.authService.forgetPassword(data).subscribe({
        next: (res) => {
          this.step.set(2);
        },
      });
    }
  }

  submitCode(event: Event): void {
    event.preventDefault();
    if (this.code.valid) {
      const data = { resetCode: this.code.value };
      this.authService.verifyResetCode(data).subscribe({
        next: (res) => {
          this.step.set(3);
        },
      });
    }
  }

  submitPassword(event: Event): void {
    event.preventDefault();
    if (this.password.valid) {
      const data = { email: this.email.value, newPassword: this.password.value };
      this.authService.resetPassword(data).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
        },
      });
    }
  }
}
