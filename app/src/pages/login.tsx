import Link from "next/link";
import { z } from "zod";
import { useZorm } from "react-zorm";
import { trpc } from "~/utils/trpc";
import { useRouter } from "next/router";
import { LOCAL_STORAGE_ACCESS_KEY } from "~/env";
import { useUser } from "~/hooks";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(42),
});

export default function Login() {
  const router = useRouter();
  const { refetch } = useUser();

  const t = trpc.useMutation(["user.login"]);
  const zo = useZorm("login", loginSchema, {
    async onValidSubmit(e) {
      e.preventDefault();
      const res = await t.mutateAsync(e.data);
      if (res.access_token && res.user) {
        localStorage.setItem(LOCAL_STORAGE_ACCESS_KEY, res.access_token);
        refetch();
        router.push("/");
      }
    },
  });

  return (
    <>
      <h1>Login</h1>
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
        <button
          type="submit"
          className="self-end mt-4 text-white"
          disabled={t.isLoading || zo.validation?.success === true}
        >
          Login
        </button>
        <p className="text-white">
          Already have an account?{" "}
          <Link href="/signup">
            <a className="text-yellow-500">Sign up</a>
          </Link>
        </p>
      </form>
    </>
  );
}
