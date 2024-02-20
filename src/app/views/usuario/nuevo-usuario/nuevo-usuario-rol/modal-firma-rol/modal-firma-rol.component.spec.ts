import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFirmaRolComponent } from './modal-firma-rol.component';

describe('ModalFirmaRolComponent', () => {
  let component: ModalFirmaRolComponent;
  let fixture: ComponentFixture<ModalFirmaRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalFirmaRolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalFirmaRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
