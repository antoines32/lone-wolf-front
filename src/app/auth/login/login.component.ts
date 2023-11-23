import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup = this.fb.group({
    userMail: ['', Validators.required],
    userPwd: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  submit() {
    if (this.loginForm.valid) {
      const userLogin = this.loginForm.value;
      this.authService.login(userLogin).subscribe((result) => {
        localStorage.setItem('accesToken', result.access_token);
      });
    }
  }
}
