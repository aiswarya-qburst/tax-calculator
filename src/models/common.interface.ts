interface Option {
    value: string;
    label: string;
}

export interface Field {
    name?: string;
    label: string;
    type: string;
    options?: Array<Option>;
    required?: boolean;
}