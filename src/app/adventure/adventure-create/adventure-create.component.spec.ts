import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureCreateComponent } from './adventure-create.component';

describe('AdventureCreateComponent', () => {
  let component: AdventureCreateComponent;
  let fixture: ComponentFixture<AdventureCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventureCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventureCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
