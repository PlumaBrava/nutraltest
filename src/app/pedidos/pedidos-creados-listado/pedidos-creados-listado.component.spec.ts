import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosCreadosListadoComponent } from './pedidos-creados-listado.component';

describe('PedidosCreadosListadoComponent', () => {
  let component: PedidosCreadosListadoComponent;
  let fixture: ComponentFixture<PedidosCreadosListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosCreadosListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosCreadosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
