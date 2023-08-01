import { generateURL } from "@chaitali-nagalkar-amla/common";
import { TextColorConstantType } from "../type/TextColorConstantType";

export let TextColorConstants: TextColorConstantType = {
  TEXT_COLOR_API_PATH: generateURL("api/v1/Colors/GetTextColors"),
};
