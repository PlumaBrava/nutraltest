import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RodeosDetalleComponent } from './rodeos-detalle.component';

describe('RodeosDetalleComponent', () => {
  let component: RodeosDetalleComponent;
  let fixture: ComponentFixture<RodeosDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RodeosDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RodeosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
