import { motion, AnimatePresence } from "motion/react";
import { X, Trash2, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router";
import { useCart } from "../contexts/CartContext";
import { useUser } from "../contexts/UserContext";
import { useState } from "react";

export function CartDrawer() {
  const { items, removeItem, clearCart, total, count, isOpen, closeCart } = useCart();
  const { user, enrollCourse } = useUser();
  const [purchased, setPurchased] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const discount = promoApplied ? Math.round(total * 0.1) : 0;
  const finalTotal = total - discount;

  const handleCheckout = () => {
    if (user) {
      items.forEach((item) => enrollCourse(item.course));
    }
    setPurchased(true);
    setTimeout(() => {
      clearCart();
      setPurchased(false);
      closeCart();
    }, 2200);
  };

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "PIXEL10") {
      setPromoApplied(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-zinc-900/40 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-zinc-700" />
                <h2 className="font-semibold text-zinc-900">Корзина</h2>
                {count > 0 && (
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                    {count}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Success state */}
            <AnimatePresence>
              {purchased && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center flex-1 gap-4 px-6"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                    <span className="text-4xl">🎉</span>
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">Оплата прошла!</h3>
                  <p className="text-center text-sm text-zinc-500">
                    {user
                      ? "Курсы добавлены в личный кабинет"
                      : "Курсы куплены. Зарегистрируйтесь для доступа."}
                  </p>
                  {user && (
                    <Link
                      to="/dashboard"
                      onClick={closeCart}
                      className="mt-2 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                    >
                      Перейти в кабинет
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty */}
            {!purchased && items.length === 0 && (
              <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100">
                  <ShoppingBag className="h-10 w-10 text-zinc-300" />
                </div>
                <p className="font-medium text-zinc-700">Корзина пуста</p>
                <p className="text-sm text-zinc-400 text-center">
                  Добавьте курсы из каталога, чтобы начать обучение
                </p>
                <Link
                  to="/courses"
                  onClick={closeCart}
                  className="mt-2 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                >
                  Перейти в каталог
                </Link>
              </div>
            )}

            {/* Items */}
            {!purchased && items.length > 0 && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                  <AnimatePresence initial={false}>
                    {items.map((item) => (
                      <motion.div
                        key={item.course.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-3 rounded-xl border border-zinc-100 p-3"
                      >
                        <img
                          src={item.course.image}
                          alt={item.course.title}
                          className="h-16 w-20 shrink-0 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-indigo-600 mb-0.5">
                            {item.course.category}
                          </p>
                          <p className="text-sm font-medium line-clamp-2 text-zinc-900">
                            {item.course.title}
                          </p>
                          <div className="mt-1.5 flex items-center justify-between">
                            <span className="font-bold text-zinc-900">
                              {item.course.price.toLocaleString("ru-RU")} ₽
                            </span>
                            <button
                              onClick={() => removeItem(item.course.id)}
                              className="flex h-6 w-6 items-center justify-center rounded text-zinc-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="border-t border-zinc-100 px-6 py-5 space-y-4">
                  {/* Promo */}
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Промокод (PIXEL10)"
                        disabled={promoApplied}
                        className="w-full rounded-lg border border-zinc-200 pl-8 pr-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 disabled:bg-zinc-50 transition"
                      />
                    </div>
                    <button
                      onClick={applyPromo}
                      disabled={promoApplied}
                      className="shrink-0 rounded-lg border border-zinc-200 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-50 transition-colors"
                    >
                      {promoApplied ? "✓" : "Применить"}
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-xs text-emerald-600">✓ Скидка 10% применена!</p>
                  )}

                  {/* Totals */}
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-zinc-600">
                      <span>Сумма ({count} курса)</span>
                      <span>{total.toLocaleString("ru-RU")} ₽</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Промокод</span>
                        <span>−{discount.toLocaleString("ru-RU")} ₽</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t border-zinc-100 pt-2 font-bold text-zinc-900">
                      <span>Итого</span>
                      <span>{finalTotal.toLocaleString("ru-RU")} ₽</span>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    Оформить покупку
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {!user && (
                    <p className="text-center text-xs text-zinc-400">
                      <Link to="/register" onClick={closeCart} className="text-indigo-600 hover:underline">
                        Войдите
                      </Link>
                      {" "}чтобы сохранить курсы в профиль
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
