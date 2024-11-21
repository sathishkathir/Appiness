import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormComponent],
      imports:[ReactiveFormsModule,ReactiveFormsModule,
        MatToolbarModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatCheckboxModule,
        BrowserAnimationsModule],
      providers:[FormBuilder]
    });
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form', () => {
    fixture.detectChanges();
    expect(component.form).toBeDefined();
    expect(component.form.controls['Order No']).toBeDefined();
    expect(component.form.controls['OrderedDate']).toBeDefined();
  });

  it('should validate required fields', () => {
    const orderNoControl = component.form.get('Order No');
    orderNoControl?.setValue('');
    expect(orderNoControl?.valid).toBeFalsy();
  });

  it('Display required asterisk for mandatory fields', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const requiredFields = compiled.querySelectorAll('span');
    expect(requiredFields.length).toBeGreaterThan(0);
  });

  it('should submit valid form data', () => {
    component.form.get('Order No')?.setValue('Order 123');
    component.form.get('OrderedDate')?.setValue('2024-11-20');
    component.form.get('OrderedInfo')?.setValue('Orferinfo');
    component.form.get('Price')?.setValue('260');
    component.form.get('Refurbished')?.setValue('No');
    component.form.get('Address')?.setValue('Navalur Chennai');

    component.onSubmit();
    expect(component.form.valid).toBeTruthy();
  });
});
