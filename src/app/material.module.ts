import {  NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
 import { MatTableModule } from '@angular/material/table';
 import { MatTabsModule } from '@angular/material/tabs';
 import { MatCardModule } from '@angular/material/card';
 import { MatSelectModule } from '@angular/material/select';
 import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
 import { MatDialogModule } from '@angular/material/dialog';
 import { MatSortModule } from '@angular/material/sort';
 import { MatPaginatorModule } from '@angular/material/paginator';
 import { MatSnackBarModule } from '@angular/material/snack-bar';


const material = [
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTableModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule,
];

@NgModule({
  imports: [material],
  exports: [material] ,
})
export class MaterialModule {}
