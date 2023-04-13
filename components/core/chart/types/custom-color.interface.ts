import { StringOrNumberOrDate } from "../models"

export type VtsChartCustomColorFunc = (name: StringOrNumberOrDate) => string

export type VtsChartCustomColorArr = Array<{name: string, value: string}>

export type VtsChartCustomColors = VtsChartCustomColorFunc | VtsChartCustomColorArr