import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RodeosListadoComponent } from './rodeos-listado.component';

describe('RodeosListadoComponent', () => {
  let component: RodeosListadoComponent;
  let fixture: ComponentFixture<RodeosListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RodeosListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RodeosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
