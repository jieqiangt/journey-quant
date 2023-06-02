import { ComponentBaseProps } from "@/models/base.model";

interface FormProps extends ComponentBaseProps {
  formClass: string;
  formFields: React.ReactNode;
  contentBeforeForm?: React.ReactNode;
  contentAfterForm?: React.ReactNode;
}

const Form: React.FC<FormProps> = (props) => {
  const {
    formClass,
    contentBeforeForm,
    contentAfterForm,
    classes,
    formFields,
  } = props;

  return (
    <form className={classes[formClass]}>
      {contentBeforeForm ? contentBeforeForm : ""}
      {formFields}
      {contentAfterForm ? contentAfterForm : ""}
    </form>
  );
};

export default Form;
