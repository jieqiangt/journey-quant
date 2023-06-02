import { Fragment } from "react";
import LinkButton from "../LinkButton";
import Icon from "../Icon";
import { ComponentBaseProps } from "@/models/base.model";

interface NavBarProps extends ComponentBaseProps {}

const NavBar: React.FC<NavBarProps> = (props) => {
  const { classes } = props;

  const navDetails = [
    {
      href: "/record",
      children: "Record",
    },
    {
      href: "/monitor",
      children: "Monitor",
    },
    {
      href: "/plan",
      children: "Plan",
    },
    {
      href: "/configure",
      children: "Configure",
    },
  ];

  const navLinks = navDetails.map((details) => (
    <LinkButton
      key={details.href}
      btnClass={"nav--link"}
      activeNav={"curPath"}
      id={details.href}
      href={details.href}
      classes={classes}
    >
      {details.children}
    </LinkButton>
  ));

  return (
    <Fragment>
      {/* <input
        type="checkbox"
        className={classes["nav--checkbox"]}
        id="nav--toggle"
      ></input>
      <label htmlFor="nav--toggle" className={classes["nav--btn"]}>
        <Icon
          iconClass={"nav--btn--close"}
          iconName="icon-cross"
          classes={classes}
        />
        <Icon
          iconClass="nav--btn--menu"
          iconName="icon-logo-words-circular"
          classes={classes}
        />
      </label> */}
      <nav className={classes["nav"]}>
        <div className={classes["nav--icon"]}> My Icon</div>
        <ul className={classes["nav--list"]}>{navLinks}</ul>
      </nav>
    </Fragment>
  );
};

export default NavBar;
