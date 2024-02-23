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
import { AdventureService } from '../adventure.service';
import { KaiDiscipline } from '../model/kai-discipline.model';
import { RandomItem } from '../model/rarndom-item.model';

@Component({
  selector: 'app-adventure-create',
  standalone: true,
  imports: [CommonModule, MatStepperModule, FormsModule, ReactiveFormsModule],
  templateUrl: './adventure-create.component.html',
  styleUrl: './adventure-create.component.scss',
})
export class AdventureCreateComponent implements OnInit {
  isLinear = true;
  bookName = 'FlightFromTheDark'
  nameForm: FormGroup = this.fb.group({
    characterName: ['', Validators.required],
  });
  skillForm: FormGroup = this.fb.group({
    endurance: [{ value: null, disabled: true }, Validators.required],
    skillPoints: [{ value: null, disabled: true }, Validators.required],
  });
  kaiDisciplineForm: FormGroup = this.fb.group({
    firstKai: [{ value: null }, Validators.required],
    secondKai: [{ value: null }, Validators.required],
    thirdKai: [{ value: null }, Validators.required],
    fourthKai: [{ value: null }, Validators.required],
    fifthKai: [{ value: null }, Validators.required],
  });
  itemForm: FormGroup = this.fb.group({
    item: [{ value: null, disabled: true }, Validators.required],
    gold: [{ value: null, disabled: true }, Validators.required],
  });
  randomItems: RandomItem[] = [];
  kaiDisciplines: KaiDiscipline[] = [];
  descriptionFirstDisc = '';
  descriptionSecondDisc = '';
  descriptionThirdDisc = '';
  descriptionFourthDisc = '';
  descriptionFifthDisc = '';
  descriptionRandomItem = '';
  secondWeapon = '';
  supplementaryItem = '';
  secondSupplementaryItem = '';
  isGettingGold = false;
  masteredWeapon = '';

  constructor(
    private fb: FormBuilder,
    private dice: DiceService,
    private adventureService: AdventureService
  ) { }

  ngOnInit(): void {
    this.adventureService.getKaiDisciplines().subscribe({
      next: (kais) => {
        this.kaiDisciplines = kais;
        for (let kai of this.kaiDisciplines) {
          kai.isSelected = false;
        }
      },
    });
    this.adventureService.getRandomItemByBookName(this.bookName).subscribe({
      next: (items) => this.randomItems = items
    })
    this.kaiDisciplineForm.controls['firstKai'].valueChanges.subscribe(
      (val) => {
        let index = this.kaiDisciplines.indexOf(val);
        this.descriptionFirstDisc = this.kaiDisciplines[index].description;
      }
    );
    this.kaiDisciplineForm.controls['secondKai'].valueChanges.subscribe(
      (val) => {
        let index = this.kaiDisciplines.indexOf(val);
        this.descriptionSecondDisc = this.kaiDisciplines[index].description;
      }
    );
    this.kaiDisciplineForm.controls['thirdKai'].valueChanges.subscribe(
      (val) => {
        let index = this.kaiDisciplines.indexOf(val);
        this.descriptionThirdDisc = this.kaiDisciplines[index].description;
      }
    );
    this.kaiDisciplineForm.controls['fourthKai'].valueChanges.subscribe(
      (val) => {
        let index = this.kaiDisciplines.indexOf(val);
        this.descriptionFourthDisc = this.kaiDisciplines[index].description;
      }
    );
    this.kaiDisciplineForm.controls['fifthKai'].valueChanges.subscribe(
      (val) => {
        let index = this.kaiDisciplines.indexOf(val);
        this.descriptionFifthDisc = this.kaiDisciplines[index].description;
      }
    );
  }

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

  rollItem() {
    if (this.itemForm.controls['item'].value == null) {
      const resultDice = this.dice.rollADice();
      const selectedItem = this.randomItems.find(item => item.diceNumber === resultDice);
      if (selectedItem) {
        this.itemForm.controls['item'].setValue(selectedItem.name);
        this.descriptionRandomItem = selectedItem.description;
        switch (selectedItem.diceNumber) {
          case 0:
            this.secondWeapon = selectedItem.name;
            break;

          case 1:
            this.secondWeapon = selectedItem.name;
            break;

          case 2:
            this.supplementaryItem = selectedItem.name;
            break;

          case 3:
            this.supplementaryItem = 'repas';
            this.secondSupplementaryItem = 'repas';
            break;

          case 4:
            this.supplementaryItem = selectedItem.name;
            break;

          case 5:
            this.secondWeapon = selectedItem.name;
            break;

          case 6:
            this.supplementaryItem = selectedItem.name;
            break;

          case 7:
            this.secondWeapon = selectedItem.name;
            break;

          case 8:
            this.secondWeapon = selectedItem.name;
            break;

          case 9:
            this.isGettingGold = true;
            break;

          default:
            break;
        }
      }
    }
  }

  rollWeapon() {
    if (this.masteredWeapon === '') {
      const resultDice = this.dice.rollADice();
      const masteredWeapons = [
        'POIGNARD', 'LANCE', "MASSE D'ARMES", 'SABRE', 'MARTEAU DE GUERRE', 'ÉPÉE', 'HACHE', 'ÉPEE', 'BATON', 'GLAIVE'
      ];
      this.masteredWeapon = masteredWeapons[resultDice];
      for (let kai of this.kaiDisciplines) {
        if (kai.name === 'Maîtrise des armes') {
          kai.name = `Maîtrise des armes : ${this.masteredWeapon}`;
        }
      }
    }

  }
}
