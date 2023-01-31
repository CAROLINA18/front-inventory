import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmComponent } from './components/confirm/confirm.component';



@NgModule({
  declarations: [
    SidenavComponent,
    ConfirmComponent
  ],
  exports:[
    SidenavComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule
  ]
})
export class SharedModule { }
