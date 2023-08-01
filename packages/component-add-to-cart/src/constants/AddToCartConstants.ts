import { generateURL } from "@chaitali-nagalkar-amla/common";

export const ADD_TO_CART_API = generateURL("api/1/AddToCart/AddToCart");

export enum OrderStatus {
  IN_PROGRESS = "InProgress",
}

export const PreviewAPI = "/Preview";
