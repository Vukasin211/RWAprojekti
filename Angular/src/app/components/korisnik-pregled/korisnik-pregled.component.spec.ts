import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikPregledComponent } from './korisnik-pregled.component';

describe('KorisnikPregledComponent', () => {
  let component: KorisnikPregledComponent;
  let fixture: ComponentFixture<KorisnikPregledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorisnikPregledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KorisnikPregledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
