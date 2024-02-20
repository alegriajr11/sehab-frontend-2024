import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionPamecComponent } from './evaluacion-pamec.component';

describe('EvaluacionPamecComponent', () => {
  let component: EvaluacionPamecComponent;
  let fixture: ComponentFixture<EvaluacionPamecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluacionPamecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionPamecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
