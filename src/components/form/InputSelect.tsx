import {
  InputSelectOptionInterface,
  InputSelectOptionProps,
} from "@/models/form.model";
import InputSelectOption from "./InputSelectOption";
import { ComponentBaseProps } from "@/models/base.model";
import { LegacyRef } from "react";

interface InputSelectProps extends ComponentBaseProps {
  name: string;
  inputOptions: InputSelectOptionInterface[];
  label: string;
  onChange?: () => void;
  inputRef?: LegacyRef<HTMLSelectElement>;
  defaultOption?: string;
}

const InputSelect: React.FC<InputSelectProps> = (props) => {
  const {
    classes,
    baseClass,
    name,
    onChange,
    inputRef,
    inputOptions,
    label,
    defaultOption,
  } = props;

  const options = inputOptions.map((option) => (
    <InputSelectOption
      baseClass={baseClass}
      classes={classes}
      key={option.name}
      name={option.name}
      value={option.value}
      defaultOption={defaultOption}
    />
  ));

  return (
    <div className={classes[`${baseClass}--${name}`]}>
      <label htmlFor={name} className={classes[`${baseClass}--${name}--label`]}>
        {label}
      </label>
      <select
        name={name}
        id={name}
        className={classes[`${baseClass}--${name}--select`]}
        onChange={onChange}
        ref={inputRef}
      >
        {options}
      </select>
    </div>
  );
};

export default InputSelect;
