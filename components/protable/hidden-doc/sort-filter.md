---
order: 5
title:
  en-US: Filter and sorter
  zh-CN: 筛选和排序
---

## zh-CN

筛选：对某一列数据进行筛选，通过指定 `[vtsFilters]` 属性来指定筛选菜单，`[vtsFilterFn]` 指定筛选函数，`[vtsFilterMultiple]` 用于指定多选和单选，通过设置 `[vtsFilters]` 中的 `{ byDefault: true }` 属性来默认启用一个筛选器。

排序：对某一列数据进行排序，通过指定 `[vtsSortOrder]` 来指定默认排序顺序，`[vtsSortFn]` 指定排序函数 `[vtsSortDirections]` 改变每列可用的排序方式。

## en-US

Filter: Use `[vtsFilters]` to define options of the filter menu, `[vtsFilterFn]` to determine filtered result, and `[vtsFilterMultiple]` to indicate whether it's multiple or single selection, you can enable a filter by default by setting a `[vtsFilters]` object's property: `{ byDefault: true }`.

Sort: Use `[vtsSortOrder]` to make a column sorted by default, use `[vtsSortFn]` to determine sort result, and `[vtsSortDirections]` to define available sort methods.

