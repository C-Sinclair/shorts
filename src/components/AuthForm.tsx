import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-vest";
import { For, Show } from "solid-js";
import { create, enforce, test } from "vest";

type AuthFormProps = {
  formType: "login" | "signup";
};

type AuthFields = {
  email?: string;
  password?: string;
  confirm_password?: string;
};

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      form: true;
    }
  }
}

/**
 * Flexible form which can handle either login or signup
 */
export function AuthForm({ formType }: AuthFormProps) {
  const { form, errors, isValid } = createForm<AuthFields>({
    extend: validator({ suite }),
    async onSubmit(values) {
      console.log("submitting");
      const { email, password, confirm_password } = values;
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
    },
  });

  const url = `/${formType === "login" ? "login" : "signup"}`;

  return (
    <form
      class="flex flex-col p-20 mx-auto max-w-md bg-black rounded-md"
      use:form
    >
      <div class="mb-4 w-full">
        <label for="email" class="text-white">
          Email
        </label>
        <input name="email" type="email" id="email" class="w-full" />
        <Show when={errors().email?.length > 0}>
          <For each={errors().email}>
            {(error: string) => <p class="text-red-700">{error}</p>}
          </For>
        </Show>
      </div>
      <div class="mb-4 w-full">
        <label for="password" class="text-white">
          Password
        </label>
        <Show when={errors().password?.length > 0}>
          <For each={errors().password}>
            {(error: string) => <p class="text-red-700">{error}</p>}
          </For>
        </Show>
        <input name="password" type="password" id="password" class="w-full" />
      </div>
      {formType === "signup" && (
        <div class="mb-4 w-full">
          <label for="confirm_password" class="text-white">
            Confirm Password
          </label>
          <input
            name="confirm_password"
            type="password"
            id="confirm_password"
            class="w-full"
          />
          <Show when={errors().confirm_password?.length > 0}>
            <For each={errors().confirm_password}>
              {(error: string) => <p class="text-red-700">{error}</p>}
            </For>
          </Show>
        </div>
      )}
      <button
        type="submit"
        class="self-end mt-4 text-white"
        disabled={!isValid()}
      >
        {formType === "login" ? "Login" : "Signup"}
      </button>
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
