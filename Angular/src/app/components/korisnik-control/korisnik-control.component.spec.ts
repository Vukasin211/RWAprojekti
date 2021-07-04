import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikControlComponent } from './korisnik-control.component';

describe('KorisnikControlComponent', () => {
  let component: KorisnikControlComponent;
  let fixture: ComponentFixture<KorisnikControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisnikControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
