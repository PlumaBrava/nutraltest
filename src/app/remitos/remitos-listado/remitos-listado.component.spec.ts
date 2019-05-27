import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitosListadoComponent } from './remitos-listado.component';

describe('RemitosListadoComponent', () => {
  let component: RemitosListadoComponent;
  let fixture: ComponentFixture<RemitosListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemitosListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemitosListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
