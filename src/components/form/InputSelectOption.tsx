import { InputSelectOptionProps } from "@/models/form.model";

const InputSelectOption: React.FC<InputSelectOptionProps> = (props) => {
  const { name, value, defaultOption } = props;

  const optionOutput =
    defaultOption == name ? (
      <option key={name} value={value} selected>
        {name}
      </option>
    ) : (
      <option key={name} value={value}>
        {name}
      </option>
    );

  return optionOutput;
};

export default InputSelectOption;
