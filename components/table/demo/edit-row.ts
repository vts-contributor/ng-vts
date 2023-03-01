import { Component, OnInit } from '@angular/core';

interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'vts-demo-table-edit-row',
  template: `
    <vts-table #editRowTable vtsBordered [vtsData]="listOfData" vtsTableLayout="fixed">
      <thead>
        <tr>
          <th vtsWidth="25%">Name</th>
          <th vtsWidth="15%">Age</th>
          <th vtsWidth="40%">Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of editRowTable.data">
          <ng-container *ngIf="!editCache[data.id].edit; else editTemplate">
            <td>{{ data.name }}</td>
            <td>{{ data.age }}</td>
            <td>{{ data.address }}</td>
            <td><a (click)="startEdit(data.id)">Edit</a></td>
          </ng-container>
          <ng-template #editTemplate>
            <td>
              <input type="text" vts-input [(ngModel)]="editCache[data.id].data.name" />
            </td>
            <td>
              <input type="text" vts-input [(ngModel)]="editCache[data.id].data.age" />
            </td>
            <td>
              <input type="text" vts-input [(ngModel)]="editCache[data.id].data.address" />
            </td>
            <td>
              <a (click)="saveEdit(data.id)" class="save">Save</a>
              <a vts-popconfirm vtsTitle="Sure to cancel?" (vtsOnConfirm)="cancelEdit(data.id)">
                Cancel
              </a>
            </td>
          </ng-template>
        </tr>
      </tbody>
    </vts-table>
  `,
  styles: [
    `
      .save {
        margin-right: 8px;
      }
    `
  ]
})
export class VtsDemoTableEditRowComponent implements OnInit {
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      });
    }
    this.listOfData = data;
    this.updateEditCache();
  }
}
