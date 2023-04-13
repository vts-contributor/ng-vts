import { VtsChartColorScaleType } from './scale-type.enum';

export interface VtsChartLegendOptions {
  colors: any;
  domain: any[];
  position: VtsChartLegendPosition;
  title: string | null;
  scaleType: VtsChartColorScaleType;
  columns?: number
}

export enum VtsChartLegendPosition {
  Right = 'right',
  Below = 'below'
}

export enum VtsChartLegendType {
  ScaleLegend = 'scaleLegend',
  Legend = 'legend'
}
