import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateDeletePage } from './update-delete.page';

describe('UpdateDeletePage', () => {
  let component: UpdateDeletePage;
  let fixture: ComponentFixture<UpdateDeletePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDeletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
