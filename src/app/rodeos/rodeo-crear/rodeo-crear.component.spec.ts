import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RodeoCrearComponent } from './rodeo-crear.component';

describe('RodeoCrearComponent', () => {
  let component: RodeoCrearComponent;
  let fixture: ComponentFixture<RodeoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RodeoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RodeoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
