import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionSicComponent } from './evaluacion-sic.component';

describe('EvaluacionSicComponent', () => {
  let component: EvaluacionSicComponent;
  let fixture: ComponentFixture<EvaluacionSicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluacionSicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionSicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
