'use client';

import React, { useEffect, useState } from 'react';
import { Playfair_Display, Inter } from 'next/font/google';
import {
  Sun,
  Moon,
  Heart,
  User,
  Phone,
  Calendar,
  MessageSquare,
  Quote,
  ArrowUp,
  CheckCircle2,
  XCircle,
  Sparkles,
  Users,
  Clock,
  ShieldCheck,
  Send,
  MapPin,
  Video,
  RefreshCcw,
  ChevronDown,
  PersonStanding,
  Compass,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

/* -------------------------------------------------------------------------- */
/*                                  THEME                                    */
/* -------------------------------------------------------------------------- */

/**
 * Основной цвет действия (CTA, аватар, акценты бренда) — приглушённый,
 * пыльный шалфейно-зелёный оттенок (по скриншоту-референсу), а не насыщенный
 * "лесной" зелёный, использованный ранее.
 */
const GREEN = '#6F8570';
const GREEN_DARK = '#5B6F5D';

const THEME_BG = '#F6ECDA';

/* -------------------------------------------------------------------------- */
/*                                   DATA                                    */
/* -------------------------------------------------------------------------- */

const navLinks = [
  { href: '#about', label: 'Обо мне' },
  { href: '#work', label: 'Направления' },
  { href: '#rules', label: 'Правила' },
  { href: '#prices', label: 'Стоимость' },
  { href: '#booking', label: 'Контакты' },
];

/** Три ключевые метрики hero — отдельные карточки с иконкой. */
const heroStats = [
  { icon: Clock, value: '11 000+', label: 'проведённых сессий' },
  { icon: Calendar, value: '8+ лет', label: 'частной практики' },
  { icon: Users, value: 'Мультимодальный', label: 'подход' },
];

const forMePoints = [
  'Устали от быстрых советов и хотите разобраться глубже',
  'Замечаете, что попадаете в один и тот же сценарий — в отношениях или карьере',
  'Переживаете жизненный переход: развод, потерю, новый этап',
  'Тело сигналит о проблеме — соматика, хроническое напряжение, усталость',
  'Хотите выстроить более зрелые и осознанные отношения с собой и другими',
  'Готовы к регулярной, глубокой и честной работе над собой',
];

const notForMePoints = [
  'Ищете волшебную таблетку или готовое решение за одну встречу',
  'Находитесь в остром психиатрическом состоянии, требующем медикаментозной поддержки',
  'Не готовы к регулярности встреч',
  'Избегаете реальности и не готовы смотреть в глаза сложным темам',
  'Не готовы соблюдать условия терапевтического контракта',
];

const workAreas = [
  {
    icon: Heart,
    title: 'Зрелая парность',
    text: 'Отношения, в которых есть место близости и границам одновременно. Работа с созависимостью, доверием и конфликтами.',
  },
  {
    icon: Sparkles,
    title: 'Автономия и самоценность',
    text: 'Опора на себя, а не на внешнее одобрение. Право хотеть, отказывать и занимать место в своей жизни.',
  },
  {
    icon: PersonStanding,
    title: 'Тело и проявленность',
    text: 'Телесно-ориентированная работа: возвращение чувствительности, снятие хронического напряжения, право быть видимым.',
  },
  {
    icon: Compass,
    title: 'Жизненные переходы',
    text: 'Развод, потеря, смена профессии, кризис среднего возраста — сопровождение в точках, где старое уже не работает.',
  },
];

const rules = [
  {
    icon: Clock,
    title: 'Длительность сессии',
    text: '50 минут — оптимальное время для глубокой и бережной работы без потери фокуса.',
  },
  {
    icon: RefreshCcw,
    title: 'Регулярность',
    text: 'Еженедельные встречи в одно и то же время. Именно ритм делает терапию эффективной.',
  },
  {
    icon: Video,
    title: 'Формат',
    text: 'Онлайн по видеосвязи или очно в кабинете — выбираете вы, формат можно менять.',
  },
  {
    icon: ShieldCheck,
    title: 'Конфиденциальность',
    text: 'Всё, что происходит на сессиях, остаётся строго между нами. Это основа доверия.',
  },
  {
    icon: AlertCircle,
    title: 'Отмена и перенос',
    text: 'Предупреждайте об отмене минимум за 24 часа — иначе сессия оплачивается полностью.',
  },
];

const pricingCards = [
  {
    duration: '60 минут',
    type: 'Индивидуальная',
    price: '6500 руб',
  },
  {
    duration: '90 минут',
    type: 'Индивидуальная',
    price: '8500 руб',
  },
  {
    duration: '60 минут',
    type: 'Парная',
    price: '7500 руб',
  },
  {
    duration: '90 минут',
    type: 'Парная',
    price: '9500 руб',
  },
];

const timeSlots = [
  'Утро (9:00–12:00)',
  'День (12:00–16:00)',
  'Вечер (16:00–20:00)',
  'Подберём вместе',
];

/* -------------------------------------------------------------------------- */
/*                             SMALL UI HELPERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Тонкий орнаментальный разделитель между секциями — волнистая линия
 * (stroke, не fill), которая ничего не перекрывает и поэтому не может
 * создать цветовой "шов" на непрерывном градиенте фона.
 */
function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none mx-auto flex w-full max-w-xs items-center justify-center gap-4 ${className}`}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C6967B]/35" />
      <svg width="44" height="16" viewBox="0 0 44 16" className="text-[#C6967B]/50">
        <path
          d="M0 8 C 6 1, 12 15, 22 8 S 38 1, 44 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C6967B]/35" />
    </div>
  );
}

function Blob({ className }: { className: string }) {
  return <div aria-hidden className={`pointer-events-none absolute rounded-full blur-3xl ${className}`} />;
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#C6967B]/30 bg-white/50 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#9C7259] backdrop-blur-sm">
      {children}
    </span>
  );
}

function GlassCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/40 bg-white/60 shadow-sm backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Тонированное изображение, органично вписанное в тёплую кремовую палитру
 * сайта.
 *
 * Пути к файлам: все фото лежат в `public/images/` и подключаются строго
 * с префиксом `/images/...` (например `/images/portrait-hero.jpg`).
 */
function ThemedImage({
  src,
  alt,
  roundedClass = 'rounded-3xl',
  className = '',
  filterClass = 'sepia-[0.18] saturate-[1.15] contrast-[1.05] brightness-[0.98]',
  vignetteOpacity = 'opacity-90',
}: {
  src: string;
  alt: string;
  roundedClass?: string;
  className?: string;
  filterClass?: string;
  vignetteOpacity?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden border border-white/60 shadow-[0_8px_32px_rgba(74,62,61,0.06),inset_0_1px_2px_rgba(255,255,255,0.8)] ${roundedClass} ${className}`}
    >
      {/* 1. Картинка с цветокором */}
      <img src={src} alt={alt} className={`h-full w-full object-cover ${filterClass}`} />

      {/* 2. Плотная виньетка под цвет фона */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 ${vignetteOpacity}`}
        style={{
          background: `radial-gradient(circle at center, transparent 25%, ${THEME_BG} 85%)`,
        }}
      />

      {/* 3. Дополнительное наложение цвета по самым краям для слияния */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{ backgroundColor: `${THEME_BG}33` }}
      />

      {/* 4. Легкий теневой градиент для объема */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4A3E3D]/20 via-transparent to-transparent"
      />
    </div>
  );
}

/**
 * Рамка-обёртка для крупного портрета в секции "Обо мне".
 * `min-w-0` + `overflow-hidden` защищают от "выезда" содержимого за границы
 * grid-колонки (у ячеек Grid по умолчанию `min-width: auto`).
 */
function PortraitFrame({
  src,
  alt,
  roundedClass,
  glowClass,
}: {
  src: string;
  alt: string;
  roundedClass: string;
  glowClass: string;
}) {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md min-w-0 overflow-hidden">
      <div className={`absolute -inset-3 rounded-[3rem] blur-2xl ${glowClass}`} />
      <ThemedImage src={src} alt={alt} roundedClass={roundedClass} className="h-full" />
    </div>
  );
}



function PricingCard({
  duration,
  type,
  price,
}: {
  duration: string;
  type: string;
  price: string;
}) {
  return (
    <GlassCard className="flex flex-col items-center p-8 text-center">
  {/* Бейдж длительности как на втором скриншоте */}
  <div className="inline-flex items-center justify-center rounded-full bg-[#4A3E3D]/8 px-4 py-1.5 text-sm font-medium text-[#4A3E3D]">
    {duration}
  </div>

  {/* Название услуги */}
  <h3 className={`${playfair.className} mt-6 text-xl font-medium text-[#4A3E3D]`}>
    {type}
  </h3>

  {/* Стоимость (с ровными цифрами без засечек) */}
  <p className="mt-3 text-4xl font-bold tracking-tight text-[#4A3E3D]">
    {price}
  </p>
</GlassCard>
  );
}

