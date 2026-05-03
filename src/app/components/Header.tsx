import { Link, useLocation } from "react-router";
import { Search, ShoppingCart, User, Menu, X, ChevronRight, BookOpen, HelpCircle, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";

function PixelForgeLogo() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 shadow-sm">
      <svg viewBox="0 0 28 28" className="h-5 w-5" fill="none">
        <rect x="2" y="2" width="7" height="7" rx="1.5" fill="white"/>
        <rect x="11" y="2" width="7" height="7" rx="1.5" fill="white"/>
        <rect x="20" y="2" width="6" height="7" rx="1.5" fill="white" opacity="0.45"/>
        <rect x="2" y="11" width="7" height="7" rx="1.5" fill="white"/>
        <rect x="20" y="11" width="6" height="7" rx="1.5" fill="white" opacity="0.45"/>
        <rect x="11" y="11" width="7" height="7" rx="1.5" fill="white"/>
        <rect x="2" y="20" width="7" height="6" rx="1.5" fill="white"/>
        <rect x="11" y="20" width="7" height="6" rx="1.5" fill="white" opacity="0.25"/>
      </svg>
    </div>
  );
}

const NAV_LINKS = [
  { to: "/", label: "Главная" },
  { to: "/courses", label: "Курсы" },
  { to: "/faq", label: "FAQ" },
];

export function Header() {
  const location = useLocation();
  const { count, openCart } = useCart();
  const { user, logout } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
              <PixelForgeLogo />
              <span className="text-base font-semibold tracking-tight text-zinc-900">
                PixelForge
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                    isActive(link.to)
                      ? "bg-indigo-50 text-indigo-700 font-medium"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-1.5">
              {/* Search - desktop */}
              <div className="hidden lg:flex items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5">
                <Search className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Поиск курсов..."
                  className="w-48 bg-transparent text-sm outline-none placeholder:text-zinc-400 text-zinc-800"
                />
              </div>

              {/* Search - mobile */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>

              {/* Cart */}
              <button
                onClick={openCart}
                className="relative flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
              >
                <ShoppingCart className="h-4 w-4" />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* User */}
              {user ? (
                <Link
                  to="/dashboard"
                  className="hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                >
                  {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </Link>
              ) : (
                <>
                  <button className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors">
                    <User className="h-4 w-4" />
                  </button>
                  <Link
                    to="/register"
                    className="hidden sm:flex items-center rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                  >
                    Регистрация
                  </Link>
                </>
              )}

              {/* Burger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 transition-colors"
                aria-label="Меню"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Menu className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden lg:hidden"
              >
                <div className="flex items-center gap-2 pb-3">
                  <div className="flex flex-1 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
                    <Search className="h-4 w-4 text-zinc-400" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Поиск курсов..."
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
                    />
                  </div>
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="text-sm text-zinc-500"
                  >
                    Отмена
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-zinc-900/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.nav
              key="menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed left-0 top-0 z-50 flex h-full w-72 flex-col bg-white shadow-xl md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                  <PixelForgeLogo />
                  <span className="font-semibold text-zinc-900">PixelForge</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* User info */}
              {user && (
                <div className="border-b border-zinc-100 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">
                      {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900">{user.name}</p>
                      <p className="text-xs text-zinc-500">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const icons = [BookOpen, BookOpen, HelpCircle];
                  const Icon = icons[i];
                  return (
                    <motion.div
                      key={link.to}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.1 }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between rounded-lg px-4 py-3 transition-colors ${
                          isActive(link.to)
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-zinc-700 hover:bg-zinc-50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="font-medium">{link.label}</span>
                        </div>
                        <ChevronRight className="h-4 w-4 text-zinc-300" />
                      </Link>
                    </motion.div>
                  );
                })}

                {user && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.28 }}
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between rounded-lg px-4 py-3 text-zinc-700 hover:bg-zinc-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <User className="h-4 w-4" />
                        <span className="font-medium">Личный кабинет</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-300" />
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Bottom */}
              <div className="border-t border-zinc-100 px-4 py-4 space-y-2">
                {user ? (
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className="font-medium">Выйти</span>
                  </button>
                ) : (
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                  >
                    Зарегистрироваться
                  </Link>
                )}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
