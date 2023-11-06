import { ComponentBaseProps } from "@/models/base.model";

interface FormProps extends ComponentBaseProps {
  formFields: React.ReactNode;
  contentBeforeForm?: React.ReactNode;
  contentAfterForm?: React.ReactNode;
}

const Form: React.FC<FormProps> = (props) => {
  const {
    contentBeforeForm,
    contentAfterForm,
    baseClass,
    classes,
    formFields,
  } = props;

  return (
    <form className={classes[baseClass]}>
      {contentBeforeForm ? contentBeforeForm : ""}
      {formFields}
      {contentAfterForm ? contentAfterForm : ""}
    </form>
  );
};

export default Form;
