import { map } from "lodash";
import Element from "./Element";

const CardTexts = ({ title, subTitles }) => {
  return (
    <>
      {title && (
        <Element
          type="p"
          textAlign="center"
          fontWeight="bold"
          fontSize="16px"
          marginBottom="8px"
        >
          {title}
        </Element>
      )}
      {map(subTitles, (subTitle, idx) => (
        <Element
          type="p"
          textAlign="center"
          marginBottom={idx === subTitles.length - 1 ? "10px" : '2px'}
        >
          {subTitle}
        </Element>
      ))}
    </>
  );
};

export default CardTexts;
