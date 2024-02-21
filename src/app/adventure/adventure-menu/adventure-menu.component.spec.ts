import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdventureMenuComponent } from './adventure-menu.component';

describe('AdventureMenuComponent', () => {
  let component: AdventureMenuComponent;
  let fixture: ComponentFixture<AdventureMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdventureMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdventureMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
