import InputButtonOption from "./InputButtonOption";
import { InputButtonOptionProps } from "@/models/form.model";
import { ComponentBaseProps } from "@/models/base.model";

interface InputButtonProps extends ComponentBaseProps {
  type: "radio" | "checkbox";
  labelClass: string;
  optionBoxClass: string;
  fieldSetClass: string;
  btnClass: string;
  legend: string;
  legendClass: string;
  inputOptions: InputButtonOptionProps[];
}

const InputButton: React.FC<InputButtonProps> = (props) => {
  const {
    classes,
    type,
    labelClass,
    optionBoxClass,
    fieldSetClass,
    btnClass,
    legend,
    legendClass,
    inputOptions,
  } = props;

  const options = inputOptions.map((item: InputButtonOptionProps) => (
    <InputButtonOption
      classes={classes}
      key={item.name}
      name={item.name}
      type={type}
      value={item.value}
      label={item.label}
      onChange={item.onChange}
      labelClass={labelClass}
      optionBoxClass={optionBoxClass}
      btnClass={btnClass}
    />
  ));
  return (
    <fieldset className={fieldSetClass}>
      {legend ? <legend className={legendClass}>{legend}</legend> : ""}
      {options}
    </fieldset>
  );
};

export default InputButton;
