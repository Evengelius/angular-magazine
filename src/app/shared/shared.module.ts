import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { NgxAnimationsModule } from 'ngx-animations';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Components | Widgets
    HeaderComponent,
    FooterComponent,
    // MD Bootstrap Pro
    MDBBootstrapModulesPro,
    // Ngx Modules
    NgxAnimationsModule,
    NgxPaginationModule
  ],
})
export class SharedModule { }
