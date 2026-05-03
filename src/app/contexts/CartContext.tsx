import { createContext, useContext, useState, ReactNode } from "react";
import { Course } from "../data/courses";

export interface CartItem {
  course: Course;
  addedAt: Date;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (course: Course) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  total: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (course: Course) => {
    setItems((prev) => {
      if (prev.find((i) => i.course.id === course.id)) return prev;
      return [...prev, { course, addedAt: new Date() }];
    });
    setIsOpen(true);
  };

  const removeItem = (courseId: string) => {
    setItems((prev) => prev.filter((i) => i.course.id !== courseId));
  };

  const clearCart = () => setItems([]);

  const isInCart = (courseId: string) => items.some((i) => i.course.id === courseId);

  const total = items.reduce((sum, i) => sum + i.course.price, 0);
  const count = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        total,
        count,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
