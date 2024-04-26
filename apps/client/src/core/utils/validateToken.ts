const api = import.meta.env.VITE_API_URL;

export default async (): Promise<boolean> => {
  // await fetch(`${api}/auth/signout/`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  return fetch(`${api}/auth/validate/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const data = await res.json();
    return data.statusCode === 200;
  });
};
