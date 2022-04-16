type HeaderProps = {
  authenticated?: boolean;
};

export function Header({ authenticated }: HeaderProps) {
  return (
    <header class="flex justify-between p-4 backdrop-hue-rotate-180 border-slate-900/10 backdrop-filter dark:border-slate-300/10">
      <h1 class="text-4xl font-bold text-yellow-400 font-title">Shorts</h1>
      <div>
        {authenticated ? <a href="/logout">Logout</a> : (
          <>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </>
        )}
      </div>
    </header>
  );
}
