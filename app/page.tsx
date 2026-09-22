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
  X,
  GraduationCap,
  Activity, 
  Flame, 
  Apple, 
  Puzzle 

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
 * Основной цвет действия (CTA, аватар, акценты бренда) - приглушённый,
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
  { href: '#education', label: 'Образование' },
  { href: '#rules', label: 'Правила' },
  { href: '#prices', label: 'Стоимость' },
  { href: '#booking', label: 'Контакты' },
];

/** Три ключевые метрики hero - отдельные карточки с иконкой. */
const heroStats = [
  { icon: Clock, value: '11 000+', label: 'проведённых сессий' },
  { icon: Calendar, value: '12+ лет', label: 'частной практики' },
  { icon: Users, value: 'Мультимодальный', label: 'подход' },
  { icon: Heart, value: '300+ часов', label: 'личной терапии' }
];

const forMePoints = [
  'Устали от быстрых советов и хотите разобраться глубже',
  'Замечаете, что попадаете в один и тот же сценарий - в отношениях или карьере',
  'Переживаете жизненный переход: развод, потерю, новый этап',
  'Тело сигналит о проблеме - соматика, хроническое напряжение, усталость',
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
    text: 'Страх быть собой, неуверенность, тревога, низкая самооценка - работа с внутренним критиком и стыдом. Чувство вины за отказы, зависимость от чужой оценки, трудности с принятием решений - возвращение внутренней опоры.',
  },
  {
    icon: PersonStanding,
    title: 'Повторяющиеся сценарии',
    text: 'Повторяющиеся конфликты в отношениях,эмоциональная зависимость, трудности с границами, повторяющиеся ошибки в карьере - исследование бессознательных паттернов и их трансформация.',
  },
  {
    icon: Compass,
    title: 'Жизненные переходы',
    text: 'Развод, потеря, смена профессии, кризис среднего возраста - сопровождение в точках, где старое уже не работает.',
  },
  {
    icon: Activity,
    title: 'Тревога и внутреннее напряжение',
    text: 'Работа с фоновой тревогой, ожиданием худшего и гиперконтролем. Поиск причин эмоционального напряжения, распутывание узлов тревожности и формирование чувства устойчивости внутри себя.',
  },
  {
    icon: Flame,
    title: 'Сложные и "запретные эмоции"',
    text: 'Проживание гнева, зависти, стыда без разрушения себя и отношений. Проработка контакта со своими истинными реакциями. Легализация "неудобных" эмоций и освобождение от постоянного внутреннего контроля и самокритики.',
  },
  {
    icon: Apple,
    title: 'Отношения с телом и едой',
    text: 'Глубинное самоисследование связи пищевого поведения и психики. Работа с тревогой, стыдом, самокритикой, перфекционизмом и внутренним контролем. Освобождение от "войны с телом" и формирование здорового контакта с собой.',
  },
  {
    icon: Puzzle,
    title: 'Контакт с собой и скрытыми частями личности',
    text: 'Работа с вытесненными частями личности, внутренними конфликтами и противоречиями. Освобождение от внутренних запретов и ограничений, формирование целостного контакта с собой.',
  },
];

