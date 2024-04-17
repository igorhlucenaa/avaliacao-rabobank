import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ChartComponent } from '../components/chart/chart.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    CanvasJSAngularChartsModule,
    HttpClientModule
  ],
  declarations: [HomePage, ChartComponent]
})
export class HomePageModule {}
