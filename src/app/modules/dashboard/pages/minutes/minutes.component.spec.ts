import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesComponent } from './minutes.component';

describe('MinutesComponent', () => {
  let component: MinutesComponent;
  let fixture: ComponentFixture<MinutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinutesComponent]
    });
    fixture = TestBed.createComponent(MinutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
