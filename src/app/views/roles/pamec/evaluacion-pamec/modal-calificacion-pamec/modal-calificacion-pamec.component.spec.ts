import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCalificacionPamecComponent } from './modal-calificacion-pamec.component';

describe('ModalCalificacionPamecComponent', () => {
  let component: ModalCalificacionPamecComponent;
  let fixture: ComponentFixture<ModalCalificacionPamecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCalificacionPamecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCalificacionPamecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
