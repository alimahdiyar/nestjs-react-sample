import { apiUrl } from "../../constants";

export default async (): Promise<boolean> => {
  // await fetch(`${api}/auth/signout/`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
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
