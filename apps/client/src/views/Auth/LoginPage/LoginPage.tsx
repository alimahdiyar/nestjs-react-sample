import { Link } from "react-router-dom";
import Button from "components/atoms/Button/Button";
import InputField from "components/atoms/InputField/InputField";
import AuthCard from "components/molecules/AuthCard/AuthCard";
import useForm from "hooks/useAuth";

const LoginPage: React.FunctionComponent = () => {
  document.title = "Login";

  const { handleLogin, error } = useForm();

  return (
    <section className="mx-auto max-w-[42.5rem] h-[67.5rem] fixed top-0 bottom-0 left-0 right-0 pt-16">
      <AuthCard>
        {error && (
          <p className="text-lg text-color-secondary font-medium bg-error rounded-full py-2 px-4 w-4/5 mx-auto">
            {error}
          </p>
        )}
        <h1 className="pt-8 text-4xl pb-1">Login</h1>
        <h3 className="text-lg text-color-dark-gray font-medium pb-4">
          Welcome back! login to continue
        </h3>
        <form className="pl-12 pr-12" action="POST" onSubmit={handleLogin}>
          <InputField
            data-testid="auth-email-input"
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            maxLength={50}
            className="mt-4"
          />
          <InputField
            data-testid="auth-password-input"
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            maxLength={50}
            className="mt-4"
          />
          <Button
            data-testid="login-button"
            type="submit"
            className="mt-8 h-12 w-full"
          >
            Login
          </Button>
        </form>
        <p className="text-base text-color-dark-gray font-medium pt-8 pb-4">
          Not have an account yet?{" "}
          <Link
            className="text-error no-underline font-semibold"
            to="/register"
          >
            Register
          </Link>
        </p>
      </AuthCard>
      <p className="text-center pt-[10vh] text-base text-color-dark-gray">
        ⓒ 2023 all rights preserved
      </p>
    </section>
  );
};

export default LoginPage;
