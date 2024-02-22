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
    firstKai: [{ value: null }, Validators.required],
    secondKai: [{ value: null }, Validators.required],
    thirdKai: [{ value: null }, Validators.required],
    fourthKai: [{ value: null }, Validators.required],
    fifthKai: [{ value: null }, Validators.required],
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
  kaiDisciplines: KaiDiscipline[] = [];
  kaiDisciplinesSelected: KaiDiscipline[] = [];
  descriptionFirstDisc = '';
  descriptionSecondDisc = '';
  descriptionThirdDisc = '';
  descriptionFourthDisc = '';
  descriptionFifthDisc = '';

  constructor(
    private fb: FormBuilder,
    private dice: DiceService,
    private adventureService: AdventureService
  ) {}

  ngOnInit(): void {
    this.adventureService.getKaiDisciplines().subscribe({
      next: (kais) => {
        this.kaiDisciplines = kais;
        for (let kai of this.kaiDisciplines) {
          kai.isSelected = false;
        }
      },
    });
    this.kaiDisciplineForm.controls['firstKai'].valueChanges.subscribe(
      (val) => {
        let index = this.kaiDisciplines.indexOf(val);
        //this.kaiDisciplines[index].isSelected = true;
        this.descriptionFirstDisc = this.kaiDisciplines[index].description;
      }
    );
    this.kaiDisciplineForm.controls['secondKai'].valueChanges.subscribe(
      (val) => {
        let index = this.kaiDisciplines.indexOf(val);
        //this.kaiDisciplines[index].isSelected = true;
        this.descriptionSecondDisc = this.kaiDisciplines[index].description;
      }
    );
    this.kaiDisciplineForm.controls['thirdKai'].valueChanges.subscribe(
      (val) => {
        let index = this.kaiDisciplines.indexOf(val);
        //this.kaiDisciplines[index].isSelected = true;
        this.descriptionThirdDisc = this.kaiDisciplines[index].description;
      }
    );
    this.kaiDisciplineForm.controls['fourthKai'].valueChanges.subscribe(
      (val) => {
        let index = this.kaiDisciplines.indexOf(val);
        //this.kaiDisciplines[index].isSelected = true;
        this.descriptionFourthDisc = this.kaiDisciplines[index].description;
      }
    );
    this.kaiDisciplineForm.controls['fifthKai'].valueChanges.subscribe(
      (val) => {
        let index = this.kaiDisciplines.indexOf(val);
        //this.kaiDisciplines[index].isSelected = true;
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
}
