import { InputButtonOptionProps } from "@/models/form.model";

const InputCheckboxOption: React.FC<InputButtonOptionProps> = (props) => {
  const { classes, baseClass, type, name, value, onChange, label } = props;

  return (
    <div className={classes[`${baseClass}--${name}--box`]}>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      <span className={classes[`${baseClass}--${name}--btn`]}>&nbsp;</span>
      <label htmlFor={name} className={classes[`${baseClass}--${name}--label`]}>
        {label}
      </label>
    </div>
  );
};

export default InputCheckboxOption;
