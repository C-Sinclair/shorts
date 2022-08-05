import { Link, useNavigate } from "@solidjs/router";
import { z } from "zod";
import { trpc } from "~/utils/trpc";
import { LOCAL_STORAGE_ACCESS_KEY } from "~/env";
import { createZodForm } from "~/utils/form";

const login = trpc.user.login.mutate;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(42),
});

export default function Login() {
  const navigate = useNavigate();

  const { form, isSubmitting, errors, isValidating } = createZodForm(
    loginSchema,
    {
      async onSubmit(e) {
        e.preventDefault();
        const res = await login(e.data);
        if (res.access_token && res.user) {
          localStorage.setItem(LOCAL_STORAGE_ACCESS_KEY, res.access_token);
          if (res.user?.roles?.includes("admin")) {
            navigate("/admin");
          } else if (res.user) {
            navigate("/");
          }
        }
      },
    },
  );

  return (
    <>
      <h1>Login</h1>
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
        <button
          type="submit"
          class="self-end mt-4 text-white"
          disabled={isSubmitting || isValidating}
        >
          Login
        </button>
        <p class="text-white">
          Already have an account?{" "}
          <Link href="/signup">
            <a class="text-yellow-500">Sign up</a>
          </Link>
        </p>
      </form>
    </>
  );
}
