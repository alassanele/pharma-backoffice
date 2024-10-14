import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutAddComponent } from './prodcut-add.component';

describe('ProdcutAddComponent', () => {
  let component: ProdcutAddComponent;
  let fixture: ComponentFixture<ProdcutAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdcutAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdcutAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
