import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductvarietiesComponent } from './productvarieties.component';

describe('ProductvarietiesComponent', () => {
  let component: ProductvarietiesComponent;
  let fixture: ComponentFixture<ProductvarietiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductvarietiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductvarietiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
