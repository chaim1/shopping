import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductaddUpdateComponent } from './productadd-update.component';

describe('ProductaddUpdateComponent', () => {
  let component: ProductaddUpdateComponent;
  let fixture: ComponentFixture<ProductaddUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductaddUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductaddUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
