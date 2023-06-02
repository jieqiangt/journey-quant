import Link from "next/link";

interface LinkButtonProps {
  btnClass: string;
  href: string;
  children: React.ReactNode;
  classes: { [cssClassName: string]: string };
  id?: string;
  activeNav?: string;
}

const LinkButton: React.FC<LinkButtonProps> = (props) => {
  const { btnClass, href, children, id, classes, activeNav } = props;

  const className =
    activeNav == id
      ? `${classes[btnClass]} ${classes["link--active"]}`
      : `${classes[btnClass]}`;

  return (
    <span className={className}>
      <Link href={href} id={id}>
        {children}
      </Link>
    </span>
  );
};

export default LinkButton;
