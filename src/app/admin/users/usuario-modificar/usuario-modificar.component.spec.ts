import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioModificarComponent } from './usuario-modificar.component';

describe('UsuarioModificarComponent', () => {
  let component: UsuarioModificarComponent;
  let fixture: ComponentFixture<UsuarioModificarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioModificarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioModificarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
