import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { useUser } from "../contexts/UserContext";
import { useEffect, useState } from "react";
import { courses } from "../data/courses";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  LogOut,
  Settings,
  Play,
  ChevronRight,
  Star,
  Bell,
  CheckCircle2,
  User,
} from "lucide-react";

// Simulate some demo data for a fresh account
const DEMO_COURSES = [courses[0], courses[2], courses[6]];
const DEMO_PROGRESS = [68, 34, 12];
const DEMO_CERTS = ["Веб-разработка — Базовый уровень"];

const RECOMMENDED = courses.filter((c) => !DEMO_COURSES.find((d) => d.id === c.id)).slice(0, 3);

export function Dashboard() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"courses" | "certs" | "profile">("courses");

  useEffect(() => {
    if (!user) navigate("/register");
  }, [user, navigate]);

  if (!user) return null;

  // Use user's enrolled courses + demo courses for visual
  const enrolledDisplay = user.enrolledCourses.length > 0
    ? user.enrolledCourses.map((ec, i) => ({
        course: ec.course,
        progress: [65, 28, 10, 80, 45, 90][i % 6],
      }))
    : DEMO_COURSES.map((c, i) => ({ course: c, progress: DEMO_PROGRESS[i] }));

  const certsDisplay = user.enrolledCourses.length > 0
    ? user.enrolledCourses.filter((_, i) => i === 0).map((ec) => ec.course.title)
    : DEMO_CERTS;

  const firstName = user.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Top banner */}
      <div className="bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg"
              >
                {user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)}
              </motion.div>
              <div>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="font-semibold text-white"
                >
                  Привет, {firstName}! 👋
                </motion.p>
                <p className="text-sm text-zinc-400">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 hover:text-white transition-colors">
                <Bell className="h-4 w-4" />
              </button>
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-sm text-zinc-400 hover:border-zinc-500 hover:text-white transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { icon: BookOpen, label: "Активных курсов", value: enrolledDisplay.length, color: "bg-indigo-50 text-indigo-600" },
            { icon: Award, label: "Сертификатов", value: certsDisplay.length, color: "bg-emerald-50 text-emerald-600" },
            { icon: Clock, label: "Часов обучения", value: Math.round(enrolledDisplay.reduce((s, e) => s + (e.progress / 100) * 30, 0)), color: "bg-blue-50 text-blue-600" },
            { icon: TrendingUp, label: "Ср. прогресс", value: `${Math.round(enrolledDisplay.reduce((s, e) => s + e.progress, 0) / (enrolledDisplay.length || 1))}%`, color: "bg-violet-50 text-violet-600" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-xl border border-zinc-200 bg-white p-5"
            >
              <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg ${stat.color}`}>
                <stat.icon className="h-4.5 w-4.5" />
              </div>
              <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
              <p className="text-xs text-zinc-500">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 border-b border-zinc-200">
          {(["courses", "certs", "profile"] as const).map((tab) => {
            const labels = { courses: "Мои курсы", certs: "Сертификаты", profile: "Профиль" };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* My Courses */}
        {activeTab === "courses" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {enrolledDisplay.map(({ course, progress }, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-xl border border-zinc-200 bg-white p-4"
                >
                  <div className="flex gap-4">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-20 w-24 shrink-0 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-indigo-600 mb-1">{course.category}</p>
                      <h3 className="font-semibold text-zinc-900 line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-zinc-500 mb-3">{course.instructor}</p>

                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-zinc-500">Прогресс</span>
                            <span className="text-xs font-medium text-zinc-700">{progress}%</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-zinc-100">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                              className="h-1.5 rounded-full bg-indigo-500"
                            />
                          </div>
                        </div>
                        <Link
                          to={`/courses/${course.id}`}
                          className="shrink-0 flex items-center gap-1.5 rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 transition-colors"
                        >
                          <Play className="h-3 w-3" />
                          Продолжить
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Link
                to="/courses"
                className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-200 py-5 text-sm text-zinc-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
              >
                <BookOpen className="h-4 w-4" />
                Найти новый курс
              </Link>
            </div>

            {/* Sidebar: recommendations */}
            <div className="space-y-4">
              <div className="rounded-xl border border-zinc-200 bg-white p-5">
                <h3 className="mb-4 text-sm font-semibold text-zinc-900">Рекомендуем вам</h3>
                <div className="space-y-4">
                  {RECOMMENDED.map((rc) => (
                    <Link
                      key={rc.id}
                      to={`/courses/${rc.id}`}
                      className="group flex gap-3"
                    >
                      <img
                        src={rc.image}
                        alt={rc.title}
                        className="h-12 w-14 shrink-0 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-2 text-zinc-800 group-hover:text-indigo-700 transition-colors">
                          {rc.title}
                        </p>
                        <div className="mt-1 flex items-center gap-1">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs text-zinc-500">{rc.rating}</span>
                          <span className="ml-2 text-xs font-semibold text-zinc-800">
                            {rc.price.toLocaleString("ru-RU")} ₽
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-300 shrink-0 self-center" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Progress tip */}
              <div className="rounded-xl bg-indigo-600 p-5 text-white">
                <p className="text-sm font-semibold mb-1">Совет дня 💡</p>
                <p className="text-xs text-indigo-200 leading-relaxed">
                  Занимайтесь хотя бы 20 минут в день. За месяц вы пройдёте в 3 раза больше материала!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Certificates */}
        {activeTab === "certs" && (
          <div className="space-y-4">
            {certsDisplay.map((certTitle, i) => (
              <motion.div
                key={certTitle}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-5 rounded-xl border border-zinc-200 bg-white p-5"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                  <Award className="h-7 w-7 text-amber-500" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-zinc-900">{certTitle}</p>
                  <p className="text-sm text-zinc-500">Выдан: апрель 2026</p>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm text-emerald-600 font-medium">Подтверждён</span>
                </div>
                <button className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors">
                  Скачать PDF
                </button>
              </motion.div>
            ))}
            {certsDisplay.length === 0 && (
              <div className="rounded-xl border border-dashed border-zinc-200 py-16 text-center">
                <Award className="mx-auto mb-3 h-10 w-10 text-zinc-200" />
                <p className="text-zinc-500">Пройдите курс до конца, чтобы получить сертификат</p>
              </div>
            )}
          </div>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl space-y-5"
          >
            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600 text-white text-2xl font-bold">
                  {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900">{user.name}</h3>
                  <p className="text-sm text-zinc-500">{user.email}</p>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    С нами с {user.joinedAt.toLocaleDateString("ru-RU", { month: "long", year: "numeric" })}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Имя", value: user.name },
                  { label: "Email", value: user.email },
                  { label: "Пароль", value: "••••••••" },
                  { label: "Телефон", value: "Не указан" },
                ].map((field) => (
                  <div key={field.label} className="flex items-center justify-between border-b border-zinc-50 pb-3 last:border-0 last:pb-0">
                    <div>
                      <p className="text-xs text-zinc-400">{field.label}</p>
                      <p className="text-sm text-zinc-800">{field.value}</p>
                    </div>
                    <button className="text-xs text-indigo-600 hover:underline">
                      Изменить
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-200 bg-white p-6">
              <h3 className="mb-4 text-sm font-semibold text-zinc-900">Уведомления</h3>
              <div className="space-y-3">
                {[
                  { label: "Новые курсы по моим темам", checked: true },
                  { label: "Напоминания об обучении", checked: true },
                  { label: "Специальные предложения", checked: false },
                ].map((pref) => (
                  <label key={pref.label} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-zinc-700">{pref.label}</span>
                    <input
                      type="checkbox"
                      defaultChecked={pref.checked}
                      className="h-4 w-4 rounded accent-indigo-600"
                    />
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => { logout(); navigate("/"); }}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Выйти из аккаунта
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
