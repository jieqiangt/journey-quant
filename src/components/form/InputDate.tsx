import { ComponentBaseProps } from "@/models/base.model";
import { convertDatetoStr, addYears } from "@/utils/dateUtils";
import { LegacyRef } from "react";

interface InputDateProps extends ComponentBaseProps {
  label: string;
  name: string;
  onChange?: () => void;
  inputRef?: LegacyRef<HTMLInputElement>;
  defaultValue?: string;
}

const InputDate: React.FC<InputDateProps> = (props) => {
  const { classes, baseClass, label, name, inputRef, defaultValue } = props;

  const today = new Date();

  const todayStr = convertDatetoStr(today);
  const minDateStr = convertDatetoStr(addYears(today, -1));
  const maxDateStr = convertDatetoStr(addYears(today, 1));

  return (
    <div className={classes[`${baseClass}--${name}`]}>
      <label className={classes[`${baseClass}--${name}--label`]} htmlFor={name}>
        {label}
      </label>
      <input
        className={classes[`${baseClass}--${name}--input`]}
        type="date"
        id={name}
        name={name}
        defaultValue={defaultValue ? defaultValue : todayStr}
        min={minDateStr}
        max={maxDateStr}
        ref={inputRef}
      ></input>
    </div>
  );
};

export default InputDate;
