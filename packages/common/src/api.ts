import { APIResponse } from "./constants/APIConstansts";
import { Constants } from "./constantsManager";

export async function getAPIData(url: string, params: any) {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const apiUrl = `${url}?${queryParams}&websiteId=${Constants.APP_CONFIG.WEBSITE_ID}&webApiClientKey=${Constants.APP_CONFIG.WEB_API_CLIENT_KEY}`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Response == APIResponse.ERROR && data.Message) {
      throw new Error(data.Message);
    }
    return data.Data;
  } catch (error: any) {
    console.error("Error fetching dynamic data:", error.message);
    if (error.message) {
      throw new Error(error.message);
    }
  }
}
/*method to get API url with default parameters*/
export function getAPIUrl(url: string, params: any) {
  const queryParams = new URLSearchParams(params).toString();
  const apiUrl = `${url}?${queryParams}&websiteId=${Constants.APP_CONFIG.WEBSITE_ID}&webApiClientKey=${Constants.APP_CONFIG.WEB_API_CLIENT_KEY}`;

  return apiUrl;
}

export async function postAPIData(url: string, data: any) {
  try {
    // const queryParams = new URLSearchParams(params).toString();
    // const apiUrl = `${url}?${queryParams}&websiteId=${Constants.APP_CONFIG.WEBSITE_ID}&webApiClientKey=${Constants.APP_CONFIG.WEB_API_CLIENT_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.Response == APIResponse.ERROR && responseData.Message) {
      throw new Error(responseData.Message);
    }
    return responseData.Data;
  } catch (error: any) {
    console.error("Error posting data:", error.message);
    if (error.message) {
      throw new Error(error.message);
    }
  }
}

export async function postUploadAPIData(url: string, data: any) {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: data,
    });
    const responseData = await response.json();
    if (responseData.Response == APIResponse.ERROR && responseData.Message) {
      throw new Error(responseData.Message);
    }
    return responseData.Data;
  } catch (error: any) {
    console.error("Error posting data:", error.message);
    if (error.message) {
      throw new Error(error.message);
    }
  }
}
