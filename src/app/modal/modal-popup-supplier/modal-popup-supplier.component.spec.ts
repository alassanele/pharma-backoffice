import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPopupSupplierComponent } from './modal-popup-supplier.component';

describe('ModalPopupSupplierComponent', () => {
  let component: ModalPopupSupplierComponent;
  let fixture: ComponentFixture<ModalPopupSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalPopupSupplierComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPopupSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
