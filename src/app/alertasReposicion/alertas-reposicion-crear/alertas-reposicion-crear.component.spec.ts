import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasReposicionCrearComponent } from './alertas-reposicion-crear.component';

describe('AlertasReposicionCrearComponent', () => {
  let component: AlertasReposicionCrearComponent;
  let fixture: ComponentFixture<AlertasReposicionCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertasReposicionCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertasReposicionCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
