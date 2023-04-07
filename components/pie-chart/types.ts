import { DataItem } from '@ui-vts/ng-vts/core/chart'
import { DefaultArcObject } from 'd3-shape';

export type VtsPieChartItem = DataItem

export interface VtsPieChartData extends DefaultArcObject {
    data: VtsPieChartItem;
    index: number;
    pos: [number, number];
    value: number;
}