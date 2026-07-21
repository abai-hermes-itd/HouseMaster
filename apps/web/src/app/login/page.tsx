export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-center">
          Вход в HouseMaster
        </h1>

        <p className="mt-3 text-center text-slate-600">
          Авторизация через Google Workspace
        </p>

        <button className="mt-8 w-full rounded-xl bg-blue-600 py-3 text-white hover:bg-blue-700 transition">
          Войти через Google
        </button>
      </div>
    </main>
  );
}