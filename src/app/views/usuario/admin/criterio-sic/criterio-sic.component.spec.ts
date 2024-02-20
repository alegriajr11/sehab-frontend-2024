import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioSicComponent } from './criterio-sic.component';

describe('CriterioSicComponent', () => {
  let component: CriterioSicComponent;
  let fixture: ComponentFixture<CriterioSicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriterioSicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriterioSicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
