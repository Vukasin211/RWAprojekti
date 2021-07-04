import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LokalModeratorComponent } from './lokal-moderator.component';

describe('LokalModeratorComponent', () => {
  let component: LokalModeratorComponent;
  let fixture: ComponentFixture<LokalModeratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LokalModeratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LokalModeratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
