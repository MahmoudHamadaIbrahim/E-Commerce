import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInfoComponent } from './details-info.component';

describe('DetailsInfoComponent', () => {
  let component: DetailsInfoComponent;
  let fixture: ComponentFixture<DetailsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
