import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
7;
import { MatStepperModule } from '@angular/material/stepper';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DiceService } from '../../core/dice.service';

@Component({
  selector: 'app-adventure-create',
  standalone: true,
  imports: [CommonModule, MatStepperModule, FormsModule, ReactiveFormsModule],
  templateUrl: './adventure-create.component.html',
  styleUrl: './adventure-create.component.scss',
})
export class AdventureCreateComponent implements OnInit {
  isLinear = true;
  nameForm: FormGroup = this.fb.group({
    characterName: ['', Validators.required],
  });
  skillForm: FormGroup = this.fb.group({
    endurance: [{ value: null, disabled: true }, Validators.required],
    skillPoints: [{ value: null, disabled: true }, Validators.required],
  });
  kaiDisciplineForm: FormGroup = this.fb.group({
    firstKai: [{ value: '', disabled: true }, Validators.required],
    secondKai: [{ value: '', disabled: true }, Validators.required],
    thirdKai: [{ value: '', disabled: true }, Validators.required],
    fourthKai: [{ value: '', disabled: true }, Validators.required],
    fifthKai: [{ value: '', disabled: true }, Validators.required],
  });
  itemForm: FormGroup = this.fb.group({
    item: [{ value: '', disabled: true }, Validators.required],
    gold: [{ value: null, disabled: true }, Validators.required],
  });
  randomItems: any[] = [
    { name: 'Glaive', desc: 'arme' },
    { name: 'Epée', desc: 'arme' },
    {
      name: 'Casque',
      desc: "(Objet spécial) il ajoute 2 points d'ENDURANCE a votre total",
    },
    { name: '2 repas', desc: 'ils prennent 2 places dans votre inventaire' },
    {
      name: 'Cotte de maille',
      desc: "(Objets Spéciaux), elle ajoute 4 points d'ENDURANCE à votre total.",
    },
    { name: "Masse d'arme", desc: 'arme' },
    {
      name: 'Potion de guérison',
      desc: "Elle rend 4 points d'ENDURANCE lorsque vous la buvez à l'issue d'un combat, mais vous ne disposez que d'une seule dose.",
    },
    { name: 'Baton', desc: 'arme' },
    { name: 'Lance', desc: 'arme' },
    { name: '12 Couronnes', desc: "Pièces d'or" },
  ];

  constructor(private fb: FormBuilder, private dice: DiceService) {}

  ngOnInit(): void {}

  rollSkillPoints() {
    if (this.skillForm.controls['skillPoints'].value == null) {
      this.skillForm.controls['skillPoints'].setValue(
        this.dice.rollADice() + 10
      );
    }
  }
  rollEndurance() {
    if (this.skillForm.controls['endurance'].value == null) {
      this.skillForm.controls['endurance'].setValue(this.dice.rollADice() + 20);
    }
  }
  rollGold() {
    if (this.itemForm.controls['gold'].value == null) {
      this.itemForm.controls['gold'].setValue(this.dice.rollADice());
    }
  }
}
