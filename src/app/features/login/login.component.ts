import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  showPassword(element: HTMLInputElement): void {
    if (element.type === 'password') {
      element.type = 'text';
    } else {
      element.type = 'password';
    }
  }

  logInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ],
    ],
  });

  submitForm(): void {
    if (this.logInForm.valid) {
      this.authService.signIn(this.logInForm.value).subscribe({
        next: (res) => {
          if (res.message === 'success') {
            localStorage.setItem('freshToken', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.authService.isLogged.set(true);
            this.router.navigate(['/']);
          }
        },
      });
    } else {
      this.logInForm.markAllAsTouched();
    }
  }
}
