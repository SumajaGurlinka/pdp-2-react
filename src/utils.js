import { join, map } from "lodash";

const getText = (data) => {
  let text = "";
  try {
    const parsed = JSON.parse(data);
    map(parsed.content, (item) => {
      const texts = map(item.content, "text");
      text = `${text} ${join(texts, " ")} `;
    });
  } catch (err) {
    console.log(err);
    text = data;
  }
  return text;
};

export { getText };
