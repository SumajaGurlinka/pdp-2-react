import { Spin } from "antd";
import Element from "./Element";

const Loader = () => {
  return (
    <Element
      width="100%"
      height="100%"
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="#00000033"
      zIndex={1}
    >
      <Spin spinning size="large"/>
    </Element>
  );
};

export default Loader;
