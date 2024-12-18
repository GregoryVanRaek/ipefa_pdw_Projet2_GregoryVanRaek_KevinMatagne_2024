import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFallBackPageComponent } from './dashboard-fall-back-page.component';

describe('DashboardFallBackPageComponent', () => {
  let component: DashboardFallBackPageComponent;
  let fixture: ComponentFixture<DashboardFallBackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardFallBackPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardFallBackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
