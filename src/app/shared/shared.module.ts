import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule, Type } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";

const shared: any[] | Type<any> | ModuleWithProviders<{}> = [
  CommonModule,
  FormsModule,
  MaterialModule,
  FlexLayoutModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: [shared],
  exports: [shared]
})
export class SharedModule {}