/* -------------------------------------------------------------------------- */
/*                                MAIN PAGE                                  */
/* -------------------------------------------------------------------------- */

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    time: '',
    topic: '',
  });
  const [submitted, setSubmitted] = useState(false);

  /**
   * Header: фиксированный (не sticky) и всегда виден при прокрутке.
   * `scrolled` включает более плотный "liquid glass" (сильнее блюр,
   * насыщенность и заметная кромка) после начала скролла — на самом верху
   * страницы стекло почти прозрачное, при скролле "оживает" и уплотняется.
   */
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: подключить реальную отправку (API route / CRM / Telegram-бот)
    console.log('Booking request:', form);
    setSubmitted(true);
  }

  function scrollToBooking() {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToWork() {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div
      className={`${inter.variable} ${playfair.variable} min-h-screen overflow-x-hidden bg-gradient-to-b from-[#FAF1E2] via-[#F5EAD6] to-[#FBF6EC] font-sans text-[#4A3E3D] antialiased`}
    >
      {/* ---------------------------------------------------------------- */}
      {/* HEADER — fixed, liquid glass                                    */}
      {/* ---------------------------------------------------------------- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/35 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_rgba(74,62,61,0.10)]'
            : 'bg-white/15 backdrop-blur-xl backdrop-saturate-150 shadow-none'
        }`}
        style={{
          borderBottom: '1px solid rgba(255,255,255,0.45)',
          boxShadow: scrolled
            ? 'inset 0 1px 1px rgba(255,255,255,0.6), 0 8px 32px rgba(74,62,61,0.10)'
            : 'inset 0 1px 1px rgba(255,255,255,0.4)',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 md:px-10">
          {/* Brand: avatar + name/subtitle */}
          <a href="#" className="flex min-w-0 items-center gap-3">
            <span
              className={`${playfair.className} flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm`}
              style={{ background: `linear-gradient(135deg, ${GREEN}, ${GREEN_DARK})` }}
            >
              ЕШ
            </span>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className={`${playfair.className} truncate text-base font-semibold text-[#4A3E3D] md:text-lg`}>
                Евгения Шарыгина
              </span>
              <span className="truncate text-xs text-[#8C7A76]">Психолог-консультант</span>
            </span>
          </a>

          {/* Nav */}
          <nav className="hidden items-center gap-7 text-sm text-[#6B5B58] lg:flex">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className="whitespace-nowrap transition-colors hover:text-[#4A3E3D]">
                {label}
              </a>
            ))}
          </nav>

          {/* Phone + CTA (desktop) */}
          <div className="hidden items-center gap-5 md:flex">
            <a
              href="tel:+79161782822"
              className="inline-flex items-center gap-2 whitespace-nowrap text-sm text-[#4A3E3D] transition-colors"
              style={{ '--hover-color': GREEN_DARK } as React.CSSProperties}
            >
              <Phone className="h-4 w-4" style={{ color: GREEN }} strokeWidth={1.75} />
              +7 (916) 178-28-22
            </a>
            <button
              onClick={scrollToBooking}
              className="whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-300"
              style={{ backgroundColor: GREEN }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
            >
              Записаться
            </button>
          </div>

          {/* CTA (mobile, компактный вариант без телефона и nav) */}
          <button
            onClick={scrollToBooking}
            className="flex-shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 md:hidden"
            style={{ backgroundColor: GREEN }}
          >
            Записаться
          </button>
        </div>
      </header>

      {/* Spacer, компенсирующий изъятие fixed-хедера из потока документа */}
      <div aria-hidden className="h-[72px] md:h-[76px]" />

      {/* ---------------------------------------------------------------- */}
      {/* HERO                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden px-6 pt-12 pb-14 md:px-10 md:pt-16 md:pb-20">
        <Blob className="left-[-10%] top-[10%] h-72 w-72 bg-[#C6967B]/15" />
        <Blob className="right-[-5%] top-[30%] h-96 w-96 bg-[#EAD9CC]/40" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-stretch gap-14 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div className="relative z-10 flex min-w-0 flex-col justify-center">
            {/* Бейдж формата работы */}
            <span
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm text-[#4A3E3D] shadow-sm backdrop-blur-sm"
            >
              <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: GREEN }} />
              Онлайн и очные консультации в Москве
            </span>

            <h1
              className={`${playfair.className} text-3xl font-semibold leading-tight text-[#4A3E3D] sm:text-4xl md:text-5xl md:leading-[1.15]`}
            >
              Евгения Шарыгина —<br className="hidden sm:block" /> практикующий психолог и
              психотерапевт
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#6B5B58] md:text-lg">
              Создаю безопасное пространство для глубинной работы, изменения жизненных
              сценариев и встречи с собой.
            </p>

            {/* Три отдельные карточки с метриками */}
            <div className="mt-9 flex flex-wrap gap-3">
              {heroStats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex min-w-[190px] flex-1 items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3.5 shadow-sm backdrop-blur-sm sm:flex-none"
                >
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#F0E4D3]">
                    <Icon className="h-5 w-5 text-[#4A3E3D]" strokeWidth={1.75} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className={`${playfair.className} text-base font-semibold text-[#4A3E3D]`}>
                      {value}
                    </span>
                    <span className="text-xs text-[#8C7A76]">{label}</span>
                  </span>
                </div>
              ))}
            </div>

            {/* Основной + второстепенный CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                onClick={scrollToBooking}
                className="inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl md:text-base"
                style={{ backgroundColor: GREEN }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
              >
                Записаться на первичную консультацию
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Right column — живое фото в кабинете/интерьере */}
          <div className="relative z-10 min-w-0">
            <div className="relative h-full min-h-[380px] w-full lg:min-h-[560px]">
              <ThemedImage
                src="/images/portrait-hero2.jpg"
                alt="Евгения Шарыгина — психолог, психотерапевт, в кабинете"
                roundedClass="rounded-3xl"
                className="h-full"
                filterClass="contrast-[1.03] brightness-[1.02] saturate-[1.05]"
                vignetteOpacity="opacity-30"
              />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider className="mb-6" />

      {/* ---------------------------------------------------------------- */}
      {/* ABOUT & APPROACH                                                */}
      {/* ---------------------------------------------------------------- */}
      <section id="about" className="relative px-6 py-16 md:px-10 md:py-24">
        <Blob className="right-[5%] top-[10%] h-72 w-72 bg-[#C6967B]/15" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Portrait */}
          <div className="relative order-1 min-w-0">
            <PortraitFrame
              src="/images/portrait-about.jpg"
              alt="Евгения Шарыгина в кабинете"
              roundedClass="rounded-[2.5rem] rounded-tl-[6rem] rounded-br-[6rem]"
              glowClass="bg-gradient-to-tr from-[#C6967B]/25 to-[#EAD9CC]/50"
            />
          </div>

          {/* Text */}
          <div className="order-2 min-w-0">
            <SectionEyebrow>Философия работы</SectionEyebrow>
            <h2 className={`${playfair.className} mt-5 text-3xl font-semibold text-[#4A3E3D] sm:text-4xl`}>
              Обо мне и моём подходе
            </h2>

            <p className="mt-6 text-base leading-relaxed text-[#6B5B58] md:text-lg">
              Я работаю в парадигме «взрослый — взрослый»: без назидания, без спасательства, на
              равных. Моя задача — не решить вашу проблему вместо вас, а создать пространство, в
              котором вы сможете увидеть себя настоящего и найти собственную опору.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#6B5B58] md:text-lg">
              Мой подход мультимодальный — я соединяю психодинамический, экзистенциальный и
              телесно-ориентированный взгляд, чтобы работать не только с мыслями, но и с телом,
              чувствами и жизненным контекстом. За 18 лет в профессии и более 11 000 сессий я
              убедилась: устойчивые изменения рождаются не из советов, а из честной встречи с
              собой.
            </p>

            <div className="mt-8 rounded-3xl border border-[#C6967B]/30 bg-[#C6967B]/10 p-6 backdrop-blur-sm">
              <Quote className="h-6 w-6 text-[#C6967B]" strokeWidth={1.5} />
              <p className={`${playfair.className} mt-3 text-lg italic leading-relaxed text-[#4A3E3D] md:text-xl`}>
                «Я не даю советов. Не спасаю. Я исследую с вами вашу слепую зону».
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SELF-SELECTION GRID                                             */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <SectionEyebrow>Прежде чем начать</SectionEyebrow>
          <h2 className={`${playfair.className} mt-5 text-3xl font-semibold text-[#4A3E3D] sm:text-4xl`}>
            Подходим ли мы друг другу
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* For me */}
          <GlassCard className="p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C6967B]/20">
                <Sun className="h-5 w-5 text-[#C6967B]" strokeWidth={1.75} />
              </span>
              <h3 className={`${playfair.className} text-xl font-semibold text-[#4A3E3D] md:text-2xl`}>
                Вам ко мне, если...
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {forMePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-[#6B5B58] md:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#C6967B]" strokeWidth={1.75} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </GlassCard>

          {/* Not for me */}
          <GlassCard className="p-8 md:p-10">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4A3E3D]/10">
                <Moon className="h-5 w-5 text-[#4A3E3D]" strokeWidth={1.75} />
              </span>
              <h3 className={`${playfair.className} text-xl font-semibold text-[#4A3E3D] md:text-2xl`}>
                Вам не ко мне, если...
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {notForMePoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-[#6B5B58] md:text-base">
                  <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#9C7259]/70" strokeWidth={1.75} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* AREAS OF WORK                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section id="work" className="relative px-6 py-16 md:px-10 md:py-24">
        <Blob className="left-[0%] bottom-[0%] h-80 w-80 bg-[#EAD9CC]/50" />

        <div className="mx-auto max-w-7xl text-center">
          <SectionEyebrow>Фокус терапии</SectionEyebrow>
          <h2 className={`${playfair.className} mt-5 text-3xl font-semibold text-[#4A3E3D] sm:text-4xl`}>
            С какими запросами я работаю
          </h2>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {workAreas.map(({ icon: Icon, title, text }) => (
            <GlassCard key={title} className="p-8 transition-transform duration-300 hover:-translate-y-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C6967B]/15">
                <Icon className="h-6 w-6 text-[#C6967B]" strokeWidth={1.5} />
              </span>
              <h3 className={`${playfair.className} mt-5 text-xl font-semibold text-[#4A3E3D]`}>
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6B5B58] md:text-base">{text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <SectionDivider className="mb-6" />

      {/* ---------------------------------------------------------------- */}
      {/* RULES & SETTING                                                 */}
      {/* ---------------------------------------------------------------- */}
      <section id="rules" className="relative px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <SectionEyebrow>Терапевтический контракт</SectionEyebrow>
          <h2 className={`${playfair.className} mt-5 text-3xl font-semibold text-[#4A3E3D] sm:text-4xl`}>
            Правила и формат работы
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B5B58] md:text-lg">
            Чёткие границы — часть безопасности терапии. Вот на чём строится наша работа.
          </p>
        </div>

        {/* Банер доверия (кабинет / атмосфера практики) */}
        <div className="mx-auto mt-10 max-w-5xl">
          <GlassCard className="grid grid-cols-1 gap-6 overflow-hidden p-6 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-8 md:p-8">
            <div className="min-w-0">
              <ThemedImage
                src="/images/portrait-office.jpg"
                alt="Евгения Шарыгина в кабинете за работой, на стене — дипломы и сертификаты"
                roundedClass="rounded-[2rem] rounded-tr-[4rem]"
                className="mx-auto aspect-[4/5] max-w-xs"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#C6967B]/15 px-4 py-1.5 text-xs font-medium text-[#9C7259]">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.75} />
                Официальная практика
              </span>
              <h3 className={`${playfair.className} mt-4 text-2xl font-semibold text-[#4A3E3D]`}>
                Кабинет, документы, системность
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#6B5B58] md:text-base">
                Работаю официально: профильные дипломы, регулярная супервизия и повышение
                квалификации. Встречи проходят очно в кабинете или онлайн — но всегда в рамках
                чёткого терапевтического контракта.
              </p>
            </div>
          </GlassCard>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rules.map(({ icon: Icon, title, text }) => (
            <GlassCard key={title} className="p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#4A3E3D]/8">
                <Icon className="h-5 w-5 text-[#4A3E3D]" strokeWidth={1.75} />
              </span>
              <h3 className={`${playfair.className} mt-4 text-lg font-semibold text-[#4A3E3D]`}>
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B5B58]">{text}</p>
            </GlassCard>
          ))}
        </div>
      </section>

{/* ---------------------------------------------------------------- */}
      {/* PRICING                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section id="prices" className="relative px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-7xl text-center">
          <SectionEyebrow>Инвестиция в себя</SectionEyebrow>
          <h2 className={`${playfair.className} mt-5 text-3xl font-semibold text-[#4A3E3D] sm:text-4xl`}>
            Стоимость сессии
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B5B58] md:text-lg">
            В уютном кабинете или онлайн — формат встречи выбираете вы.
          </p>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {pricingCards.map((card) => (
            <PricingCard key={`${card.type}-${card.duration}`} {...card} />
          ))}
        </div>
      </section>

      <SectionDivider className="mb-6" />

      {/* ---------------------------------------------------------------- */}
      {/* BOOKING FORM                                                    */}
      {/* ---------------------------------------------------------------- */}
      <section id="booking" className="relative px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow>Первый шаг</SectionEyebrow>
          <h2 className={`${playfair.className} mt-5 text-3xl font-semibold text-[#4A3E3D] sm:text-4xl`}>
            Запись на консультацию
          </h2>
          <p className="mt-4 text-base text-[#6B5B58] md:text-lg">
            Заполните форму, чтобы записаться
          </p>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[#9C7259]">
            Вы оставляете заявку → подбираем время → знакомимся на 1-й сессии.
          </p>
        </div>

        <GlassCard className="mx-auto mt-10 max-w-3xl p-6 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-10 text-center">
              <CheckCircle2 className="h-12 w-12" style={{ color: GREEN }} strokeWidth={1.5} />
              <h3 className={`${playfair.className} text-2xl font-semibold text-[#4A3E3D]`}>
                Спасибо, заявка отправлена
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-[#6B5B58]">
                Я свяжусь с вами в ближайшее время, чтобы подобрать удобный слот для первой
                встречи.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Name */}
                <div className="relative">
                  <User className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C6967B]" strokeWidth={1.75} />
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ваше имя"
                    className="w-full rounded-full border border-white/80 bg-white/70 px-12 py-3 text-sm text-[#4A3E3D] placeholder:text-[#9C8C89] outline-none transition-shadow focus:ring-2 focus:ring-[#C6967B]"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C6967B]" strokeWidth={1.75} />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Телефон или Telegram"
                    className="w-full rounded-full border border-white/80 bg-white/70 px-12 py-3 text-sm text-[#4A3E3D] placeholder:text-[#9C8C89] outline-none transition-shadow focus:ring-2 focus:ring-[#C6967B]"
                  />
                </div>

                {/* Preferred time */}
                <div className="relative">
                  <Calendar className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C6967B]" strokeWidth={1.75} />
                  <select
                    name="time"
                    required
                    value={form.time}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-full border border-white/80 bg-white/70 px-12 py-3 text-sm text-[#4A3E3D] outline-none transition-shadow focus:ring-2 focus:ring-[#C6967B]"
                  >
                    <option value="" disabled>
                      Удобное время
                    </option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9C8C89]" strokeWidth={1.75} />
                </div>

                {/* Topic */}
                <div className="relative">
                  <MessageSquare className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C6967B]" strokeWidth={1.75} />
                  <input
                    type="text"
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    placeholder="Тема запроса"
                    className="w-full rounded-full border border-white/80 bg-white/70 px-12 py-3 text-sm text-[#4A3E3D] placeholder:text-[#9C8C89] outline-none transition-shadow focus:ring-2 focus:ring-[#C6967B]"
                  />
                </div>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full px-10 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg md:text-base"
                  style={{ backgroundColor: GREEN }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN_DARK)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
                >
                  Записаться
                  <Send className="h-4 w-4" strokeWidth={2} />
                </button>
              </div>
            </form>
          )}
        </GlassCard>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                          */}
      {/* ---------------------------------------------------------------- */}
      <footer className="relative border-t border-white/40 bg-white/40 px-6 py-10 backdrop-blur-sm md:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <span className={`${playfair.className} text-lg font-semibold text-[#4A3E3D]`}>
              Евгения Шарыгина
            </span>
            <span className="text-sm text-[#6B5B58]">Практикующий психолог, психотерапевт</span>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <a
              href="tel:+79161782822"
              className="inline-flex items-center gap-2 text-sm text-[#4A3E3D] transition-colors"
            >
              <Phone className="h-4 w-4" style={{ color: GREEN }} strokeWidth={1.75} />
              +7 (916) 178-28-22
            </a>
            <a
              href="https://t.me/sharygina_psy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#4A3E3D] transition-colors"
            >
              <Send className="h-4 w-4" style={{ color: GREEN }} strokeWidth={1.75} />
              Telegram
            </a>
            <a
              href="mailto:hello@sharygina.ru"
              className="inline-flex items-center gap-2 text-sm text-[#4A3E3D] transition-colors"
            >
              <MapPin className="h-4 w-4" style={{ color: GREEN }} strokeWidth={1.75} />
              Онлайн / очно, Москва
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/70 text-[#4A3E3D] shadow-sm transition-colors hover:text-white"
            style={{ '--hover-bg': GREEN } as React.CSSProperties}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GREEN)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
            aria-label="Наверх"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>

        <p className="mx-auto mt-8 max-w-7xl text-center text-xs text-[#9C8C89]">
          © 2026 Евгения Шарыгина. Все права защищены.
        </p>
      </footer>
    </div>
  );
}