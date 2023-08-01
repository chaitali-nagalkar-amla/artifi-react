import { generateURL } from "@chaitali-nagalkar-amla/common";
import { ClipartConstantType } from "../type/ClipartConstantType";

export let ClipartConstants: ClipartConstantType = {
  CLIPART_API: generateURL("api/v1/Cliparts/GetCliparts"),
  PAGE_SIZE: 25,
};
