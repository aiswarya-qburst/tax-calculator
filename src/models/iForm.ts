export interface FForm {
    children: any; //TODO: ReactNode;
    initialValues: Record<string, unknown>;
    handleSubmit?: (values: Record<string, unknown>) => void;
}

export interface SerializedData {
    [key: string]: string;
}