import { LegacyRef } from "react";
import { ComponentBaseProps, ResponseInterface, Row } from "./base.model";
import { AllDBInterface } from "./db.model";



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
    value: string;
}

export interface InputSelectOptionProps
    extends ComponentBaseProps,
    InputSelectOptionInterface {
}

export interface InputButtonOptionProps extends ComponentBaseProps {
    type: string;
    name: string;
    value: string;
    onChange: () => void;
    optionBoxClass: string;
    btnClass: string;
    labelClass: string;
    label: string;
}

export interface FormProps extends ComponentBaseProps {
    insertRecord(record: AllDBInterface): Promise<ResponseInterface>;
    categoriesSelection: Row[];
    paymentsSelection: Row[];
    recurPeriodsSelection: InputSelectOptionInterface[];
}






