import { Fragment, LegacyRef } from "react";
import { InputSelectOptionProps } from "@/models/form.model";
import InputSelectOption from "./InputSelectOption";
import { ComponentBaseProps } from "@/models/base.model";

interface InputNumericProps extends ComponentBaseProps {
  inputGroupClass: string;
  inputName: string;
  value: string;
  inputClass: string;
  onChange: () => void;
  inputPlaceholder: string;
  labelClass: string;
  label: string;
  valid: boolean;
  invalidText: string;
  datalist: InputSelectOptionProps[];
  datalistId: string;
  optionClass: string;
  inputRef?: LegacyRef<HTMLInputElement>;
}

const InputNumeric: React.FC<InputNumericProps> = (props) => {
  const {
    classes,
    baseClass,
    inputGroupClass,
    inputName,
    value,
    inputClass,
    onChange,
    inputPlaceholder,
    labelClass,
    label,
    valid,
    invalidText,
    datalist,
    datalistId,
    inputRef,
    optionClass,
  } = props;

  return (
    <div className={inputGroupClass}>
      <Fragment>
        <input
          type="text"
          inputMode="numeric"
          pattern="\d*"
          name={inputName}
          id={inputName}
          value={value}
          onChange={onChange}
          className={inputClass}
          placeholder={inputPlaceholder}
          list={datalistId}
          ref={inputRef}
        />
        <label htmlFor={inputName} className={labelClass}>
          {label}
        </label>
        <datalist id={datalistId}>
          {datalist.map((item: InputSelectOptionProps) => (
            <InputSelectOption
              baseClass={baseClass}
              key={item.name}
              value={item.value}
              name={item.name}
              classes={classes}
              optionClass={optionClass}
            />
          ))}
        </datalist>
        {!valid ? <span>{invalidText}</span> : ""}
      </Fragment>
    </div>
  );
};

export default InputNumeric;
