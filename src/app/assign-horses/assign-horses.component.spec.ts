import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHorsesComponent } from './assign-horses.component';

describe('AssignHorsesComponent', () => {
  let component: AssignHorsesComponent;
  let fixture: ComponentFixture<AssignHorsesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignHorsesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignHorsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
