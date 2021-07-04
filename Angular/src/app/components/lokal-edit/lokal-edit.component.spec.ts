import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LokalEditComponent } from './lokal-edit.component';

describe('LokalEditComponent', () => {
  let component: LokalEditComponent;
  let fixture: ComponentFixture<LokalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LokalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LokalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
