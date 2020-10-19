import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule, routingComponent } from './admin-routing.module';
import { AdminNavigationComponent } from './home/navigation/admin-navigation.component';
import { SharedModule } from '../../shared/shared.module';
import { AdminComponent } from './home/admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    // Admin | Widget
    AdminNavigationComponent,
    // Routing
    routingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
  ],
})
export class AdminModule { }
