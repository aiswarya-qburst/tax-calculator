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

export interface StageTotal {
    range: string;
    rate: string;
    totalOfStage: string;
}

export interface TaxDescription {
    annual: number;
    resultOfEachStage: StageTotal[];
}

export interface TotalTax {
    totalIncome?: number;
    totalDeduction?: number;
    netTaxIncome: number;
    taxWithDescription: TaxDescription;
    cess: number;
    withCess: number;
}

export interface IncOrDed {
    income: number;
    deduction: number;
}

export interface Data {
    [key: string]: Field[];
}

export interface Amount {
    [key: string]: number;
}

export interface Initial {
    [key: string]: string;
}