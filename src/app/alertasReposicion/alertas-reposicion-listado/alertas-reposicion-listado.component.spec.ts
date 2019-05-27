import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasReposicionListadoComponent } from './alertas-reposicion-listado.component';

describe('AlertasReposicionListadoComponent', () => {
  let component: AlertasReposicionListadoComponent;
  let fixture: ComponentFixture<AlertasReposicionListadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertasReposicionListadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertasReposicionListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
