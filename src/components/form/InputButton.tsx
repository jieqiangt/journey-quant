import InputButtonOption from "./InputButtonOption";
import { InputButtonOptionProps } from "@/models/form.model";
import { ComponentBaseProps } from "@/models/base.model";

interface InputButtonProps extends ComponentBaseProps {
  type: "radio" | "checkbox";
  legend: string;
  inputOptions: InputButtonOptionProps[];
}

const InputButton: React.FC<InputButtonProps> = (props) => {
  const { classes, baseClass, type, legend, inputOptions } = props;

  const options = inputOptions.map((item: InputButtonOptionProps) => (
    <InputButtonOption
      classes={classes}
      baseClass={baseClass}
      key={item.name}
      fieldSetName={item.fieldSetName}
      name={item.name}
      type={type}
      value={item.value}
      label={item.label}
      onChange={item.onChange}
    />
  ));
  return (
    <fieldset className={classes[`${baseClass}--field-set`]}>
      {legend ? (
        <legend className={classes[`${baseClass}--legend`]}>{legend}</legend>
      ) : (
        ""
      )}
      {options}
    </fieldset>
  );
};

export default InputButton;
