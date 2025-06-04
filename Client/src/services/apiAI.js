import { callAPI, HttpMethod } from "./apiClient";
import { ServiceRoutes } from "./ServiceRoutes";

export async function aiSearch(formData) {
  const data = await callAPI({
    method: HttpMethod.POST,
    url: `${ServiceRoutes.post}/post-images/ai-search`,
    data: formData
  });

  return data
}
