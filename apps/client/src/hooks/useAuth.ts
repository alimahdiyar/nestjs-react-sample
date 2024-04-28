import { useState } from "react";
import { apiUrl } from "constants/index";

export default () => {
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget.email.value || !e.currentTarget.password.value)
      return setError("Please fill in all fields");

    handleSubmit(
      {
        email: `${e.currentTarget.email.value}`,
        password: `${e.currentTarget.password.value}`,
      },
      ""
    );
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!e.currentTarget.email.value || !e.currentTarget.password.value)
      return setError("Please fill in all fields");

    if (!e.currentTarget.username.value)
      return setError("Please fill in all fields");

    if (e.currentTarget.password.value !== e.currentTarget.passwordConf.value)
      return setError("Passwords do not match");
    handleSubmit(
      {
        email: `${e.currentTarget.email.value}`,
        password: `${e.currentTarget.password.value}`,
        name: `${e.currentTarget.username?.value}` || "",
      },
      "signup"
    );
  };

  const handleSubmit = (formData: any, type: string) => {
    const url = type === "signup" ? "signup" : "signin";

    // Fetch to server
    fetch(`${apiUrl}/auth/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(async (res) => {
      const data = await res.json();

      if (data.statusCode === 500) {
        // Message when server is down
        setError("Somehting went wrong, please try again later");
      } else if (
        (data.statusCode !== 200 && type === "") ||
        (data.statusCode !== 201 && type === "signup")
      ) {
        // Message when server is up but something else went wrong
        setError(data.message);
      } else {
        if (type === "signup") {
          setError(null);
          handleSubmit(formData, "");
        } else {
          // Message when everything is ok
          setError(null);
          window.location.href = "/";
        }
      }
    });
    return null;
  };

  return {
    error,
    setError,
    handleLogin,
    handleRegister,
  };
};
