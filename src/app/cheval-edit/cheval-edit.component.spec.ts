import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChevalEditComponent } from './cheval-edit.component';

describe('ChevalEditComponent', () => {
  let component: ChevalEditComponent;
  let fixture: ComponentFixture<ChevalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChevalEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChevalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
