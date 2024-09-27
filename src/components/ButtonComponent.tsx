import Button, {
  ButtonColorType,
  ButtonShape,
  ButtonVariantType,
} from "antd/es/button";
import React from "react";

type ButtonProps = {
  label?: string;
  color?: ButtonColorType;
  shape?: ButtonShape;
  variant?: ButtonVariantType;
  className?: string;
  onClick?: () => void;
};

const ButtonComponent: React.FC<ButtonProps> = (props) => {
  return <Button {...props} className={props.className}>{props.label}</Button>;
};

export default ButtonComponent;
