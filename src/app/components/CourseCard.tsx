import { Link } from "react-router";
import { Star, Users, Clock, ShoppingCart, Check } from "lucide-react";
import { motion } from "motion/react";
import { Course } from "../data/courses";
import { useCart } from "../contexts/CartContext";

interface CourseCardProps {
  course: Course;
  index?: number;
}

export function CourseCard({ course, index = 0 }: CourseCardProps) {
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(course.id);

  const discount = course.originalPrice
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:border-zinc-300 hover:shadow-md"
    >
      {/* Image */}
      <Link to={`/courses/${course.id}`} className="relative overflow-hidden block">
        <img
          src={course.image}
          alt={course.title}
          className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-zinc-900/10 group-hover:bg-zinc-900/0 transition-colors" />
        {course.featured && (
          <span className="absolute top-3 left-3 rounded-md bg-amber-400 px-2 py-0.5 text-xs font-semibold text-amber-900">
            Бестселлер
          </span>
        )}
        {discount > 0 && (
          <span className="absolute top-3 right-3 rounded-md bg-zinc-900/80 px-2 py-0.5 text-xs font-semibold text-white">
            −{discount}%
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-2 text-xs font-medium uppercase tracking-wider text-indigo-600">
          {course.category}
        </span>

        <Link to={`/courses/${course.id}`}>
          <h3 className="mb-2 line-clamp-2 font-semibold text-zinc-900 group-hover:text-indigo-700 transition-colors">
            {course.title}
          </h3>
        </Link>

        <p className="mb-4 text-sm text-zinc-500">{course.instructor}</p>

        <div className="mb-4 flex items-center gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            <span>{course.students.toLocaleString("ru-RU")}</span>
          </div>
          <span className="rounded-md border border-zinc-200 px-2 py-0.5 text-zinc-600">
            {course.level}
          </span>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-sm font-semibold text-zinc-800">{course.rating}</span>
        </div>

        {/* Price + Cart */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-zinc-900">
              {course.price.toLocaleString("ru-RU")} ₽
            </span>
            {course.originalPrice && (
              <span className="text-sm text-zinc-400 line-through">
                {course.originalPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={(e) => {
              e.preventDefault();
              addItem(course);
            }}
            title={inCart ? "В корзине" : "В корзину"}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
              inCart
                ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                : "border-zinc-200 text-zinc-400 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-600"
            }`}
          >
            {inCart ? (
              <Check className="h-4 w-4" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
