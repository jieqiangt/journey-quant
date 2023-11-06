import { InputTextProps } from "@/models/form.model";

const InputText: React.FC<InputTextProps> = (props) => {
  const {
    baseClass,
    classes,
    type,
    name,
    placeholder,
    label,
    valid,
    invalidText,
    inputRef,
    value,
    defaultValue,
    onChange,
  } = props;

  return (
    <div className={classes[`${baseClass}--${name}`]}>
      <input
        type={type}
        name={name}
        value={value}
        id={name}
        className={classes[`${baseClass}--${name}--input`]}
        onChange={onChange}
        placeholder={placeholder}
        ref={inputRef}
        defaultValue={defaultValue}
      />
      <label htmlFor={name} className={classes[`${baseClass}--${name}--label`]}>
        {label}
      </label>
      {!valid ? <span>{invalidText}</span> : ""}
    </div>
  );
};

export default InputText;
