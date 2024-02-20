import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesSicComponent } from './evaluaciones-sic.component';

describe('EvaluacionesSicComponent', () => {
  let component: EvaluacionesSicComponent;
  let fixture: ComponentFixture<EvaluacionesSicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluacionesSicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionesSicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
