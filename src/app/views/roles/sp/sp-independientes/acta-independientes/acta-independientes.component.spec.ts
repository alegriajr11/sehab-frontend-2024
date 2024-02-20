import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaIndependientesComponent } from './acta-independientes.component';

describe('ActaIndependientesComponent', () => {
  let component: ActaIndependientesComponent;
  let fixture: ComponentFixture<ActaIndependientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActaIndependientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActaIndependientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
