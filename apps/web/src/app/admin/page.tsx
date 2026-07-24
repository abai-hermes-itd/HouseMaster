import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function AdminPage() {
  const session = await auth();

  // Двойная страховка — middleware уже перехватит, но явная проверка не лишняя
  if (!session) redirect("/login");

  const { user } = session;

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl space-y-6">

        {/* Заголовок */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            HouseMaster Admin
          </h1>
          <span className="inline-block mt-2 rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-700">
            {user.realm} · {user.domain}
          </span>
        </div>

        {/* Профиль */}
        <div className="flex flex-col items-center gap-3">
          {user.image && (
            <Image
              src={user.image}
              alt={user.name ?? "Avatar"}
              width={80}
              height={80}
              className="rounded-full ring-2 ring-slate-200"
              priority
            />
          )}
          <div className="text-center">
            <p className="font-semibold text-slate-900">{user.name}</p>
            <p className="text-sm text-slate-500">{user.email}</p>
          </div>
        </div>

        {/* Данные сессии */}
        <dl className="divide-y divide-slate-100 rounded-xl border border-slate-200 text-sm">
          {[
            ["Домен", user.domain],
            ["Контур", user.realm],
            ["Статус", "Авторизован"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between px-4 py-2.5">
              <dt className="text-slate-500">{label}</dt>
              <dd className="font-medium text-slate-900">{value}</dd>
            </div>
          ))}
        </dl>

        {/* Выход */}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-xl border border-slate-200 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition"
          >
            Выйти
          </button>
        </form>
      </div>
    </main>
  );
}
