import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarActaSicComponent } from './editar-acta-sic.component';

describe('EditarActaSicComponent', () => {
  let component: EditarActaSicComponent;
  let fixture: ComponentFixture<EditarActaSicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarActaSicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarActaSicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
