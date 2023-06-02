import { InputSelectOptionProps } from "@/models/form.model";

const InputSelectOption: React.FC<InputSelectOptionProps> = (props) => {
  const { name, value } = props;

  return (
    <option key={name} value={value}>
      {name}
    </option>
  );
};

export default InputSelectOption;
