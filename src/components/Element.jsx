import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  element: (props) => ({
    ...props,
  }),
});

const Element = ({ type, style, attrs, className, children, ...props }) => {
  const Tag = type || "div";
  const classes = useStyles(props);
  return (
    <Tag className={`${classes.element} ${className}`} style={style} {...attrs}>
      {children}
    </Tag>
  );
};

export default Element;
