import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChevalFormComponent } from './cheval-form.component';

describe('ChevalFormComponent', () => {
  let component: ChevalFormComponent;
  let fixture: ComponentFixture<ChevalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChevalFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChevalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
