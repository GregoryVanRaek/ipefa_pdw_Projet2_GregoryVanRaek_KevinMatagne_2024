import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFallbackPageComponent } from './home-fallback-page.component';

describe('HomeFallbackPageComponent', () => {
  let component: HomeFallbackPageComponent;
  let fixture: ComponentFixture<HomeFallbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFallbackPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFallbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
