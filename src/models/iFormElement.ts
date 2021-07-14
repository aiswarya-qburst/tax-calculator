export interface SubmitButton {
    title: string;
    handleSubmit?: (e: React.MouseEventHandler<React.SyntheticEvent>) => void;
}

export interface Button {
    title: string;
    handleClick?: (e: React.SyntheticEvent) => void;
}

interface Option {
    value: string;
    label: string;
}

export interface Field {
    name: string;
    label: string;
    type: string;
    options?: Option[];
    required?: boolean;
    disabled?: boolean;
    value?: string;
    handleFieldValueChange?: (e: React.SyntheticEvent) => void;
}

export interface Data {
    [key: string]: Field[];
}