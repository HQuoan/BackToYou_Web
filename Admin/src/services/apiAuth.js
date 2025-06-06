import { callAPI, HttpMethod } from "./apiClient";
import { ServiceRoutes } from "./ServiceRoutes";

export async function register(registerData) {
  const data = await callAPI({
    method: HttpMethod.POST,
    url: `${ServiceRoutes.auth}/auth/register`,
    data: registerData,
  });

  return data?.result;
}

export async function login(loginDto) {
  const data = await callAPI({
    method: HttpMethod.POST,
    url: `${ServiceRoutes.auth}/auth/login`,
    data: loginDto,
  });

  const token = data?.result?.token;

  if (token) {
    localStorage.setItem("access_token", token);
  }

  return data?.result?.user;
}

export async function logout() {
  await callAPI({
    method: HttpMethod.POST,
    url: `${ServiceRoutes.auth}/auth/logout`,
  });

  localStorage.removeItem("access_token");
}

export async function assignRole(formData) {
  const data = await callAPI({
    method: HttpMethod.POST,
    url: `${ServiceRoutes.auth}/auth/assign-role`,
    data: formData,
  });

  return data?.result?.user;
}

export async function changePassword(formData) {
  await callAPI({
    method: HttpMethod.POST,
    url: `${ServiceRoutes.auth}/auth/change-password`,
    data: formData,
  });
}

export async function forgotPassword(formData) {
  await callAPI({
    method: HttpMethod.POST,
    url: `${ServiceRoutes.auth}/auth/forgot-password`,
    data: formData,
  });
}

export async function resetPassword(formData) {
  await callAPI({
    method: HttpMethod.POST,
    url: `${ServiceRoutes.auth}/auth/reset-password`,
    data: formData,
  });
}
