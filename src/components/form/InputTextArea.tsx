import { InputTextProps } from "@/models/form.model";

interface InputTextAreaProps extends InputTextProps {
  rows: number;
}

const InputTextArea: React.FC<InputTextAreaProps> = (props) => {
  const {
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
    inputRef,
    rows,
  } = props;

  return (
    <div className={inputGroupClass}>
      <textarea
        name={inputName}
        id={inputName}
        value={value}
        onChange={onChange}
        className={inputClass}
        placeholder={inputPlaceholder}
        rows={rows}
        ref={inputRef}
      />
      <label htmlFor={inputName} className={labelClass}>
        {label}
      </label>
      {!valid ? <span>{invalidText}</span> : ""}
    </div>
  );
};

export default InputTextArea;
