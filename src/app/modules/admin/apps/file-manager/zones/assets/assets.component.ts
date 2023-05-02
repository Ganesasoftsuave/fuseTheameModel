/*
  Copyright 2019 Esri
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    OnDestroy,
    ChangeDetectorRef,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
export interface PeriodicElement {
    name: string;
    position: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { name: 'name', position: 1 },
    { name: 'name', position: 2 },
    { name: 'name', position: 3 },
    { name: 'name', position: 4 },
]
@Component({
    selector: 'tabular-asset',
    templateUrl: './assets.component.html',
    styleUrls: ['./assets.component.css'],
})
export class TabularAssetComponent implements OnInit {
    displayedColumns = ['position', 'name', 'action'];
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    // dataSource: any;
    // selection = new SelectionModel<PeriodicElement>(true, []);
    selection = new SelectionModel<any>(true, []);

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }

        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.position + 1
        }`;
    }
    ngOnInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
