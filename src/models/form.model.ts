import { LegacyRef } from "react";
import { ColumnObject, ComponentBaseProps, ResponseInterface, Row } from "./base.model";
import { AllDBInterface, ExpenseInterface } from "./db.model";
import { ChangeEvent } from "react";

export interface InputTextProps extends ComponentBaseProps {
    name: string;
    placeholder: string;
    label: string;
    valid: boolean;
    invalidText: string;
    onChange?: () => void;
    value?: string;
    inputRef?: LegacyRef<HTMLInputElement>
    type?: "text" | "email";
    defaultValue?: string;
}

export interface RadioOptionInterface {
    name: string;
    value: string | number | boolean;
}

export interface InputSelectOptionInterface {
    name: string;
    value: string | number;
    defaultOption?: string | number;
}

export interface InputSelectOptionProps
    extends ComponentBaseProps,
    InputSelectOptionInterface {
}

export interface InputButtonOptionInterface {
    type: "radio" | "checkbox";
    name: string;
    fieldSetName: string;
    value: string | number | boolean;
    label: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface InputButtonOptionProps extends ComponentBaseProps,
    InputButtonOptionInterface {
}

export interface InsertFormProps extends ComponentBaseProps {
    insertRecord(record: AllDBInterface): Promise<ResponseInterface>;
}

export interface UpdateFormProps extends ComponentBaseProps {
    updateRecord(record: AllDBInterface): Promise<ResponseInterface>;
    currentRecord: ColumnObject;
    closeModal: () => void;
}

export interface RecurExpenseFormProps extends InsertFormProps {
    categoriesSelection: Row[];
    recurPeriodsSelection: InputSelectOptionInterface[];
}

export interface ExpenseFormProps extends InsertFormProps {
    categoriesSelection: Row[];
    updateFtTables: (expense: ExpenseInterface) => void;
}

export interface ExpenseUpdateFormProps extends UpdateFormProps {
    categoriesSelection: Row[];
    updateFtTables: (expense: ExpenseInterface) => void;
}






