import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaPamecComponent } from './acta-pamec.component';

describe('ActaPamecComponent', () => {
  let component: ActaPamecComponent;
  let fixture: ComponentFixture<ActaPamecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActaPamecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActaPamecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
