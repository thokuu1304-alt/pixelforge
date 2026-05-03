import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useUser } from "../contexts/UserContext";

export function Register() {
  const navigate = useNavigate();
  const { register, user } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", agree: false });

  // Already logged in → go to dashboard
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      register(form.name, form.email);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="flex min-h-screen">
        {/* Left panel */}
        <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-900 flex-col justify-between p-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
                <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none">
                  <rect x="3" y="3" width="8" height="8" rx="1.5" fill="white"/>
                  <rect x="14" y="3" width="8" height="8" rx="1.5" fill="white"/>
                  <rect x="25" y="3" width="4" height="8" rx="1.5" fill="white" opacity="0.4"/>
                  <rect x="3" y="14" width="8" height="8" rx="1.5" fill="white"/>
                  <rect x="14" y="14" width="8" height="8" rx="1.5" fill="white" opacity="0.4"/>
                  <rect x="3" y="25" width="8" height="4" rx="1.5" fill="white"/>
                  <rect x="14" y="25" width="8" height="4" rx="1.5" fill="white" opacity="0.4"/>
                </svg>
              </div>
              <span className="text-lg font-semibold text-white">PixelForge</span>
            </Link>
          </div>

          <div>
            <blockquote className="mb-8">
              <p className="text-xl text-white leading-relaxed">
                «За 3 месяца я прошла курс по UI/UX и получила оффер в дизайн-студию. PixelForge — это реально работающие знания.»
              </p>
              <footer className="mt-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1770135005655-7b848430ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=80"
                    alt="Мария"
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">Мария Волкова</p>
                    <p className="text-xs text-zinc-400">UI/UX дизайнер, Яндекс</p>
                  </div>
                </div>
              </footer>
            </blockquote>

            <div className="grid grid-cols-3 gap-6 border-t border-zinc-800 pt-8">
              {[
                { value: "180K+", label: "студентов" },
                { value: "200+", label: "курсов" },
                { value: "4.8★", label: "рейтинг" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-zinc-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel - form */}
        <div className="flex w-full items-center justify-center px-4 py-12 lg:w-1/2 lg:px-12">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
                Создать аккаунт
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                Уже есть аккаунт?{" "}
                <button className="text-indigo-600 hover:underline">
                  Войти
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  Имя и фамилия
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Иван Иванов"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ivan@example.com"
                  className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-700">
                  Пароль
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Минимум 8 символов"
                    className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 pr-11 text-sm outline-none placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  id="agree"
                  type="checkbox"
                  required
                  checked={form.agree}
                  onChange={(e) => setForm({ ...form, agree: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-zinc-300 accent-indigo-600"
                />
                <label htmlFor="agree" className="text-sm text-zinc-500">
                  Я согласен с{" "}
                  <button type="button" className="text-indigo-600 hover:underline">
                    условиями использования
                  </button>{" "}
                  и{" "}
                  <button type="button" className="text-indigo-600 hover:underline">
                    политикой конфиденциальности
                  </button>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60 transition-colors mt-2"
              >
                {loading ? "Создаём аккаунт..." : "Зарегистрироваться"}
              </button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-100" />
                </div>
                <div className="relative flex justify-center text-xs text-zinc-400 bg-zinc-50 px-2 w-fit mx-auto">
                  или
                </div>
              </div>

              <button
                type="button"
                className="w-full rounded-lg border border-zinc-200 bg-white py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Войти через Google
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}