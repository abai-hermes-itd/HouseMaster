export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-900">
          HouseMaster
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Управление объектами недвижимости
        </p>

        <button className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition">
          Войти
        </button>
      </div>
    </main>
  );
}