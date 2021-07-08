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

export interface Amount {
    [key: string]: number;
}

export interface Total {
    income: number;
    deduction: number;
}