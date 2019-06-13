import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RodeosHistorialComponent } from './rodeos-historial.component';

describe('RodeosHistorialComponent', () => {
  let component: RodeosHistorialComponent;
  let fixture: ComponentFixture<RodeosHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RodeosHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RodeosHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
