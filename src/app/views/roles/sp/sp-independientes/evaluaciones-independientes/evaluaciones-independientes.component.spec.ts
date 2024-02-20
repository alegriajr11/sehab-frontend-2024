import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesIndependientesComponent } from './evaluaciones-independientes.component';

describe('EvaluacionesIndependientesComponent', () => {
  let component: EvaluacionesIndependientesComponent;
  let fixture: ComponentFixture<EvaluacionesIndependientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluacionesIndependientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionesIndependientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
