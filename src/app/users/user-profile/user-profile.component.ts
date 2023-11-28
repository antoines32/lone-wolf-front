import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../models/user';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../../core/storage.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  userString = localStorage.getItem('authenticatedUser');
  user: User = { userMail: '', userName: '', userRole: '' };
  nameControl = new FormControl();
  mailControl = new FormControl();
  pwdControl = new FormControl();
  nameUpdate = false;
  mailUpdate = false;
  pwdUpdate = false;
  userSubscription: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private auth: AuthService,
    private storage: StorageService
  ) {}

  ngOnInit(): void {
    // if (this.userString) {
    //   this.user = JSON.parse(this.userString);
    // }
    this.userSubscription = this.auth.authenticatedUser$.subscribe({
      next: (user) => (this.user = user !== null ? user : this.user),
    });
  }

  updateField(fieldName: string, fieldValue: string) {
    // if (!this.userForm) {
    //   this.userForm = new FormGroup([]);
    // }
    // this.userForm.addControl(fieldName, new FormControl(fieldValue));
    // console.log(this.userForm);
    switch (fieldName) {
      case 'userName':
        this.nameControl.setValue(fieldValue);
        this.nameUpdate = true;
        break;

      case 'userMail':
        this.mailControl = new FormControl(fieldValue);
        this.mailUpdate = true;
        break;

      case 'userPwd':
        this.pwdControl = new FormControl(fieldValue);
        this.pwdUpdate = true;
        break;

      default:
        break;
    }
  }

  validateField(fieldName: string) {
    switch (fieldName) {
      case 'userName':
        this.userService
          .updateUser(this.user?.userMail, { userName: this.nameControl.value })
          .subscribe();
        this.nameUpdate = false;
        break;

      case 'userMail':
        this.userService
          .updateUser(this.user.userMail, { userMail: this.mailControl.value })
          .subscribe();
        this.mailUpdate = false;
        break;

      case 'userPwd':
        this.userService
          .updateUser(this.user.userMail, { userPwd: this.pwdControl.value })
          .subscribe();
        this.pwdUpdate = false;
        break;

      default:
        break;
    }
  }
}
