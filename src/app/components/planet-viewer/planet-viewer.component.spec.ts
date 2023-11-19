import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetViewerComponent } from './planet-viewer.component';

describe('PlanetViewerComponent', () => {
  let component: PlanetViewerComponent;
  let fixture: ComponentFixture<PlanetViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanetViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlanetViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
