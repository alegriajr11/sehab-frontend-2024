import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioSpIndependientesComponent } from './criterio-sp-independientes.component';

describe('CriterioSpIndependientesComponent', () => {
  let component: CriterioSpIndependientesComponent;
  let fixture: ComponentFixture<CriterioSpIndependientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriterioSpIndependientesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriterioSpIndependientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
