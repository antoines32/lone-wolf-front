import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = this.fb.group({
    userMail: ['', Validators.required],
    userPwd: ['', Validators.required],
  });
  AuthUserSub!: Subscription;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.AuthUserSub = this.authService.authenticatedUser$.subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['home']);
        }
      }
    })
  }

  submit() {
    if (this.loginForm.valid) {
      const userLogin = this.loginForm.value;
      this.authService.login(userLogin).subscribe({
        next: (result) => this.router.navigate(['home']),
        error: (err) => console.log(err),
      });
    }
  }

  ngOnDestroy(): void {
    this.AuthUserSub.unsubscribe();
  }
}
