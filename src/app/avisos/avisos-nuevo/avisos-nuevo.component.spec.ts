import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisosNuevoComponent } from './avisos-nuevo.component';

describe('AvisosNuevoComponent', () => {
  let component: AvisosNuevoComponent;
  let fixture: ComponentFixture<AvisosNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvisosNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvisosNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
