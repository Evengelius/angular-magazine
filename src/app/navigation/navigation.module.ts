import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule, routingComponent } from './navigation-routing.module';
import { NavigationComponent } from './navigation.component';
import { SharedModule } from '../shared/shared.module';
import { PoliticComponent } from './home/widget/politic/politic.component';
import { SportComponent } from './home/widget/sport/sport.component';
import { HealthComponent } from './home/widget/health/health.component';
import { CarouselHomeComponent } from './home/widget/carousel/carousel-home.component';

@NgModule({
  declarations: [
    // Main | Routing - Header - Footer
    NavigationComponent,
    // Home | Widget
    CarouselHomeComponent,
    PoliticComponent,
    SportComponent,
    HealthComponent,
    // Routing
    routingComponent
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    SharedModule
  ],
})
export class NavigationModule { }
