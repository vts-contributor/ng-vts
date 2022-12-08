import { Component } from '@angular/core';

const tagsFromServer = ['Movie', 'Books', 'Music', 'Sports'];

@Component({
  selector: 'vts-demo-tag-hot-tags',
  template: `
    <strong>Categories:</strong>
    <vts-tag
      *ngFor="let tag of hotTags"
      vtsMode="checkable"
      [vtsChecked]="selectedTags.indexOf(tag) > -1"
      (vtsCheckedChange)="handleChange($event, tag)"
    >
      {{ tag }}
    </vts-tag>
  `
})
export class VtsDemoTagHotTagsComponent {
  hotTags = tagsFromServer;
  selectedTags: string[] = [];

  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    console.log('You are interested in: ', this.selectedTags);
  }
}
