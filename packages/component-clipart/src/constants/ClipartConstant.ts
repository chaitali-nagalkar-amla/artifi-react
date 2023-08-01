import { generateURL } from "@chaitali-nagalkar-amla/common";
import { ClipartConstantType } from "../type/ClipartConstantType";
export const CLIPART_API = generateURL("api/1/Cliparts/GetCliparts");
export let ClipartConstants: ClipartConstantType = {
  PAGE_SIZE: 25,
};
