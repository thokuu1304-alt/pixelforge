import { useState } from "react";
import { useParams, Link } from "react-router";
import { courses } from "../data/courses";
import {
  Star,
  Users,
  Clock,
  BarChart,
  Award,
  PlayCircle,
  Download,
  Globe,
  CheckCircle2,
  ArrowLeft,
  ShoppingCart,
  CheckCheck,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function CourseDetail() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === courseId);
  const [enrolled, setEnrolled] = useState(false);
  const [inCart, setInCart] = useState(false);

  if (!course) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <h1 className="mb-4 text-2xl font-bold text-zinc-900">Курс не найден</h1>
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm text-white hover:bg-indigo-700 transition-colors"
        >
          Вернуться к курсам
        </Link>
      </div>
    );
  }

  const discount = course.originalPrice
    ? Math.round((1 - course.price / course.originalPrice) * 100)
    : 0;

  const relatedCourses = courses
    .filter((c) => c.id !== course.id && c.category === course.category)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="border-b border-zinc-100 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            to="/courses"
            className="mb-8 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Назад к курсам
          </Link>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {/* Info */}
            <div className="lg:col-span-2">
              <div className="mb-4 flex items-center gap-2">
                <span className="rounded-md bg-amber-400/20 px-2.5 py-1 text-xs font-semibold text-amber-300">
                  {course.featured ? "Бестселлер" : course.category}
                </span>
                <span className="rounded-md border border-zinc-700 px-2.5 py-1 text-xs text-zinc-400">
                  {course.level}
                </span>
              </div>

              <h1 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {course.title}
              </h1>
              <p className="mb-6 text-zinc-400">{course.description}</p>

              <div className="mb-8 flex flex-wrap items-center gap-5 text-sm">
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-white">{course.rating}</span>
                  <span className="text-zinc-500">
                    ({course.students.toLocaleString('ru-RU')} студентов)
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400">
                  <PlayCircle className="h-4 w-4" />
                  <span>{course.lessons} уроков</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-700 text-sm font-semibold text-white">
                  {course.instructor.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-xs text-zinc-500">Автор курса</p>
                  <p className="text-sm font-medium text-white">{course.instructor}</p>
                </div>
              </div>
            </div>

            {/* Purchase card */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 rounded-xl border border-zinc-800 bg-zinc-800 p-6">
                <img
                  src={course.image}
                  alt={course.title}
                  className="mb-5 h-44 w-full rounded-lg object-cover"
                />

                <div className="mb-5">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-bold text-white">
                      {course.price.toLocaleString('ru-RU')} ₽
                    </span>
                    {course.originalPrice && (
                      <span className="text-base text-zinc-500 line-through">
                        {course.originalPrice.toLocaleString('ru-RU')} ₽
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="rounded-md bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-400">
                        −{discount}%
                      </span>
                    )}
                  </div>
                  {course.originalPrice && (
                    <p className="mt-1 text-xs text-zinc-500">⏰ Скидка действует 48 часов</p>
                  )}
                </div>

                {enrolled ? (
                  <div className="mb-2.5 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 py-3 text-sm font-medium text-white">
                    <CheckCheck className="h-4 w-4" />
                    Вы записаны!
                  </div>
                ) : (
                  <button
                    onClick={() => setEnrolled(true)}
                    className="mb-2.5 w-full rounded-lg bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                  >
                    Записаться сейчас
                  </button>
                )}

                <button
                  onClick={() => setInCart(true)}
                  className={`w-full rounded-lg border py-3 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    inCart
                      ? "border-emerald-600 bg-emerald-600/10 text-emerald-400"
                      : "border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-white"
                  }`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {inCart ? "В корзине" : "В корзину"}
                </button>

                <div className="mt-6 space-y-3 border-t border-zinc-700 pt-5">
                  {[
                    { icon: Award, text: "Сертификат об окончании" },
                    { icon: Globe, text: "Доступ с любых устройств" },
                    { icon: Download, text: "Загружаемые материалы" },
                    { icon: Users, text: "Сообщество учащихся" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-3 text-sm text-zinc-400">
                      <Icon className="h-4 w-4 text-zinc-500 shrink-0" />
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-center text-xs text-zinc-500">
                  Гарантия возврата 30 дней
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs + Sidebar */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start border-b border-zinc-200 bg-transparent rounded-none gap-1 pb-0 mb-8">
                  {["overview", "curriculum", "instructor"].map((tab) => {
                    const labels: Record<string, string> = {
                      overview: "Обзор",
                      curriculum: "Программа",
                      instructor: "Преподаватель",
                    };
                    return (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="rounded-none border-b-2 border-transparent pb-3 text-zinc-500 data-[state=active]:border-indigo-600 data-[state=active]:text-indigo-600 data-[state=active]:shadow-none bg-transparent hover:text-zinc-800"
                      >
                        {labels[tab]}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                {/* Overview */}
                <TabsContent value="overview" className="space-y-6">
                  <div className="rounded-xl border border-zinc-200 p-6">
                    <h2 className="mb-5 font-semibold text-zinc-900">Чему вы научитесь</h2>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {course.skills.map((skill, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="h-4 w-4 text-indigo-600 mt-0.5 shrink-0" />
                          <span className="text-sm text-zinc-700">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-zinc-200 p-6">
                    <h2 className="mb-5 font-semibold text-zinc-900">Детали курса</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        { icon: BarChart, color: "bg-indigo-50 text-indigo-600", label: "Уровень", value: course.level },
                        { icon: Users, color: "bg-blue-50 text-blue-600", label: "Студентов", value: course.students.toLocaleString('ru-RU') },
                        { icon: Clock, color: "bg-emerald-50 text-emerald-600", label: "Длительность", value: course.duration },
                        { icon: PlayCircle, color: "bg-orange-50 text-orange-600", label: "Уроков", value: String(course.lessons) },
                      ].map(({ icon: Icon, color, label, value }) => (
                        <div key={label} className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-xs text-zinc-500">{label}</p>
                            <p className="text-sm font-semibold text-zinc-900">{value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Curriculum */}
                <TabsContent value="curriculum" className="space-y-4">
                  {course.curriculum.map((section, i) => (
                    <div key={i} className="rounded-xl border border-zinc-200 overflow-hidden">
                      <div className="border-b border-zinc-100 bg-zinc-50 px-5 py-3.5">
                        <h3 className="text-sm font-semibold text-zinc-900">
                          Раздел {i + 1}: {section.title}
                        </h3>
                      </div>
                      <ul className="divide-y divide-zinc-100">
                        {section.lessons.map((lesson, li) => (
                          <li key={li} className="flex items-center gap-3 px-5 py-3">
                            <PlayCircle className="h-4 w-4 text-zinc-300 shrink-0" />
                            <span className="text-sm text-zinc-700">{lesson}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </TabsContent>

                {/* Instructor */}
                <TabsContent value="instructor">
                  <div className="rounded-xl border border-zinc-200 p-6">
                    <div className="flex items-start gap-5 mb-6">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-xl font-bold text-white">
                        {course.instructor.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-zinc-900 mb-1">{course.instructor}</h3>
                        <p className="text-sm text-zinc-500 mb-3">Эксперт-преподаватель</p>
                        <div className="flex gap-5 text-sm text-zinc-500">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-medium text-zinc-700">4.8</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>50 000+ студентов</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <PlayCircle className="h-4 w-4" />
                            <span>12 курсов</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {course.instructor} — практикующий специалист с более чем 10-летним стажем в области {course.category.toLowerCase()}.
                      Помог тысячам студентов достичь своих целей через практическое обучение и реальные проекты.
                      Преподавательский подход: от теории к практике с первого же урока, акцент на рыночных кейсах.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-5">
              {relatedCourses.length > 0 && (
                <div className="rounded-xl border border-zinc-200 p-5">
                  <h3 className="mb-4 text-sm font-semibold text-zinc-900">Студенты также смотрели</h3>
                  <div className="space-y-4">
                    {relatedCourses.map((rc) => (
                      <Link
                        key={rc.id}
                        to={`/courses/${rc.id}`}
                        className="group flex gap-3"
                      >
                        <img
                          src={rc.image}
                          alt={rc.title}
                          className="h-14 w-14 shrink-0 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium line-clamp-2 text-zinc-800 group-hover:text-indigo-700 transition-colors">
                            {rc.title}
                          </h4>
                          <p className="mt-1 text-xs text-zinc-500">{rc.instructor}</p>
                          <p className="mt-1 text-sm font-semibold text-zinc-900">
                            {rc.price.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ link */}
              <div className="rounded-xl border border-dashed border-zinc-200 p-5 text-center">
                <p className="mb-2 text-sm text-zinc-600">Есть вопросы о курсе?</p>
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-1 rounded-lg bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-200 transition-colors"
                >
                  Читать FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
