import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpRoutingModule } from './sp-routing.module';
import { GridModule } from '@coreui/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GridModule,
    FormsModule,
    SpRoutingModule
  ]
})
export class SpModule { }
