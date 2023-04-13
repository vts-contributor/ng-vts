import { DataItem } from '@ui-vts/ng-vts/core/chart'
import { DefaultArcObject } from 'd3-shape';

export interface VtsPieChartItem extends DataItem {
    name: string
}

export interface VtsPieChartData extends DefaultArcObject {
    data: VtsPieChartItem;
    index: number;
    pos: [number, number];
    value: number;
}