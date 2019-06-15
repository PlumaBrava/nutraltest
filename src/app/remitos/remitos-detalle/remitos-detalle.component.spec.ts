import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitosDetalleComponent } from './remitos-detalle.component';

describe('RemitosDetalleComponent', () => {
  let component: RemitosDetalleComponent;
  let fixture: ComponentFixture<RemitosDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemitosDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
