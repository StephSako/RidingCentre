import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepriseEditComponent } from './reprise-edit.component';

describe('RepriseEditComponent', () => {
  let component: RepriseEditComponent;
  let fixture: ComponentFixture<RepriseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepriseEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepriseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
