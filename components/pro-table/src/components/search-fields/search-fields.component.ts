import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'vts-search-fields',
  templateUrl: './search-fields.component.html',
  styleUrls: ['./search-fields.component.less']
})
export class VtsSearchFieldsComponent implements OnInit {
  validateForm!: FormGroup;
  controlArray: Array<{ index: number; show: boolean }> = [];
  @Input() vtsIsCollapse = true;
  @Input() vtsNoDisplayProperties: number = 3;
  @Input() vtsTotalProperties: number = 7;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
    for (let i = 1; i <= this.vtsTotalProperties; i++) {
      this.controlArray.push({ index: i, show: i <= this.vtsNoDisplayProperties });
      this.validateForm.addControl(`property${i}`, new FormControl());
    }
  }
  
  mockFn() {
    alert('Mock function!');
  }

  toggleCollapse(): void {
    this.vtsIsCollapse = !this.vtsIsCollapse;
    this.controlArray.forEach((c, index) => {
      c.show = this.vtsIsCollapse ? index < this.vtsNoDisplayProperties : true;
    });
  }

  resetForm(): void {
    this.validateForm.reset();
  }
}