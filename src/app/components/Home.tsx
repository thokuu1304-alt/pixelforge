import { Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Star,
  PlayCircle,
  ChevronRight,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";
import { courses } from "../data/courses";
import { CourseCard } from "./CourseCard";

const HERO_IMG = "https://images.unsplash.com/photo-1678436749207-4f54d16603fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";
const TESTIMONIAL_1 = "https://images.unsplash.com/photo-1760543998147-117ae5649c5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=120&q=80";
const TESTIMONIAL_2 = "https://images.unsplash.com/photo-1752952952773-80378cefc23d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=120&q=80";
const TESTIMONIAL_3 = "https://images.unsplash.com/photo-1770135005655-7b848430ce01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=120&q=80";
const STUDY_IMG = "https://images.unsplash.com/photo-1758612214899-c1bb0bfae408?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80";

const testimonials = [
  {
    text: "После курса по веб-разработке я получила работу фронтенд-разработчика в IT-компании. Всё чётко, по делу, с реальными проектами в портфолио.",
    name: "Екатерина Лебедева",
    role: "Frontend Developer, Ozon",
    photo: TESTIMONIAL_1,
    rating: 5,
    course: "Веб-разработка",
  },
  {
    text: "Курс по Data Science дал мне всё: теорию, Python, ML. Через 4 месяца после старта я перешёл из бухгалтерии в аналитику данных.",
    name: "Алексей Воронов",
    role: "Data Analyst, Сбер",
    photo: TESTIMONIAL_2,
    rating: 5,
    course: "Data Science",
  },
  {
    text: "Лучший UI/UX-курс из тех, что я проходила. Тьютор разбирает каждое задание лично. За 3 месяца собрала портфолио из 6 проектов.",
    name: "Ольга Семёнова",
    role: "Product Designer, VK",
    photo: TESTIMONIAL_3,
    rating: 5,
    course: "UI/UX Дизайн",
  },
];

const steps = [
  {
    icon: Target,
    number: "01",
    title: "Выберите курс",
    desc: "Более 200 программ по ключевым цифровым направлениям. Фильтры по уровню, длительности и стоимости.",
  },
  {
    icon: PlayCircle,
    number: "02",
    title: "Учитесь в своём темпе",
    desc: "Видео, практические задания, живые Q&A с преподавателем. Доступ с любого устройства, навсегда.",
  },
  {
    icon: Award,
    number: "03",
    title: "Получите сертификат",
    desc: "Именной сертификат после итогового теста. Принимается компаниями-партнёрами при найме.",
  },
  {
    icon: Zap,
    number: "04",
    title: "Стройте карьеру",
    desc: "Биржа вакансий для выпускников, карьерные консультации и рекомендации от партнёров.",
  },
];

const categoryList = [
  { name: "Разработка", icon: "💻" },
  { name: "Дизайн", icon: "🎨" },
  { name: "Маркетинг", icon: "📈" },
  { name: "Бизнес", icon: "💼" },
  { name: "Фотография", icon: "📷" },
  { name: "Фитнес", icon: "🧘" },
];

export function Home() {
  const featuredCourses = courses.filter((c) => c.featured);

  return (
    <div className="bg-white">

      {/* ─── Hero ─── */}
      <section className="border-b border-zinc-100 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex flex-col justify-center"
            >
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1">
                <TrendingUp className="h-3.5 w-3.5 text-indigo-600" />
                <span className="text-sm text-indigo-700">Платформа №1 в России по цифровым навыкам</span>
              </div>

              <h1 className="mb-5 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl">
                Учитесь у&nbsp;лучших.<br />
                <span className="text-indigo-600">Работайте</span> мечтой.
              </h1>

              <p className="mb-8 text-lg text-zinc-500 max-w-lg">
                Практические курсы от действующих специалистов. Реальные проекты в портфолио, живая обратная связь, сертификаты от партнёров.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
                >
                  Смотреть курсы
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
                >
                  Как это работает
                </Link>
              </div>

              {/* Mini-stats */}
              <div className="flex flex-wrap gap-6 border-t border-zinc-100 pt-6">
                {[
                  { icon: BookOpen, value: "200+", label: "курсов" },
                  { icon: Users, value: "180K+", label: "студентов" },
                  { icon: Award, value: "94%", label: "трудоустройство" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-indigo-500" />
                    <span className="font-bold text-zinc-900">{s.value}</span>
                    <span className="text-sm text-zinc-500">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 rounded-3xl bg-indigo-50" />
              <img
                src={HERO_IMG}
                alt="Студенты PixelForge"
                className="relative rounded-2xl object-cover w-full h-[500px] shadow-lg"
              />
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-6 rounded-xl border border-zinc-100 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                    <Award className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-500">Сегодня выдано сертификатов</p>
                    <p className="font-bold text-zinc-900">+47 сертификатов</p>
                  </div>
                </div>
              </div>
              {/* Rating card */}
              <div className="absolute -top-4 -right-4 rounded-xl border border-zinc-100 bg-white p-4 shadow-xl">
                <div className="flex items-center gap-1.5 mb-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm font-bold text-zinc-900">4.8 / 5.0</p>
                <p className="text-xs text-zinc-500">26 000+ отзывов</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Как это работает ─── */}
      <section className="border-b border-zinc-100 bg-zinc-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-indigo-600">Процесс</p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Как это работает
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                className="relative rounded-xl border border-zinc-200 bg-white p-6"
              >
                <span className="mb-4 block text-3xl font-bold text-zinc-100">{step.number}</span>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                  <step.icon className="h-5 w-5 text-indigo-600" />
                </div>
                <h3 className="mb-2 font-semibold text-zinc-900">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Популярные курсы ─── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="mb-2 text-sm font-medium uppercase tracking-widest text-indigo-600">Популярное</p>
              <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Выбор студентов
              </h2>
            </div>
            <Link
              to="/courses"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Весь каталог
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-5 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 transition-colors"
            >
              Весь каталог <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Категории ─── */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-indigo-600">Направления</p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Найдите своё направление
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categoryList.map((cat) => (
              <Link
                key={cat.name}
                to="/courses"
                className="group flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-6 transition-all hover:border-indigo-200 hover:shadow-sm hover:-translate-y-0.5"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-sm font-medium text-zinc-700 group-hover:text-indigo-700 transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Отзывы ─── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-indigo-600">Отзывы</p>
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
              Истории успеха
            </h2>
            <p className="mt-3 text-zinc-500">
              Более 26 000 отзывов со средней оценкой 4.8 из 5
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col rounded-xl border border-zinc-200 bg-white p-6"
              >
                <div className="mb-4 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mb-5 flex-1 text-sm text-zinc-600 leading-relaxed">
                  «{t.text}»
                </blockquote>
                <div className="flex items-center gap-3 border-t border-zinc-100 pt-4">
                  <img
                    src={t.photo}
                    alt={t.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-zinc-100"
                  />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{t.name}</p>
                    <p className="text-xs text-zinc-500">{t.role}</p>
                  </div>
                  <span className="ml-auto rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700">
                    {t.course}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Баннер со студентом ─── */}
      <section className="border-t border-zinc-100 bg-zinc-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white lg:grid-cols-2">
            <div className="flex flex-col justify-center px-8 py-12 lg:py-16 lg:pl-14">
              <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-600">Начните сегодня</p>
              <h2 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                Первый урок — бесплатно
              </h2>
              <p className="mb-8 text-zinc-500">
                Зарегистрируйтесь и получите бесплатный доступ к первому уроку любого курса. Без карты, без обязательств.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
                >
                  Попробовать бесплатно
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
                >
                  Частые вопросы
                </Link>
              </div>
              <p className="mt-4 text-xs text-zinc-400">
                Гарантия возврата 30 дней · Оплата в рублях · Рассрочка без %
              </p>
            </div>
            <div className="hidden lg:block">
              <img
                src={STUDY_IMG}
                alt="Студент за учёбой"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-zinc-900 px-8 py-16 text-center sm:px-16">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-400">Присоединяйтесь</p>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Более 180 000 студентов уже учатся
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-zinc-400">
              Новые курсы каждый месяц. Живые сессии с экспертами. Карьерная поддержка. Всё это — на PixelForge.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-8 py-3 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                Начать бесплатно
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-8 py-3 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
              >
                Смотреть курсы
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}