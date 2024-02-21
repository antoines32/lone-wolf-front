import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adventure-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adventure-menu.component.html',
  styleUrl: './adventure-menu.component.scss',
})
export class AdventureMenuComponent {
  constructor(private router: Router) {}
  navigateToNewGame() {
    this.router.navigate(['adventure-create']);
  }
}
