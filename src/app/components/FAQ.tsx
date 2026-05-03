import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown, MessageCircle, Mail } from "lucide-react";

const faqs = [
  {
    category: "Обучение",
    items: [
      {
        q: "Как начать обучение на PixelForge?",
        a: "Зарегистрируйтесь бесплатно, выберите любой курс из каталога и нажмите «Записаться». После оплаты все материалы сразу станут доступны в вашем личном кабинете.",
      },
      {
        q: "Есть ли ограничение по времени прохождения курсов?",
        a: "Нет. После покупки доступ к материалам остаётся навсегда — учитесь в своём темпе, возвращайтесь к урокам сколько угодно раз.",
      },
      {
        q: "На каких устройствах доступны курсы?",
        a: "На любых: ПК, ноутбук, планшет, смартфон. Все видео адаптированы под мобильные экраны и работают офлайн после скачивания.",
      },
      {
        q: "Есть ли живое общение с преподавателем?",
        a: "Да. В каждом курсе есть закрытый чат студентов и еженедельные Q&A-сессии с автором, где можно задать любой вопрос по теме.",
      },
    ],
  },
  {
    category: "Оплата и возврат",
    items: [
      {
        q: "Какие способы оплаты принимаете?",
        a: "Банковские карты Visa/Mastercard/МИР, СБП, ЮMoney, а также рассрочка через Тинькофф и Сбер без переплат на срок до 12 месяцев.",
      },
      {
        q: "Как работает гарантия возврата денег?",
        a: "Если в течение 30 дней после покупки курс вас не устроит, мы вернём 100% стоимости без вопросов. Достаточно написать на support@pixelforge.ru.",
      },
      {
        q: "Есть ли скидки для студентов или групп?",
        a: "Да: скидка 20% по студенческому билету и специальные корпоративные тарифы для команд от 5 человек. Напишите нам для уточнения условий.",
      },
    ],
  },
  {
    category: "Сертификаты",
    items: [
      {
        q: "Получу ли я сертификат по окончании курса?",
        a: "Да, после прохождения всех уроков и итогового теста вы получите именной сертификат в формате PDF. Он привязан к вашему профилю и легко добавляется в LinkedIn.",
      },
      {
        q: "Признаются ли ваши сертификаты работодателями?",
        a: "PixelForge сотрудничает с 40+ компаниями-партнёрами (IT, дизайн, маркетинг), которые учитывают наши сертификаты при найме. Полный список доступен в разделе «Партнёры».",
      },
    ],
  },
  {
    category: "Технические вопросы",
    items: [
      {
        q: "Что делать, если видео не воспроизводится?",
        a: "Попробуйте обновить браузер до последней версии или переключитесь на Chrome/Firefox. Если проблема сохраняется — напишите в поддержку с описанием устройства и браузера.",
      },
      {
        q: "Можно ли скачать материалы для офлайн-просмотра?",
        a: "Видеоуроки доступны для скачивания через мобильное приложение. Конспекты, задания и дополнительные файлы можно скачать прямо с платформы в любое время.",
      },
    ],
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-zinc-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className={`text-sm font-medium ${open ? "text-indigo-600" : "text-zinc-800"}`}>
          {q}
        </span>
        <ChevronDown
          className={`mt-0.5 h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 ${open ? "rotate-180 text-indigo-500" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-zinc-500">{a}</p>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-indigo-600">
            Поддержка
          </p>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-zinc-900">
            Часто задаваемые вопросы
          </h1>
          <p className="text-zinc-500">
            Не нашли ответ? Напишите нам —{" "}
            <a href="mailto:support@pixelforge.ru" className="text-indigo-600 hover:underline">
              support@pixelforge.ru
            </a>
          </p>
        </div>
      </div>

      {/* FAQ sections */}
      <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8 space-y-10">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {section.category}
            </h2>
            <div className="rounded-xl border border-zinc-200 bg-white px-6">
              {section.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}

        {/* Contact block */}
        <div className="rounded-2xl bg-zinc-900 p-8 text-center">
          <h3 className="mb-2 text-xl font-bold text-white">Остались вопросы?</h3>
          <p className="mb-6 text-sm text-zinc-400">
            Наша команда отвечает в рабочие дни с 9:00 до 20:00 МСК
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="mailto:support@pixelforge.ru"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              <Mail className="h-4 w-4" />
              Написать на email
            </a>
            <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors">
              <MessageCircle className="h-4 w-4" />
              Открыть чат
            </button>
          </div>
        </div>

        <div className="text-center">
          <Link
            to="/"
            className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
