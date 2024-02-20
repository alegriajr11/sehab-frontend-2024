import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionesIpsComponent } from './evaluaciones-ips.component';

describe('EvaluacionesIpsComponent', () => {
  let component: EvaluacionesIpsComponent;
  let fixture: ComponentFixture<EvaluacionesIpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluacionesIpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionesIpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
