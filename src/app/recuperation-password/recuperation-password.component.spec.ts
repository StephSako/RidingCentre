import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperationPasswordComponent } from './recuperation-password.component';

describe('RecuperationPasswordComponent', () => {
  let component: RecuperationPasswordComponent;
  let fixture: ComponentFixture<RecuperationPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuperationPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperationPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
