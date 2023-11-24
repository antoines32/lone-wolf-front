import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group({
    userMail: ['', Validators.required],
    userName: ['', Validators.required],
    userPwd: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  submit() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.authService.signUp(user).subscribe({
        next: (user: User) => this.router.navigate(['../login']),
        error: (err) => console.log(err),
      });
    }
  }
}
