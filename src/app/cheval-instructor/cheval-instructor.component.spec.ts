import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChevalInstructorComponent } from './cheval-instructor.component';

describe('ChevalInstructorComponent', () => {
  let component: ChevalInstructorComponent;
  let fixture: ComponentFixture<ChevalInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChevalInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChevalInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
