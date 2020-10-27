import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepriseCreateComponent } from './reprise-create.component';

describe('RepriseCreateComponent', () => {
  let component: RepriseCreateComponent;
  let fixture: ComponentFixture<RepriseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepriseCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepriseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
