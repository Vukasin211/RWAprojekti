import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorControlComponent } from './moderator-control.component';

describe('ModeratorControlComponent', () => {
  let component: ModeratorControlComponent;
  let fixture: ComponentFixture<ModeratorControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeratorControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
