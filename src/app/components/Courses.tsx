import { useState } from "react";
import { courses, categories } from "../data/courses";
import { CourseCard } from "./CourseCard";
import { SlidersHorizontal, X } from "lucide-react";

export function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("Все курсы");
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const filteredCourses = courses.filter((course) => {
    const categoryMatch =
      selectedCategory === "Все курсы" || course.category === selectedCategory;
    const levelMatch = !selectedLevel || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const levels = ["Начальный", "Средний", "Продвинутый"];

  return (
    <div className="min-h-screen bg-white">
      {/* Page header */}
      <div className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-indigo-600">Каталог</p>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">Все курсы</h1>
          <p className="mt-2 text-zinc-500">
            {courses.length} курсов от ведущих специалистов
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2 text-zinc-700">
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm font-medium">Фильтры</span>
          </div>

          <div className="flex flex-wrap gap-6">
            {/* Category */}
            <div className="flex-1 min-w-0">
              <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-zinc-400">Категория</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                      selectedCategory === category
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="hidden w-px bg-zinc-100 sm:block" />

            {/* Level */}
            <div className="shrink-0">
              <p className="mb-2.5 text-xs font-medium uppercase tracking-wider text-zinc-400">Уровень</p>
              <div className="flex flex-wrap gap-2">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
                      selectedLevel === level
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900"
                    }`}
                  >
                    {level}
                  </button>
                ))}
                {selectedLevel && (
                  <button
                    onClick={() => setSelectedLevel(null)}
                    className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                    Сбросить
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-sm text-zinc-500">
            Найдено:{" "}
            <span className="font-medium text-zinc-800">
              {filteredCourses.length}{" "}
              {filteredCourses.length === 1
                ? "курс"
                : filteredCourses.length > 1 && filteredCourses.length < 5
                ? "курса"
                : "курсов"}
            </span>
          </p>
        </div>

        {/* Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-200 py-20 text-center">
            <p className="text-zinc-500">Курсы не найдены. Попробуйте изменить фильтры.</p>
          </div>
        )}
      </div>
    </div>
  );
}