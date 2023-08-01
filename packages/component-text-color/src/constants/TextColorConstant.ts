import { generateURL } from "@chaitali-nagalkar-amla/common";
import { TextColorConstantType } from "../type/TextColorConstantType";

export let TextColorConstants: TextColorConstantType = {
  TEXT_COLOR_API_PATH: generateURL("api/1/Colors/GetTextColors"),
};
