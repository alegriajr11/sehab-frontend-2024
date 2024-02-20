import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioPamecComponent } from './criterio-pamec.component';

describe('CriterioPamecComponent', () => {
  let component: CriterioPamecComponent;
  let fixture: ComponentFixture<CriterioPamecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriterioPamecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriterioPamecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
