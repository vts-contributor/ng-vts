import { range } from 'd3-array';
import {
  scaleBand,
  ScaleLinear,
  scaleLinear,
  ScaleOrdinal,
  scaleOrdinal,
  ScaleQuantile,
  scaleQuantile
} from 'd3-scale';

import { VtsChartColorPreset, colorSets, VtsChartColor } from './utils/color-sets';
import { StringOrNumberOrDate } from './models/chart-data.model';
import { VtsChartColorScaleType } from './types/scale-type.enum';
import { Gradient } from './types/gradient.interface';
import { VtsChartCustomColorArr, VtsChartCustomColorFunc, VtsChartCustomColors } from './types';

export class ColorHelper {
  scheme!: VtsChartColor
  domain: number[] | string[];
  customColors?: VtsChartCustomColors;
  scale: ScaleQuantile<number> | ScaleOrdinal<string, unknown> | ScaleLinear<number, number>;

  constructor(scheme: VtsChartColorPreset | VtsChartColor, overrideScaleType: VtsChartColorScaleType | null = null, domain: number[] | string[], customColors?: VtsChartCustomColors) {
    if (typeof scheme !== 'object') {
      const k = Object.keys(colorSets).find(k => {
        return k === scheme;
      })
      if (k)
        this.scheme = colorSets[k as VtsChartColorPreset]
      else
        this.scheme = { colors: [] }
    } else
      this.scheme = {
        ...scheme,
        scaleType: scheme.scaleType || VtsChartColorScaleType.Ordinal
      }
    if (overrideScaleType)
      this.scheme.scaleType = overrideScaleType
    this.domain = domain;
    this.customColors = customColors;
    this.scale = this.generateColorScheme();
  }

  private generateColorScheme(): typeof this.scale {
    switch (this.scheme.scaleType) {
      case VtsChartColorScaleType.Quantile:
        return scaleQuantile()
          .range(this.scheme.colors as any)
          .domain(this.domain as number[]);
      case VtsChartColorScaleType.Linear:
        const colors = [...this.scheme.colors];
        if (colors.length === 1) {
          colors.push(colors[0]);
        }
        const points = range(0, 1, 1.0 / colors.length);
        return scaleLinear()
          .range(colors as any)
          .domain(points);
      // Default using Ordinal Scaling
      default:
        return scaleOrdinal()
          .range(this.scheme.colors)
          .domain(this.domain as string[]);
    }
  }

  getColor(value: StringOrNumberOrDate): string {
    if (value === undefined || value === null) {
      throw new Error('Value can not be null');
    }
    if (this.scheme.scaleType === VtsChartColorScaleType.Linear) {
      const valueScale = scaleLinear()
        .domain(this.domain as number[])
        .range([0, 1]);

      //@ts-ignore
      return this.scale(valueScale(value));
    } else {
      if (typeof this.customColors === 'function') {
        const fn = this.customColors as VtsChartCustomColorFunc
        return fn(value);
      }

      const formattedValue = value.toString();
      let found: VtsChartCustomColorArr[0] | undefined
      if (this.customColors && this.customColors.length > 0) {
        found = this.customColors.find((item) => {
          return item.name.toLowerCase() === formattedValue.toLowerCase();
        });
      }

      if (found) {
        return found.value;
      } else {
        //@ts-ignore
        return this.scale(value)
      }
    }
  }

  getLinearGradientStops(value: number | string, start?: number | string): Gradient[] {
    if (start === undefined) {
      start = this.domain[0];
    }
    const valueScale = scaleLinear()
      .domain(this.domain as number[])
      .range([0, 1]);

    const colorValueScale = scaleBand().domain(this.scheme.colors).range([0, 1]);

    const endColor = this.getColor(value);

    // generate the stops
    const startVal = valueScale(start as number);
    const startColor = this.getColor(start);

    const endVal = valueScale(value as number);
    let i = 1;
    let currentVal = startVal;
    const stops: Gradient[] = [];

    stops.push({
      color: startColor,
      offset: startVal,
      originalOffset: startVal,
      opacity: 1
    });

    while (currentVal < endVal && i < this.scheme.colors.length) {
      const color = this.scheme.colors[i];
      const offset = colorValueScale(color) || 0;
      if (offset <= startVal) {
        i++;
        continue;
      }

      if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
        break;
      }

      stops.push({
        color,
        offset,
        opacity: 1
      });
      currentVal = offset;
      i++;
    }

    if (stops[stops.length - 1].offset < 100) {
      stops.push({
        color: endColor,
        offset: endVal,
        opacity: 1
      });
    }

    if (endVal === startVal) {
      stops[0].offset = 0;
      stops[1].offset = 100;
    } else {
      // normalize the offsets into percentages
      if (stops[stops.length - 1].offset !== 100) {
        for (const s of stops) {
          s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
        }
      }
    }

    return stops;
  }
}
