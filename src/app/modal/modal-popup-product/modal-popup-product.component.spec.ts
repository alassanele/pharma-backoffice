import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPopupProductComponent } from './modal-popup-product.component';

describe('ModalPopupProductComponent', () => {
  let component: ModalPopupProductComponent;
  let fixture: ComponentFixture<ModalPopupProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalPopupProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalPopupProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
