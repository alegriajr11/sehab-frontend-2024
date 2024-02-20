import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './pages-routing.module';
import { ButtonModule, CardModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    LoginRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormsModule
  ]
})
export class PagesModule { }
