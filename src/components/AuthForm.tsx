import { createSignal } from "solid-js";

type AuthFormProps = {
  formType: "login" | "signup";
  error?: string;
};

/**
 * Flexible form with progressive enhancement to handle JS or no JS
 * With no JS it will just fallback to the normal HTML form behaviour
 */
export function AuthForm({ formType, ...props }: AuthFormProps) {
  const [error, setError] = createSignal(props.error);

  const url = `/${formType === "login" ? "login" : "signup"}`;

  const onSubmit = async (e) => {
    try {
      console.log("submitting");
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const email = formData.get("email");
      const password = formData.get("password");
      const confirm_password = formData.get("confirm_password");
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          confirm_password,
        }),
      });
      const data = await res.json();
      console.log({ data });

      if (data.error) {
        throw new Error(data.error);
      }
    } catch (e) {
      console.log("form submit error", e);
      setError(e.message);
    }
  };

  return (
    <form
      class="flex flex-col p-20 mx-auto max-w-md bg-black rounded-md"
      onSubmit={onSubmit}
    >
      <label for="email" class="text-white">
        Email
      </label>
      <input name="email" type="email" id="email" />
      <label for="password" class="text-white">
        Password
      </label>
      <input name="password" type="password" id="password" />
      {formType === "signup" && (
        <>
          <label for="confirm_password" class="text-white">
            Confirm Password
          </label>
          <input
            name="confirm_password"
            type="password"
            id="confirm_password"
          />
        </>
      )}
      <button type="submit" class="self-end mt-4 text-white">
        {formType === "login" ? "Login" : "Signup"}
      </button>
      {error() && <p class="font-bold text-red-900">{error()}</p>}
      <p class="text-white">
        Already have an account?{" "}
        <a
          href={formType === "login" ? `/signup` : `/login`}
          class="text-yellow-500"
        >
          {formType === "login" ? "Signup" : "Login"}
        </a>
      </p>
    </form>
  );
}
