import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoCreadoDetalleComponent } from './pedido-creado-detalle.component';

describe('PedidoCreadoDetalleComponent', () => {
  let component: PedidoCreadoDetalleComponent;
  let fixture: ComponentFixture<PedidoCreadoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoCreadoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoCreadoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
