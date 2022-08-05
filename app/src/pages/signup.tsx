import { Link, useNavigate } from "@solidjs/router";
import { z } from "zod";
import { trpc } from "../utils/trpc";
import { LOCAL_STORAGE_ACCESS_KEY } from "../env";
import { createZodForm } from "../utils/form";

const register = trpc.user.register.mutate;

export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

export default function Signup() {
  const navigate = useNavigate();

  const { form, isValid, errors } = createZodForm(signupSchema, {
    async onSubmit(e) {
      e.preventDefault();
      const res = await register(e.data);
      if (res.access_token && res.user) {
        localStorage.setItem(LOCAL_STORAGE_ACCESS_KEY, res.access_token);
        navigate("/");
      }
    },
  });
  return (
    <>
      <h1>Signup</h1>
      <form
        use:form={form}
        class="flex flex-col p-20 mx-auto max-w-md bg-black rounded-md"
      >
        <div class="mb-4 w-full">
          <label for="email" class="text-white">
            Email
          </label>
          <input
            name="email"
            type="email"
            id="email"
            class="w-full"
            aria-invalid={Boolean(errors.email())}
          />
        </div>
        <div class="mb-4 w-full">
          <label for="password" class="text-white">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            class="w-full"
            aria-invalid={Boolean(errors.password())}
          />
        </div>
        <div class="mb-4 w-full">
          <label for="confirm_password" class="text-white">
            Confirm Password
          </label>
          <input
            name="confirm_password"
            type="password"
            id="confirm_password"
            class="w-full"
            aria-invalid={Boolean(errors.confirm_password())}
          />
        </div>
        <button
          type="submit"
          class="self-end mt-4 text-white"
          disabled={!isValid}
        >
          Signup
        </button>
        <p class="text-white">
          Already have an account?{" "}
          <Link href="/login">
            <a class="text-yellow-500">Login</a>
          </Link>
        </p>
      </form>
    </>
  );
}
