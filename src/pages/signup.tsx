import Link from "next/link";
import { z } from "zod";
import { useZorm } from "react-zorm";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/router";
import { LOCAL_STORAGE_ACCESS_KEY } from "~/env";

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
  const router = useRouter();
  const t = trpc.useMutation(["user.register"]);
  const zo = useZorm("signup", signupSchema, {
    async onValidSubmit(e) {
      e.preventDefault();
      const res = await t.mutateAsync(e.data);
      if (res.access_token && res.user) {
        localStorage.setItem(LOCAL_STORAGE_ACCESS_KEY, res.access_token);
        router.push("/");
      }
    },
  });
  return (
    <>
      <h1>Signup</h1>
      <form
        className="flex flex-col p-20 mx-auto max-w-md bg-black rounded-md"
        ref={zo.ref}
      >
        <div className="mb-4 w-full">
          <label htmlFor="email" className="text-white">
            Email
          </label>
          <input
            name={zo.fields.email()}
            type="email"
            id="email"
            className="w-full"
            aria-invalid={Boolean(zo.errors.email())}
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="password" className="text-white">
            Password
          </label>
          <input
            name={zo.fields.password()}
            type="password"
            id="password"
            className="w-full"
            aria-invalid={Boolean(zo.errors.password())}
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="confirm_password" className="text-white">
            Confirm Password
          </label>
          <input
            name={zo.fields.confirm_password()}
            type="password"
            id="confirm_password"
            className="w-full"
            aria-invalid={Boolean(zo.errors.confirm_password())}
          />
        </div>
        <button type="submit" className="self-end mt-4 text-white">
          Signup
        </button>
        <p className="text-white">
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-yellow-500">Login</a>
          </Link>
        </p>
      </form>
    </>
  );
}
