import { ComponentBaseProps } from "@/models/base.model";
import { FormEvent } from "react";

interface OnClickButtonProps extends ComponentBaseProps {
  btnClass: string;
  onClick: (event: FormEvent) => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const OnClickButton: React.FC<OnClickButtonProps> = (props) => {
  const {
    btnClass,
    onClick,
    disabled = false,
    children,
    classes,
    baseClass,
  } = props;

  return (
    <button
      className={classes[`${baseClass}--${btnClass}`]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default OnClickButton;
