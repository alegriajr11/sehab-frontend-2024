import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionIpsComponent } from './evaluacion-ips.component';

describe('EvaluacionIpsComponent', () => {
  let component: EvaluacionIpsComponent;
  let fixture: ComponentFixture<EvaluacionIpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EvaluacionIpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EvaluacionIpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
