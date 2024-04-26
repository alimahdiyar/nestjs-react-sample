import { Link } from "react-router-dom";
import Button from "../../../components/atoms/Button/Button";
import InputField from "../../../components/atoms/InputField/InputField";
import AuthCard from "../../../components/molecules/AuthCard/AuthCard";
import useForm from "../../../hooks/useAuth";

const RegisterPage: React.FunctionComponent = () => {
  document.title = "Register";

  const { handleRegister, error } = useForm();

  return (
    <section className="mx-auto max-w-[42.5rem] h-[67.5rem] fixed top-0 bottom-0 left-0 right-0 pt-16">
      <AuthCard>
        {error && (
          <p className="text-lg text-color-secondary font-medium bg-error rounded-full py-2 px-4 w-4/5 mx-auto">
            {error}
          </p>
        )}
        <h1 className="pt-8 text-4xl pb-1">Register</h1>
        <h3 className="text-lg text-color-dark-gray font-medium pb-4">
          Welcome! Create an account to continue
        </h3>
        <form className="pl-12 pr-12" action="POST" onSubmit={handleRegister}>
          <InputField
            id="username"
            type="text"
            name="username"
            placeholder="Your Name"
            maxLength={50}
            className="mt-4"
          />
          <InputField
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            maxLength={50}
            className="mt-4"
          />
          <InputField
            id="password"
            type="password"
            name="password"
            placeholder="Password"
            maxLength={50}
            className="mt-4"
          />
          <InputField
            id="passwordConf"
            type="password"
            name="passwordConf"
            placeholder="Confirm password"
            maxLength={50}
            className="mt-4"
          />
          <Button type="submit" className="mt-8 h-12 w-full">
            Register
          </Button>
        </form>
        <p className="text-base text-color-dark-gray font-medium pt-8 pb-4">
          Already have an account?{" "}
          <Link className="text-error no-underline font-semibold" to="/login">
            Login
          </Link>
        </p>
      </AuthCard>
      <p className="text-center pt-[10vh] text-base text-color-dark-gray">
        ⓒ 2023 all rights preserved
      </p>
    </section>
  );
};

export default RegisterPage;
