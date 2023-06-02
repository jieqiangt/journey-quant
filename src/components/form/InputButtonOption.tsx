import { InputButtonOptionProps } from "@/models/form.model";

const InputCheckboxOption: React.FC<InputButtonOptionProps> = (props) => {
  const {
    type,
    name,
    value,
    onChange,
    optionBoxClass,
    btnClass,
    labelClass,
    label,
  } = props;

  return (
    <div className={optionBoxClass}>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className={btnClass}>&nbsp;</span>
      <label htmlFor={name} className={labelClass}>
        {label}
      </label>
    </div>
  );
};

export default InputCheckboxOption;
