import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DiceService {
  constructor() {}

  rollADice(): number {
    return Math.floor(Math.random() * 10);
  }
}
