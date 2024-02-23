import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEvaluacionSicComponent } from './editar-evaluacion-sic.component';

describe('EditarEvaluacionSicComponent', () => {
  let component: EditarEvaluacionSicComponent;
  let fixture: ComponentFixture<EditarEvaluacionSicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarEvaluacionSicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarEvaluacionSicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
