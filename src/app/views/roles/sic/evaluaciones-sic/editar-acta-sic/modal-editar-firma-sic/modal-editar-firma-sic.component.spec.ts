import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditarFirmaSicComponent } from './modal-editar-firma-sic.component';

describe('ModalEditarFirmaSicComponent', () => {
  let component: ModalEditarFirmaSicComponent;
  let fixture: ComponentFixture<ModalEditarFirmaSicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalEditarFirmaSicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditarFirmaSicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
