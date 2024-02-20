import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaSicComponent } from './acta-sic.component';

describe('ActaSicComponent', () => {
  let component: ActaSicComponent;
  let fixture: ComponentFixture<ActaSicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActaSicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActaSicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