const rules = [
  {
    icon: Clock,
    title: 'Длительность сессии',
    text: '60 минут. 50 минут - оптимальное время для глубокой и бережной работы без потери фокуса. \n10 минут - подведение итогов работы, домашнее задание по желанию.',
  },
  {
    icon: RefreshCcw,
    title: 'Регулярность',
    text: 'Еженедельные встречи в одно и то же время. Именно ритм делает терапию эффективной.',
  },
  {
    icon: Video,
    title: 'Формат',
    text: 'Онлайн по видеосвязи или очно в кабинете - выбираете вы, формат можно менять.',
  },
  {
    icon: ShieldCheck,
    title: 'Конфиденциальность',
    text: 'Всё, что происходит на сессиях, остаётся строго между нами. Это основа доверия.',
  },
  {
    icon: AlertCircle,
    title: 'Отмена и перенос',
    text: 'Предупреждайте об отмене минимум за 24 часа - иначе сессия оплачивается полностью.',
  },
  {
    icon: User,
    title: 'Супервизия случаев',
    text: 'Я регулярно прохожу супервизию, что гарантирует высокое качество работы и профессиональную поддержку в сложных случаях. Все случаи обсуждаются строго анонимно с изменением всех личных данных клиента.',
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

// Разместите этот объект вверху файла (вне компонента страницы)
const LEGAL_DOCS_CONTENT = {
  privacy: (
    <>
      <div className="prose max-w-3xl mx-auto p-6 text-gray-800 leading-relaxed">
        <h1 className="text-2xl font-bold mb-6">Политика в отношении обработки персональных данных</h1>
        <p className="text-sm text-gray-500 mb-6">Дата публикации: 2026 год</p>

        <p className="mb-4">
          <strong>1. Общие положения</strong><br />
          1.1. Настоящая Политика в отношении обработки персональных данных (далее - Политика) определена в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и действует в отношении всей информации, которую сайт <strong>https://psychologysharygina.ru/</strong> (далее - Сайт) может получить о Пользователе при заполнении веб-форм или использовании сервисов Сайта.
        </p>
        <p className="mb-4">
          1.2. Оператором персональных данных является: <strong>ИП Шарыгина Евгения Александровна</strong> (ИНН: 772402407266, [ОГРНИП / Статус плательщика НПД (самозанятый)]), e-mail: ginitolk@mail.ru.
        </p>
        <p className="mb-4">
          1.3. Отправка заявки через форму «Запись на консультацию», а также использование Сайта означает полное и безоговорочное согласие Пользователя с настоящей Политикой.
        </p>

        <p className="mb-4">
          <strong>2. Категории обрабатываемых данных</strong><br />
          2.1. Оператор обрабатывает персональные данные, добровольно вводимые Пользователем в форму «Запись на консультацию» на Сайте:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Имя Пользователя;</li>
          <li>Номер контактного телефона и/или никнейм/аккаунт в мессенджере Telegram;</li>
          <li>Предпочитаемое время оказания услуг;</li>
          <li>Тема запроса (краткая информация о цели обращения).</li>
        </ul>
        <p className="mb-4">
          2.2. На Сайте осуществляется сбор и обработка обезличенных данных о посетителях (файлы cookie, IP-адрес, данные об устройстве и браузере) с помощью сервисов веб-аналитики (например, Яндекс.Метрика).
        </p>

        <p className="mb-4">
          <strong>3. Цели обработки данных</strong><br />
          3.1. Прием и обработка заявки Пользователя на запись к психологу, подбор времени проведения консультации.<br />
          3.2. Установление обратной связи с Пользователем (по телефону или через Telegram) для подтверждения записи и оказания психологических услуг.<br />
          3.3. Обеспечение корректной работы Сайта и анализ его посещаемости.
        </p>

        <p className="mb-4">
          <strong>4. Порядок и условия обработки персональных данных</strong><br />
          4.1. Обработка персональных данных осуществляется с соблюдением принципов законности, конфиденциальности и безопасности, предусмотренных ФЗ № 152-ФЗ.<br />
          4.2. Оператор принимает необходимые организационные и технические меры для защиты персональных данных Пользователя от неправомерного или случайного доступа.<br />
          4.3. Персональные данные Пользователя (включая темы обращений) являются строго конфиденциальными и не передаются третьим лицам, за исключением случаев, прямо предусмотренных законодательством РФ.<br />
          4.4. Хранение и первичная обработка персональных данных граждан РФ осуществляются на серверах, расположенных на территории Российской Федерации.
        </p>

        <p className="mb-4">
          <strong>5. Использование файлов Cookie</strong><br />
          5.1. Сайт использует файлы cookie для корректной работы и анализа трафика. Пользователь может отключить сохранение cookie в настройках своего веб-браузера.
        </p>

        <p className="mb-4">
          <strong>6. Права Пользователя и контакты</strong><br />
          6.1. Пользователь вправе отозвать согласие на обработку персональных данных или направить запрос на их уточнение/удаление по электронной почте Оператора: <strong>[E-mail]</strong>.
        </p>
      </div>
    </>
  ),
  offer: (
    <>
      <div className="prose max-w-3xl mx-auto p-6 text-gray-800 leading-relaxed">
        <h1 className="text-2xl font-bold mb-6">Публичная оферта на оказание психологических услуг</h1>
        <p className="text-sm text-gray-500 mb-6">Дата публикации: 2026 год</p>

        <p className="mb-4">
          <strong>1. Общие положения</strong><br />
          1.1. Настоящий документ является официальным предложением (публичной офертой) <strong>Шарыгина Евгения Александровна</strong> (ИНН: 772402407266, далее - Исполнитель) и содержит все существенные условия договора оказания психологических консультационных услуг физическим лицам (далее - Заказчик).<br />
          1.2. В соответствии с п. 2 ст. 437 Гражданского кодекса РФ (ГК РФ) отправка заявки через форму «Запись на консультацию» на сайте и/или оплата услуг является акцептом настоящей Оферты.<br />
          1.3. Акцепт оферты равносилен заключению Договора на условиях, изложенных в настоящем документе.
        </p>

        <p className="mb-4">
          <strong>2. Предмет договора</strong><br />
          2.1. Исполнитель обязуется оказать Заказчику психологические консультационные услуги (в форме индивидуальных онлайн- или очных сессий), а Заказчик обязуется оплатить эти услуги.<br />
          2.2. Психологическая помощь не является медицинской услугой, не включает в себя назначение лекарственных препаратов и диагностику психических расстройств.
        </p>

        <p className="mb-4">
          <strong>3. Порядок предоставления услуг и правило 24 часов</strong><br />
          3.1. Заказчик оставляет заявку через форму на Сайте <strong>https://psychologysharygina.ru/</strong>, указывая имя, данные для связи (телефон/Telegram), удобное время и тему обращения.<br />
          3.2. Исполнитель связывается с Заказчиком для окончательного утверждения даты и времени проведения сессии.<br />
          3.3. Перенос или отмена консультации Заказчиком без потери оплаты возможны <strong>не менее чем за 24 часа</strong> до согласованного времени сессии.<br />
          3.4. Если Заказчик отменяет или переносит консультацию менее чем за 24 часа, либо не появляется на сессии в назначенное время, денежные средства не возвращаются (удерживаются в качестве компенсации за забронированное время Исполнителя).<br />
          3.5. В случае опоздания Заказчика время консультации не продлевается.
        </p>

        <p className="mb-4">
          <strong>4. Конфиденциальность</strong><br />
          4.1. Вся информация, указанная в форме заявки (включая тему запроса) и полученная в ходе консультаций, является строго конфиденциальной и не подлежит разглашению третьим лицам, за исключением случаев, прямо предусмотренных законодательством РФ.
        </p>

        <p className="mb-4">
          <strong>5. Стоимость услуг и порядок расчетов</strong><br />
          5.1. Стоимость услуг указана на Сайте в разделе «Стоимость».<br />
          5.2. Оплата производится путем безналичного перевода до начала оказания услуг (100% предоплата, если иное не согласовано индивидуально). Исполнитель предоставляет Заказчику электронный чек.
        </p>

        <p className="mb-4">
          <strong>6. Реквизиты Исполнителя</strong><br />
          Исполнитель: <strong>Шарыгина Евгения Александровна</strong><br />
          ИНН: 772402407266<br />
          Статус: [ИП / Плательщик НПД (самозанятый)]<br />
          E-mail: ginitolk@mail.ru<br />
          Телефон: +7 (916) 178-2822
        </p>
      </div>
    </>
  ),
  consent: (
    <>
      <div className="prose max-w-3xl mx-auto p-6 text-gray-800 leading-relaxed">
        <h1 className="text-2xl font-bold mb-6">Согласие на обработку персональных данных</h1>

        <p className="mb-4">
          Настоящим я, заполняя форму «Запись на консультацию» на сайте <strong>https://psychologysharygina.ru/</strong>, действуя своей волей и в своем интересе, выражаю свое согласие <strong>Шарыгина Евгения Александровна</strong> (ИНН: 772402407266, e-mail: ginitolk@mail.ru, далее - Оператор) на обработку моих персональных данных на следующих условиях:
        </p>

        <p className="mb-4">
          <strong>1. Перечень обрабатываемых персональных данных:</strong>
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Имя;</li>
          <li>Номер контактного телефона;</li>
          <li>Аккаунт/никнейм в мессенджере Telegram;</li>
          <li>Предпочтения по времени проведения сессий;</li>
          <li>Краткое описание темы запроса (цели обращения);</li>
          <li>Пользовательские данные (файлы cookie, IP-адрес, данные об устройстве).</li>
        </ul>

        <p className="mb-4">
          <strong>2. Цели обработки персональных данных:</strong>
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Прием и обработка моей заявки на запись к психологу;</li>
          <li>Связь со мной по указанному номеру телефона или через Telegram для согласования даты, времени и условий проведения консультации;</li>
          <li>Заключение и исполнение договора оказания психологических услуг (Публичной оферты).</li>
        </ul>

        <p className="mb-4">
          <strong>3. Перечень действий с персональными данными:</strong><br />
          Сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, обезличивание, блокирование, удаление и уничтожение персональных данных (как с использованием средств автоматизации, так и без них).
        </p>

        <p className="mb-4">
          <strong>4. Срок действия и порядок отзыва:</strong><br />
          Настоящее согласие действует с момента отправки формы на Сайте и до момента достижения целей обработки или отзыва Согласия. Согласие может быть отозвано в любой момент путем направления письменного заявления на электронную почту Оператора: <strong>ginitolk@mail.ru</strong>.
        </p>
      </div>
    </>
  ),
}

const timeSlots = [
  'Утро (9:00–12:00)',
  'День (12:00–16:00)',
  'Вечер (16:00–20:00)',
  'Подберём вместе',
];

const diplomaImages = Array.from({ length: 10 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return {
    src: `/images/docs/${num}_diplom.jpg`,
    alt: `Диплом или сертификат ${i + 1}`,
  };
});

/* -------------------------------------------------------------------------- */
/*                             SMALL UI HELPERS                             */
/* -------------------------------------------------------------------------- */

/**
 * Орнаментальный разделитель между секциями - золотистая волнистая линия.
 */
function SectionDivider({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none mx-auto flex w-full max-w-3xl items-center justify-center px-6 py-4 md:max-w-4xl md:py-6 ${className}`}
    >
      <img
        src="/images/separators/separator_3.png"
        alt=""
        className="h-auto w-full object-contain"
      />
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



function DiplomaCarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxSrc(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxSrc]);

  return (
    <>
      <div className="-mx-6 mt-10 px-6 md:-mx-10 md:px-10">
        <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {images.map(({ src, alt }) => (
            <button
              key={src}
              type="button"
              onClick={() => setLightboxSrc(src)}
              className="group snap-start flex-shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/60 bg-white/60 shadow-sm backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6967B]"
            >
              <img
                src={src}
                alt={alt}
                className="h-52 w-auto max-w-none object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-60"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#4A3E3D]/75 p-4 backdrop-blur-sm"
          onClick={() => setLightboxSrc(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр документа"
        >
          <button
            type="button"
            onClick={() => setLightboxSrc(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/90 text-[#4A3E3D] shadow-md transition-colors hover:bg-white md:right-8 md:top-8"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
          <img
            src={lightboxSrc}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] max-w-[min(92vw,900px)] rounded-3xl border border-white/40 object-contain shadow-2xl"
          />
        </div>
      )}
    </>
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
  const [agreed, setAgreed] = useState(false);

  /**
   * Header: фиксированный (не sticky) и всегда виден при прокрутке.
   * `scrolled` включает более плотный "liquid glass" (сильнее блюр,
   * насыщенность и заметная кромка) после начала скролла - на самом верху
   * страницы стекло почти прозрачное, при скролле "оживает" и уплотняется.
   */

  // Внутри функции компонента:
  const [activeDoc, setActiveDoc] = useState<'privacy' | 'offer' | 'consent' | null>(null)
  const [scrolled, setScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!agreed || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Произошла ошибка при отправке заявки. Попробуйте еще раз.');
      }
    } catch (error) {
      console.error('Booking submission error:', error);
      alert('Не удалось отправить заявку. Проверьте подключение к интернету.');
    } finally {
      setIsSubmitting(false);
    }
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
      {/* HEADER - fixed, liquid glass                                    */}
      {/* ---------------------------------------------------------------- */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
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
              <span className="truncate text-xs text-[#8C7A76]">Психотерапевт</span>
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
          {/* Левая колонка - текст (на мобильных становится второй) */}
          <div className="relative z-10 flex min-w-0 flex-col justify-center order-2 lg:order-1">
            {/* бейдж */}
            <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm text-[#4A3E3D] shadow-sm backdrop-blur-sm">
              <span className="h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: GREEN }} />
              Онлайн и очные консультации в Москве
            </span>

            <h1 className={`${playfair.className} text-3xl font-semibold leading-tight text-[#4A3E3D] sm:text-4xl md:text-5xl md:leading-[1.15]`}>
              Евгения Шарыгина -<br className="hidden sm:block" /> практикующий психолог и психотерапевт
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#6B5B58] md:text-lg">
              Создаю безопасное пространство для глубинной работы, изменения жизненных сценариев и встречи с собой.
            </p>

            {/* метрики */}
            <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-2">
              {heroStats.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/70 px-4 py-3.5 shadow-sm backdrop-blur-sm"
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

            {/* CTA */}
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

          {/* Правая колонка - фото (на мобильных становится первой) */}
          <div className="relative z-10 min-w-0 order-1 lg:order-2">
            <div className="relative h-full w-full min-h-[300px] lg:min-h-[560px] max-h-[60vh] lg:max-h-none">
              <ThemedImage
                src="/images/portrait-hero.jpg"
                alt="Евгения Шарыгина - психолог, психотерапевт, в кабинете"
                roundedClass="rounded-3xl"
                className="h-full w-full object-cover"
                filterClass="contrast-[1.03] brightness-[1.02] saturate-[1.05]"
                vignetteOpacity="opacity-10"
              />
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ---------------------------------------------------------------- */}
      {/* ABOUT & APPROACH                                                */}
      {/* ---------------------------------------------------------------- */}
      <section id="about" className="relative px-6 py-16 md:px-10 md:py-24">
        <Blob className="right-[5%] top-[10%] h-72 w-72 bg-[#C6967B]/15" />

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
          {/* Portrait */}
          <div className="relative order-1 min-w-0">
            <div className="relative h-full min-h-[380px] w-full lg:min-h-[560px]">
              <ThemedImage
                src="/images/portrait-about.jpg"
                alt="Евгения Шарыгина в кабинете"
                roundedClass="rounded-3xl"
                className="h-full"
                filterClass="contrast-[1.03] brightness-[1.02] saturate-[1.05]"
                vignetteOpacity="opacity-30"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-2 min-w-0">
            <SectionEyebrow>Философия работы</SectionEyebrow>
            <h2 className={`${playfair.className} mt-5 text-3xl font-semibold text-[#4A3E3D] sm:text-4xl`}>
              Обо мне и моём подходе
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#6B5B58] md:text-lg">
              <p>
                Терапия - это сотрудничество двух людей, где нет места иллюзиям и манипуляциям,
                а есть уважение, устойчивость и глубокая проработка.
                Я не подгоняю человека под свои рамки, не навязываю свои ценности и не предлагаю готовые решения.
              </p>
              <p>
                Я подбираю арсенал инструментов под вашу уникальную структуру личности и ваши запросы.
              </p>
              <p>
                Я работаю в парадигме «взрослый - взрослый»: без назидания, без спасательства, на равных.
                Моя задача - не решить вашу проблему вместо вас, а создать пространство, в
                котором вы сможете увидеть себя настоящего и найти собственную опору.
              </p>
            </div>
            <p className="mt-4 text-base leading-relaxed text-[#6B5B58] md:text-lg">
              Мой подход мультимодальный с опорой на психодинамическую терапию,
              ТФП и гештальт-подход с применением когнитивно-поведенческих инструментов.
              За 20 лет в профессии и более 11 000 сессий я убедилась: устойчивые изменения рождаются не из советов, а из честной встречи с собой.
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

      <SectionDivider />

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

      <SectionDivider />

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

      <SectionDivider />

      {/* ---------------------------------------------------------------- */}
      {/* EDUCATION                                                       */}
      {/* ---------------------------------------------------------------- */}
      <section id="education" className="relative px-6 py-16 md:px-10 md:py-24">
        <Blob className="right-[10%] top-[20%] h-64 w-64 bg-[#C6967B]/10" />

        <div className="mx-auto max-w-7xl text-center">
          <SectionEyebrow>
            <GraduationCap className="h-3.5 w-3.5" strokeWidth={1.75} />
            Квалификация
          </SectionEyebrow>
          <h2 className={`${playfair.className} mt-5 text-3xl font-semibold text-[#4A3E3D] sm:text-4xl`}>
            Образование
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-[#6B5B58] md:text-lg">
            Дипломы и сертификаты
          </p>
        </div>

        <div className="mx-auto max-w-7xl">
          <DiplomaCarousel images={diplomaImages} />
        </div>
      </section>

      <SectionDivider />

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
            Чёткие границы - часть безопасности терапии. Вот на чём строится наша работа.
          </p>
        </div>

        {/* Банер доверия (кабинет / атмосфера практики) */}
        <div className="mx-auto mt-10 max-w-5xl">
          <GlassCard className="grid grid-cols-1 gap-6 overflow-hidden p-6 md:grid-cols-[1fr_1.3fr] md:items-center md:gap-8 md:p-8">
            <div className="min-w-0">
              <ThemedImage
                src="/images/portrait-office.jpg"
                alt="Евгения Шарыгина в кабинете за работой, на стене - дипломы и сертификаты"
                roundedClass="rounded-[2rem] rounded-tr-[4rem]"
                className="mx-auto aspect-[4/5] max-w-xs"
                vignetteOpacity="opacity-10"
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
                Работаю официально: прозрачные чеки после каждой сессии, профильные дипломы, регулярная супервизия и повышение
                квалификации. Встречи проходят очно в кабинете или онлайн - но всегда в рамках
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
              {/* Добавлен класс whitespace-pre-line */}
              <p className="mt-2 text-sm leading-relaxed text-[#6B5B58] whitespace-pre-line">
                {text}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      <SectionDivider />

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
            В уютном кабинете или онлайн - формат встречи выбираете вы.
          </p>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {pricingCards.map((card) => (
            <PricingCard key={`${card.type}-${card.duration}`} {...card} />
          ))}
        </div>
      </section>

      <SectionDivider />

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

              {/* Checkbox: Consent & Policies */}
              <div className="flex items-start gap-3 px-2 pt-1 text-left">
                <input
                  type="checkbox"
                  id="agreed"
                  name="agreed"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#C6967B] focus:ring-[#C6967B]"
                />
                <label htmlFor="agreed" className="text-xs leading-relaxed text-[#6B5B58] select-none">
                  Я даю{' '}
                  <button
                    type="button"
                    onClick={() => setActiveDoc('consent')}
                    className="font-medium underline transition-colors hover:text-[#C6967B]"
                  >
                    Согласие на обработку данных
                  </button>
                  , а также принимаю условия{' '}
                  <button
                    type="button"
                    onClick={() => setActiveDoc('privacy')}
                    className="font-medium underline transition-colors hover:text-[#C6967B]"
                  >
                    Политики конфиденциальности
                  </button>{' '}
                  и{' '}
                  <button
                    type="button"
                    onClick={() => setActiveDoc('offer')}
                    className="font-medium underline transition-colors hover:text-[#C6967B]"
                  >
                    Публичной оферты
                  </button>
                  .
                </label>
              </div>

              {/* Submit button */}
              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={!agreed}
                  className={`inline-flex items-center gap-2 rounded-full px-10 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-300 md:text-base ${!agreed
                    ? 'cursor-not-allowed opacity-50'
                    : 'hover:shadow-lg'
                    }`}
                  style={{ backgroundColor: agreed ? GREEN : '#9C8C89' }}
                  onMouseEnter={(e) => {
                    if (agreed) e.currentTarget.style.backgroundColor = GREEN_DARK;
                  }}
                  onMouseLeave={(e) => {
                    if (agreed) e.currentTarget.style.backgroundColor = GREEN;
                  }}
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
      {/* CONTACTS SECTION                                                */}
      {/* ---------------------------------------------------------------- */}
      <section id="contacts" className="relative px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <SectionEyebrow>Свяжитесь со мной</SectionEyebrow>
          <h2 className={`${playfair.className} mt-5 text-3xl font-semibold text-[#4A3E3D] sm:text-4xl`}>
            Контакты
          </h2>
          <p className="mt-4 text-base text-[#6B5B58] md:text-lg">
            Буду рада ответить на ваши вопросы
          </p>
        </div>

        <GlassCard className="mx-auto mt-10 max-w-5xl p-6 md:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

            {/* Левая колонка (Контакты) */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Адрес */}
              <a
                href="https://yandex.ru/maps/?text=Москва, Измайловское шоссе, 71к4Г-Д"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/50 p-4 transition-all hover:bg-white/80"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#F0E4D3]">
                  <MapPin className="h-5 w-5 text-[#4A3E3D]" strokeWidth={1.75} />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-[#8C7A76]">Адрес кабинета</span>
                  <span className="text-sm font-semibold text-[#4A3E3D] leading-tight">
                    м. Партизанская, <br />Измайловское шоссе, 71к4Г-Д
                  </span>
                </div>
              </a>

              {/* Телефон */}
              <a
                href="tel:+79161782822"
                className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/50 p-4 transition-all hover:bg-white/80"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#F0E4D3]">
                  <Phone className="h-5 w-5 text-[#4A3E3D]" strokeWidth={1.75} />
                </span>
                <div className="flex flex-1 flex-col">
                  <span className="text-xs text-[#8C7A76]">Телефон</span>
                  {/* БЫЛО: text-base, СТАЛО: text-sm */}
                  <span className="whitespace-nowrap text-sm font-semibold text-[#4A3E3D]">
                    +7 (916) 178-28-22
                  </span>
                </div>
              </a>

              {/* Telegram (личный) */}
              <a
                href="https://t.me/Psy_Sharygina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/50 p-4 transition-all hover:bg-white/80"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#F0E4D3]">
                  <Send className="h-5 w-5 text-[#4A3E3D]" strokeWidth={1.75} />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-[#8C7A76]">Telegram</span>
                  <span className="text-base font-semibold text-[#4A3E3D]">Написать в Telegram</span>
                </div>
              </a>

              {/* Telegram (канал) */}
              <a
                href="https://t.me/PsySharygina"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-white/60 bg-white/50 p-4 transition-all hover:bg-white/80"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#F0E4D3]">
                  <Send className="h-5 w-5 text-[#4A3E3D]" strokeWidth={1.75} />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs text-[#8C7A76]">Telegram-канал</span>
                  <span className="text-base font-semibold text-[#4A3E3D]">Читать канал</span>
                </div>
              </a>
            </div>

            {/* Правая колонка (Карта) */}
            <div className="overflow-hidden rounded-3xl border border-white/80 shadow-sm backdrop-blur-sm min-h-[350px]">
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.747830%2C55.791338&z=16&pt=37.747830,55.791338,pm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                allowFullScreen={true}
                className="w-full h-full grayscale-[0.2] contrast-[1.05]"
                title="Кабинет на карте"
              />
            </div>
          </div>
        </GlassCard>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* FOOTER                                                          */}
      {/* ---------------------------------------------------------------- */}
      <footer className="relative border-t border-white/40 bg-white/40 px-6 py-10 backdrop-blur-sm md:px-10">
        <div className="mx-auto max-w-7xl text-center text-sm text-[#6B5B58]">
          {/* Основная информация и реквизиты */}
          <div className="space-y-1.5">
            <p className="font-semibold text-[#4A3E3D]">Психолог Евгения Шарыгина</p>
            <p className="text-xs text-[#8C7A76]">
              ИП Шарыгина Евгения Александровна | ИНН: 772402407266 | Самозанятая (Плательщик НПД)
            </p>
            <p className="text-xs text-[#8C7A76]">
              Email для связи:{''}
              <a
                href="mailto:ginitolk@mail.ru"
                className="underline transition-colors hover:text-[#4A3E3D]"
              >
                ginitolk@mail.ru
              </a>{' '}
              | Тел:{' '}
              <a
                href="tel:+79161782822"
                className="underline transition-colors hover:text-[#4A3E3D]"
              >
                +7 (916) 178-28-22
              </a>
            </p>
          </div>

          {/* Ссылки на документы */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium text-[#4A3E3D]">
            <button
              type="button"
              onClick={() => setActiveDoc('privacy')}
              className="transition-colors hover:text-[#C6967B] hover:underline"
            >
              Политика конфиденциальности
            </button>
            <span className="text-[#C6967B]">•</span>
            <button
              type="button"
              onClick={() => setActiveDoc('offer')}
              className="transition-colors hover:text-[#C6967B] hover:underline"
            >
              Публичная оферта
            </button>
            <span className="text-[#C6967B]">•</span>
            <button
              type="button"
              onClick={() => setActiveDoc('consent')}
              className="transition-colors hover:text-[#C6967B] hover:underline"
            >
              Согласие на обработку данных
            </button>
          </div>

          {/* Копирайт */}
          <p className="mt-6 text-xs text-[#8C7A76]">
            © 2026 psychologysharygina.ru. Все права защищены.
          </p>
        </div>
      </footer>

      {/* ---------------------------------------------------------------- */}
      {/* FULLSCREEN MODAL FOR LEGAL DOCUMENTS                            */}
      {/* ---------------------------------------------------------------- */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#FAF1E2]/95 backdrop-blur-xl animate-in fade-in duration-200">
          {/* Шапка модального окна */}
          <div className="flex items-center justify-between border-b border-[#EAD9CC] px-6 py-4 md:px-10">
            <h3 className={`${playfair.className} text-lg font-semibold text-[#4A3E3D] md:text-xl`}>
              {activeDoc === 'privacy' && 'Политика конфиденциальности'}
              {activeDoc === 'offer' && 'Публичная оферта'}
              {activeDoc === 'consent' && 'Согласие на обработку данных'}
            </h3>
            <button
              type="button"
              onClick={() => setActiveDoc(null)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/60 text-[#4A3E3D] transition-colors hover:bg-white"
              aria-label="Закрыть"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>
          </div>

          {/* Контент модального окна */}
          <div className="mx-auto w-full max-w-4xl flex-1 overflow-y-auto px-6 py-8 md:px-10">
            <div className="rounded-3xl border border-white/80 bg-white/70 p-6 shadow-sm backdrop-blur-sm md:p-10">
              <h1 className={`${playfair.className} mb-6 text-2xl font-bold text-[#4A3E3D] md:text-3xl`}>
                {activeDoc === 'privacy' && 'Политика конфиденциальности'}
                {activeDoc === 'offer' && 'Публичная оферта'}
                {activeDoc === 'consent' && 'Согласие на обработку персональных данных'}
              </h1>
              <div className="space-y-4 text-base leading-relaxed text-[#6B5B58]">
                {activeDoc && LEGAL_DOCS_CONTENT[activeDoc]}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}