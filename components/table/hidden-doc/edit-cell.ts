import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}

@Component({
  selector: 'vts-demo-table-edit-cell',
  template: `
    <button vts-button (click)="addRow()" vtsType="primary">Add</button>
    <br />
    <br />
    <vts-table #editRowTable vtsBordered [vtsData]="listOfData">
      <thead>
        <tr>
          <th vtsWidth="30%">Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of editRowTable.data" class="editable-row">
          <td>
            <div class="editable-cell" [hidden]="editId === data.id" (click)="startEdit(data.id)">
              {{ data.name }}
            </div>
            <input
              [hidden]="editId !== data.id"
              type="text"
              vts-input
              [(ngModel)]="data.name"
              (blur)="stopEdit()"
            />
          </td>
          <td>{{ data.age }}</td>
          <td>{{ data.address }}</td>
          <td>
            <a
              vts-popconfirm
              vtsPopconfirmTitle="Sure to delete?"
              (vtsOnConfirm)="deleteRow(data.id)"
            >
              Delete
            </a>
          </td>
        </tr>
      </tbody>
    </vts-table>
  `,
  styles: [
    `
      .editable-cell {
        position: relative;
        padding: 5px 12px;
        cursor: pointer;
      }

      .editable-row:hover .editable-cell {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 4px 11px;
      }
    `
  ]
})
export class VtsDemoTableEditCellComponent implements OnInit {
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  ngOnInit(): void {
    this.addRow();
    this.addRow();
  }
}
