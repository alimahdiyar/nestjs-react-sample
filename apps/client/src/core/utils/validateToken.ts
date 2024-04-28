import { apiUrl } from "constants/index";

export default async (): Promise<boolean> => {
  return fetch(`${apiUrl}/auth/validate/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.statusCode === 200;
  });
};
