import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesPamecComponent } from './evaluaciones-pamec.component';

describe('EvaluacionesPamecComponent', () => {
  let component: EvaluacionesPamecComponent;
  let fixture: ComponentFixture<EvaluacionesPamecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluacionesPamecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionesPamecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
