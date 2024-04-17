import { Component, OnDestroy } from '@angular/core';
import { WebsocketConnectionService } from 'src/app/services/websocket-connection.service';
import { DataPoint, chartOptions } from './chart-options';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnDestroy {
  showBitcoin = true;
  showEthereum = true;
  bitcoinDataPoints: DataPoint[] = [];
  ethereumDataPoints: DataPoint[] = [];
  xValue = 1;
  yValue = 10;
  chart: any;
  isLoading: boolean = true;
  chartOptions = chartOptions

  constructor(private webSocketConnection: WebsocketConnectionService) {}

  getChartInstance(chart: any) {
    this.chart = chart;
    this.updateData();
  }

  ngOnDestroy() {
    this.webSocketConnection.unsubscribe();
  }

  updateData() {
    const coins = [];
    if (this.showBitcoin) coins.push('bitcoin');
    if (this.showEthereum) coins.push('ethereum');

    this.webSocketConnection.getData(coins).subscribe(({ bitcoin, ethereum }) => {
      if (this.showBitcoin && bitcoin) {
        this.updateDataPoints(this.bitcoinDataPoints, bitcoin, 'bitcoin');
      }
      if (this.showEthereum && ethereum) {
        this.updateDataPoints(this.ethereumDataPoints, ethereum, 'ethereum');
      }
      this.xValue++;
      this.updateChart();
      this.isLoading = false
    });

  }

  updateDataPoints(dataPoints: DataPoint[], value: string, currency: string) {
    const price = parseFloat(value);
    dataPoints.push({ currency, x: this.xValue, y: price });
  }

  toggleBitcoin() {
    this.showBitcoin = !this.showBitcoin;
    this.updateData();
  }

  toggleEthereum() {
    this.showEthereum = !this.showEthereum;
    this.updateData();
  }

  updateChart() {
    this.chartOptions.data[0].dataPoints  = this.showBitcoin ? this.bitcoinDataPoints : [];
    this.chartOptions.data[1].dataPoints = this.showEthereum ? this.ethereumDataPoints : [];
    this.chart.render();
  }
}
