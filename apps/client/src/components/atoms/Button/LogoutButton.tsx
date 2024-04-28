import Button, { ButtonProps } from "./Button";
import { apiUrl } from "constants/index";

const LogoutButton = (props: Partial<ButtonProps>) => {
  async function doLogout() {
    await fetch(`${apiUrl}/auth/signout/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    window.location.reload();
  }

  return (
    <Button {...props} onClick={doLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
