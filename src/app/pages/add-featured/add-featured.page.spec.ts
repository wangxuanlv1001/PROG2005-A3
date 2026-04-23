import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFeaturedPage } from './add-featured.page';

describe('AddFeaturedPage', () => {
  let component: AddFeaturedPage;
  let fixture: ComponentFixture<AddFeaturedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeaturedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
