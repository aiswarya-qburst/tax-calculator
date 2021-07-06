interface Option {
    value: string;
    label: string;
}

export interface Field {
    name?: string;
    label: string;
    type: string;
    options?: Option[];
    required?: boolean;
    disabled?: boolean;
    value?: string;
    handleFieldValueChange?: (e: React.SyntheticEvent) => void;
}

export interface User {
    id: number;
    name: string;
    salary: number;
}

export interface Slab {
    start: number;
    end?: number;
    rate: number;
}

export interface TotalTax {
    totalIncome?: number;
    totalDeduction?: number;
    netTaxIncome: number;
    annual: number;
}

export interface Data {
    [key: string]: Field[];
}

export interface Amount {
    [key: string]: number;
}