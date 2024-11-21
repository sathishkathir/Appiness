import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;
  formDef!: any[];

  constructor(private fb: FormBuilder) {
    this.formDef = this.getformDef();
    this.form = this.fb.group({});
    this.formDef.forEach((field: any) => {
      const validators =
        field.validator && field.validator.includes('required')
          ? [Validators.required]
          : [];
      if (field.fieldtype === 'text') {
        this.form.addControl(field.name, this.fb.control('', validators));
      } else if (field.fieldtype === 'integer') {
        this.form.addControl(field.name, this.fb.control(0, validators));
      } else if (field.fieldtype === 'date') {
        this.form.addControl(field.name, this.fb.control('', validators));
      } else if (field.fieldtype === 'boolean') {
        this.form.addControl(field.name, this.fb.control(false));
      }
    });
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.formDef.forEach((field: any) => {
      const validators =
        field.validator && field.validator.includes('required')
          ? [Validators.required]
          : [];
      this.form.addControl(field.name, this.fb.control('', validators));
    });
  }

  getformDef() {
    return [
      {
        fieldtype: 'text',
        name: 'Order No',
        group: 'General Information',
        validator: ['required'],
      },
      {
        fieldtype: 'date',
        name: 'OrderedDate',
        group: 'General Information',
        validator: ['required'],
      },
      {
        fieldtype: 'text',
        name: 'OrderedInfo',
        group: 'General Information',
        validator: ['required'],
        condition: 'and',
        rules: [
          {
            field: 'OrderedDate',
            operator: '!=',
            value: '',
          },
        ],
      },
      {
        fieldtype: 'integer',
        name: 'Price',
        group: 'Product Information',
        validator: ['required'],
      },
      {
        fieldtype: 'boolean',
        name: 'Refurbished',
        group: 'Product Information',
        selectList: ['Yes', 'No'],
      },
      {
        fieldtype: 'text',
        name: 'Address',
        group: 'Product Information',
        condition: 'or',
        rules: [
          {
            field: 'Order No',
            operator: '>=',
            value: '100',
          },
          {
            field: 'Price',
            operator: '<=',
            value: '100',
          },
        ],
      },
    ];
  }

  checkConditions(field: any) {
    if (!field.condition) return true;
    if (!field.rules || field.rules.length === 0) return true;

    const formData = this.form.value;
    let condition = false;
    field.rules.forEach((rule: any) => {
      const fieldValue = formData[rule.field];
      switch (rule.operator) {
        case '>=':
          if (fieldValue >= parseFloat(rule.value)) {
            condition = true;
          }
          break;
        case '<=':
          if (fieldValue <= parseFloat(rule.value)) {
            condition = true;
          }
          break;
        case '!=':
          if (fieldValue != rule.value) {
            condition = true;
          }
          break;
        default:
          break;
      }
    });
    return condition;
  }

  onSubmit() {
    if (this.form.valid) {
      alert('dynamic Form Details added successfully');
      console.log('Form Data:', this.form.value);
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
