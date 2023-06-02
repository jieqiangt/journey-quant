interface IconProps {
  iconClass: string;
  iconName: string;
  classes: { [cssClassName: string]: string };
}

const Icon: React.FC<IconProps> = (props) => {
  const { iconClass, iconName, classes } = props;

  return (
    <svg className={classes[iconClass]}>
      <use href={`/icons/sprite.svg#${iconName}`}></use>
    </svg>
  );
};

export default Icon;
