import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCreatePageComponent } from './site-create-page.component';

describe('SiteCreatePageComponent', () => {
  let component: SiteCreatePageComponent;
  let fixture: ComponentFixture<SiteCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteCreatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
