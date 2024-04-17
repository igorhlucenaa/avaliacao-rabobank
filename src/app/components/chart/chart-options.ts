export interface DataPoint {
  currency: string;
  x: number;
  y: number;
}

export const chartOptions = {
  theme: 'light2',
  title: {
    text: 'Monitoramento de valor BTC & ETH'
  },
  data: [
    {
      type: 'line',
      name: 'Bitcoin',
      showInLegend: true,
      dataPoints: [] as DataPoint[]
    },
    {
      type: 'line',
      name: 'Ethereum',
      showInLegend: true,
      dataPoints: [] as DataPoint[]
    }
  ]
};

