import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaIpsComponent } from './acta-ips.component';

describe('ActaIpsComponent', () => {
  let component: ActaIpsComponent;
  let fixture: ComponentFixture<ActaIpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActaIpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActaIpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
