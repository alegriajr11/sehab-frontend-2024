import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionIndependientesComponent } from './evaluacion-independientes.component';

describe('EvaluacionIndependientesComponent', () => {
  let component: EvaluacionIndependientesComponent;
  let fixture: ComponentFixture<EvaluacionIndependientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluacionIndependientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionIndependientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
