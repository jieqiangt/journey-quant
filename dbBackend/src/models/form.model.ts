import { LegacyRef } from "react";
import { ComponentBaseProps, ResponseInterface, Row } from "./base.model";
import { AllDBInterface } from "./db.model";
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
}

export interface InputSelectOptionInterface {
    name: string;
    value: string | number | boolean;
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

export interface RecurExpenseFormProps extends InsertFormProps {
    categoriesSelection: Row[];
    paymentsSelection: Row[];
    recurPeriodsSelection: InputSelectOptionInterface[];
}

export interface CreatePaymentFormProps extends InsertFormProps {
    chargingAccountsSelection: Row[];
}

export interface ExpenseFormProps extends InsertFormProps {
    categoriesSelection: Row[];
    paymentsSelection: Row[];
}







