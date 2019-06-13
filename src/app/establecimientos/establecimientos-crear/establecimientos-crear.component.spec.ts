import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientosCrearComponent } from './establecimientos-crear.component';

describe('EstablecimientosCrearComponent', () => {
  let component: EstablecimientosCrearComponent;
  let fixture: ComponentFixture<EstablecimientosCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablecimientosCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablecimientosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
