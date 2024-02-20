import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoUsuarioRolComponent } from './nuevo-usuario-rol.component';

describe('NuevoUsuarioRolComponent', () => {
  let component: NuevoUsuarioRolComponent;
  let fixture: ComponentFixture<NuevoUsuarioRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuevoUsuarioRolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoUsuarioRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
