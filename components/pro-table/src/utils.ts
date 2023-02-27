import { VtsSafeAny } from '@ui-vts/ng-vts/core/types';
import { VtsProTableData } from './../../protable/src/protable.types';
export function renderProTable(proTableData: VtsProTableData) {
    let output: string = ``;
    proTableData.forEach((dataItem: VtsSafeAny) => {
        if (dataItem) {
            output += ``;
        } else {
            output += ``;
        }
    });
    return output;
}