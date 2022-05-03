import { create, enforce, test } from "vest";

type AuthFormProps = {
  formType: "login" | "signup";
};

type AuthFields = {
  email?: string;
  password?: string;
  confirm_password?: string;
};

/**
 * Flexible form which can handle either login or signup
 */
export function AuthForm({ formType }: AuthFormProps) {

  const url = `/${formType === "login" ? "login" : "signup"}`;

  return (
    <form
      className="flex flex-col p-20 mx-auto max-w-md bg-black rounded-md"
    >
      <div className="mb-4 w-full">
        <label htmlFor="email" className="text-white">
          Email
        </label>
        <input name="email" type="email" id="email" className="w-full" />
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="password" className="text-white">
          Password
        </label>
        <input name="password" type="password" id="password" className="w-full" />
      </div>
      {formType === "signup" && (
        <div className="mb-4 w-full">
          <label htmlFor="confirm_password" className="text-white">
            Confirm Password
          </label>
          <input
            name="confirm_password"
            type="password"
            id="confirm_password"
            className="w-full"
          />
        </div>
      )}
      <button
        type="submit"
        className="self-end mt-4 text-white"
      >
        {formType === "login" ? "Login" : "Signup"}
      </button>
      <p className="text-white">
        Already have an account?{" "}
        <a
          href={formType === "login" ? `/signup` : `/login`}
          className="text-yellow-500"
        >
          {formType === "login" ? "Signup" : "Login"}
        </a>
      </p>
    </form>
  );
}

const suite = create("form", (data: AuthFields) => {
  test("email", "Email is required", () => {
    enforce(data.email).isNotEmpty();
  });
  test("password", "Password is required", () => {
    enforce(data.password).isNotEmpty();
  });
  test("confirm_password", "Should match password", () => {
    enforce(data.confirm_password).equals(data.password);
  });
});
