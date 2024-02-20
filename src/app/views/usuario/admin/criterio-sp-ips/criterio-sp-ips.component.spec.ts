import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriterioSpIpsComponent } from './criterio-sp-ips.component';

describe('CriterioSpIpsComponent', () => {
  let component: CriterioSpIpsComponent;
  let fixture: ComponentFixture<CriterioSpIpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriterioSpIpsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriterioSpIpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
