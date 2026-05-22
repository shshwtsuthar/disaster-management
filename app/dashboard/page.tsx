import { redirect } from "next/navigation";
import { IndiaMapCard } from "@/components/IndiaMapCard";
import { AUTH_ROUTES } from "@/lib/auth/routes";
import { signOut } from "@/lib/auth/actions";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(AUTH_ROUTES.login);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, username, role, organization")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 px-6 py-10 font-sans dark:bg-black">
      <header className="mx-auto flex w-full max-w-3xl items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}.
          </p>
        </div>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
          >
            Sign out
          </button>
        </form>
      </header>

      <section className="mx-auto mt-8 w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Username
            </dt>
            <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
              {profile?.username ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Role
            </dt>
            <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
              {profile?.role ?? "—"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Organization
            </dt>
            <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
              {profile?.organization ?? "—"}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Email
            </dt>
            <dd className="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
              {user.email}
            </dd>
          </div>
        </dl>
      </section>

      <IndiaMapCard />
    </div>
  );
}
