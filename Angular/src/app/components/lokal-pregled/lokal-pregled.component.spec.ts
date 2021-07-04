import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LokalPregledComponent } from './lokal-pregled.component';

describe('LokalPregledComponent', () => {
  let component: LokalPregledComponent;
  let fixture: ComponentFixture<LokalPregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LokalPregledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LokalPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
