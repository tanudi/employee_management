import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "../employee/employee.model";

@Pipe({
    name: 'departmentPipe'
})
export class DepartmentPipe implements PipeTransform {
    transform(value: Employee[], args: string | null) {
        if(args && args !== 'ALL') {
            return value.filter(emp => emp.departmentName === args);
        }
        return value;
    }

}


@Pipe({
    name: 'statusPipe'
})
export class StatusPipe implements PipeTransform {
    transform(value: Employee[], status: 'ACTIVE' | 'INACTIVE' | 'ALL') {
        if(status && status !== 'ALL') {
            return value.filter(e => e.status === status);
        }
        return value;
    }
    
}

@Pipe({
    name: 'sortPipe'
})
export class SortPipe implements PipeTransform {
    transform<T>(value: T[], columnName?: keyof T): T[] {
        if(!value) {
            return value;
        }
        const sorted = [...value];
        sorted.sort((a,b) => {
            const aVal = columnName ? a[columnName] : a;
            const bVal = columnName ? b[columnName] : b;
            if(aVal < bVal) {
                return -1;
            }
            if(aVal > bVal) {
                return 1;
            }
            return 0;
        })

        return sorted;
    }
    
}