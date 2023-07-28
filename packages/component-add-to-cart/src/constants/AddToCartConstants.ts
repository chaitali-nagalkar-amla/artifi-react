import { generateURL } from "@artifi/common";

export const ADD_TO_CART_API = generateURL("api/v1/AddToCart/AddToCart");

export enum OrderStatus {
  IN_PROGRESS = "InProgress",
}

export const PreviewAPI = "/Preview";
