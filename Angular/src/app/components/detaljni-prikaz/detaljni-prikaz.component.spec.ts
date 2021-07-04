import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaljniPrikazComponent } from './detaljni-prikaz.component';

describe('DetaljniPrikazComponent', () => {
  let component: DetaljniPrikazComponent;
  let fixture: ComponentFixture<DetaljniPrikazComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetaljniPrikazComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaljniPrikazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
