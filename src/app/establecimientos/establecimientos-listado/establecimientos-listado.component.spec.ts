import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientosListadoComponent } from './establecimientos-listado.component';

describe('EstablecimientosListadoComponent', () => {
  let component: EstablecimientosListadoComponent;
  let fixture: ComponentFixture<EstablecimientosListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstablecimientosListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstablecimientosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
