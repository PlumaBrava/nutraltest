import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNoautorizadoComponent } from './usuario-noautorizado.component';

describe('UsuarioNoautorizadoComponent', () => {
  let component: UsuarioNoautorizadoComponent;
  let fixture: ComponentFixture<UsuarioNoautorizadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioNoautorizadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioNoautorizadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
