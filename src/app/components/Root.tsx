import { Outlet, Link } from "react-router";
import { Header } from "./Header";
import { CartDrawer } from "./CartDrawer";
import { VkIcon, TgIcon } from "./icons/SocialIcons";
import { Youtube, Instagram } from "lucide-react";

export function Root() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>

      <CartDrawer />
      <footer className="border-t border-zinc-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-5">

            {/* Brand */}
            <div className="md:col-span-2">
              <Link to="/" className="mb-4 inline-flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
                  <svg viewBox="0 0 32 32" className="h-5 w-5" fill="none">
                    <rect x="3" y="3" width="8" height="8" rx="1.5" fill="white"/>
                    <rect x="14" y="3" width="8" height="8" rx="1.5" fill="white"/>
                    <rect x="3" y="14" width="8" height="8" rx="1.5" fill="white"/>
                    <rect x="14" y="14" width="8" height="8" rx="1.5" fill="white" opacity="0.5"/>
                    <rect x="3" y="25" width="8" height="4" rx="1.5" fill="white"/>
                  </svg>
                </div>
                <span className="text-base font-semibold text-zinc-900">PixelForge</span>
              </Link>
              <p className="mb-5 text-sm text-zinc-500 max-w-xs">
                Онлайн-платформа для развития цифровых навыков. Учитесь у практиков — стройте карьеру мечты.
              </p>
              <div className="flex gap-3">
                <a href="#" aria-label="ВКонтакте" className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                  <VkIcon className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Telegram" className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                  <TgIcon className="h-4 w-4" />
                </a>
                <a href="#" aria-label="YouTube" className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                  <Youtube className="h-4 w-4" />
                </a>
                <a href="#" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:border-indigo-300 hover:text-indigo-600 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Курсы */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Курсы</h3>
              <ul className="space-y-2.5">
                {[
                  { label: "Веб-разработка", to: "/courses" },
                  { label: "Дизайн", to: "/courses" },
                  { label: "Маркетинг", to: "/courses" },
                  { label: "Data Science", to: "/courses" },
                  { label: "Фотография", to: "/courses" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Компания */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Компания</h3>
              <ul className="space-y-2.5">
                {[
                  { label: "О нас", to: "/" },
                  { label: "Преподаватели", to: "/" },
                  { label: "Партнёры", to: "/" },
                  { label: "Блог", to: "/" },
                  { label: "Вакансии", to: "/" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Поддержка + Рассылка */}
            <div>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">Поддержка</h3>
              <ul className="space-y-2.5 mb-6">
                {[
                  { label: "FAQ", to: "/faq" },
                  { label: "Написать нам", to: "/faq" },
                  { label: "Условия использования", to: "/" },
                  { label: "Конфиденциальность", to: "/" },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">Рассылка</p>
                <p className="mb-3 text-xs text-zinc-500">Новые курсы и спецпредложения</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="flex-1 min-w-0 rounded-lg border border-zinc-200 px-3 py-2 text-xs outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition"
                  />
                  <button className="shrink-0 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700 transition-colors">
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-zinc-100 pt-6 sm:flex-row">
            <p className="text-xs text-zinc-400">
              © 2026 PixelForge. Все права защищены. ИНН 7728123456
            </p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-400">Принимаем к оплате:</span>
              <div className="flex gap-2">
                {["МИР", "Visa", "MC", "СБП"].map((card) => (
                  <span key={card} className="rounded border border-zinc-200 px-1.5 py-0.5 text-xs text-zinc-500">
                    {card}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}