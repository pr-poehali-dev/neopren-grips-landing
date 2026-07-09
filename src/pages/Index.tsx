import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const GRIPS = [
  {
    id: 1,
    color: "Чёрно-синие",
    label: "BLACK / BLUE",
    img: "https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/e37666a0-525c-423c-bc3a-7dea36faddb9.jpg",
    accent: "#2d7de8",
    accentDim: "rgba(45,125,232,0.12)",
    badge: "ХИТ",
    badgeBg: "#2d7de8",
    badgeText: "#fff",
    desc: "Самый популярный цвет в линейке AdduS. Городской и трейловый стиль для велосипедов, самокатов и детского транспорта.",
  },
  {
    id: 2,
    color: "Жёлто-чёрные",
    label: "YELLOW / BLACK",
    img: "https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/5aceab7e-ffbb-46c5-a6cd-c99e55ed3ab8.jpg",
    accent: "#f5c800",
    accentDim: "rgba(245,200,0,0.12)",
    badge: "СПОРТ",
    badgeBg: "#f5c800",
    badgeText: "#111",
    desc: "Яркий спортивный характер и максимальная видимость. Популярен среди MTB, турников и тренажёров.",
  },
  {
    id: 3,
    color: "Чёрно-красные",
    label: "BLACK / RED",
    img: "https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/99917045-e123-4e71-b0ed-a10b56d34589.jpg",
    accent: "#e8334a",
    accentDim: "rgba(232,51,74,0.12)",
    badge: "КЛАССИКА",
    badgeBg: "#e8334a",
    badgeText: "#fff",
    desc: "Проверенная классика AdduS. Агрессивный стиль, стабильный спрос во всех сегментах.",
  },
  {
    id: 4,
    color: "Серо-чёрные",
    label: "GREY / BLACK",
    img: "https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/1397c896-f4f6-483e-92f5-168eeb72aadc.jpg",
    accent: "#a0a8b0",
    accentDim: "rgba(160,168,176,0.12)",
    badge: "НОВИНКА",
    badgeBg: "#a0a8b0",
    badgeText: "#111",
    desc: "Новинка в линейке AdduS. Нейтральный универсальный цвет для садового инвентаря и профессиональных тренажёров.",
  },
];

const SPECS = [
  { icon: "Ruler", label: "Длина", value: "22 см" },
  { icon: "Circle", label: "Внешний диаметр", value: "3,2 см" },
  { icon: "Package", label: "Упаковка", value: "4 шт / уп." },
  { icon: "Box", label: "Коробка", value: "400 шт (100 уп.)" },
];

const USES = [
  { icon: "Dumbbell", text: "Турники и тренажёры" },
  { icon: "Bike", text: "Велосипедный руль" },
  { icon: "Zap", text: "Самокат" },
  { icon: "Leaf", text: "Садовый инвентарь" },
  { icon: "Baby", text: "Детский транспорт" },
  { icon: "Wrench", text: "Различный инвентарь" },
];

const BOX_SPECS = [
  { icon: "MoveHorizontal", label: "Длина", value: "69 см" },
  { icon: "MoveVertical", label: "Ширина", value: "34 см" },
  { icon: "ArrowUpDown", label: "Высота", value: "45 см" },
  { icon: "Weight", label: "Вес", value: "8,9 кг" },
];

const DELIVERY = [
  { icon: "MapPin", text: "Отправка по г. Москве" },
  { icon: "Truck", text: "Доставка в любой регион России" },
  { icon: "Package", text: 'Транспортная компания «КИТ»' },
  { icon: "Boxes", text: "СДЭК и другие ТК" },
];

const FEATURES = [
  { icon: "Hand", title: "Надёжный хват", desc: "Нескользящий материал препятствует проскальзыванию рук" },
  { icon: "Heart", title: "Не натирает ладони", desc: "Мягкий неопрен снижает нагрузку на кисти" },
  { icon: "Zap", title: "Легко устанавливать", desc: "Надеваются за секунды без инструментов" },
  { icon: "RefreshCw", title: "Легко менять", desc: "Заменяются по мере износа — экономично" },
];

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const COLOR_OPTIONS = [
  { value: "black-blue", label: "Чёрно-синие", accent: "#2d7de8" },
  { value: "yellow-black", label: "Жёлто-чёрные", accent: "#f5c800" },
  { value: "black-red", label: "Чёрно-красные", accent: "#e8334a" },
  { value: "grey-black", label: "Серо-чёрные", accent: "#a0a8b0" },
];

function OrderForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [colors, setColors] = useState<Record<string, number>>({});
  const [sent, setSent] = useState(false);

  const totalBoxes = Object.values(colors).reduce((s, v) => s + v, 0);
  const totalPcs = totalBoxes * 400;

  const toggleColor = (val: string) => {
    setColors(prev => {
      if (prev[val] !== undefined) {
        const next = { ...prev };
        delete next[val];
        return next;
      }
      return { ...prev, [val]: 1 };
    });
  };

  const changeQty = (val: string, delta: number) => {
    setColors(prev => {
      const cur = prev[val] ?? 1;
      const next = Math.max(1, cur + delta);
      return { ...prev, [val]: next };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || totalBoxes === 0) return;

    const lines = COLOR_OPTIONS
      .filter(c => colors[c.value] !== undefined)
      .map(c => `${c.label}: ${colors[c.value]} кор. (${colors[c.value] * 400} шт)`);

    const text = encodeURIComponent(
      `Заявка AdduS\nИмя: ${name}\nТел: ${phone}\n\nЗаказ:\n${lines.join("\n")}\n\nИтого: ${totalBoxes} коробок, ${totalPcs} шт`
    );
    window.open(`https://max.ru/u/f9LHodD0cOIoL8E6ZlJf_S3kPbtwO1E6YBrsuPaZ0JgL35OAgQlNNE6ZRqo?text=${text}`, "_blank");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(232,51,74,0.12)", border: "2px solid #e8334a" }}>
          <Icon name="CheckCircle" size={32} style={{ color: "#e8334a" } as React.CSSProperties} />
        </div>
        <h3 className="font-oswald font-bold text-xl mb-2" style={{ color: "#0d0d18" }}>Заявка отправлена!</h3>
        <p className="text-sm mb-6" style={{ color: "rgba(13,13,24,0.55)" }}>
          Мы свяжемся с вами в течение 30 минут через мессенджер MAX
        </p>
        <button onClick={() => { setSent(false); setName(""); setPhone(""); setColors({}); }}
          className="text-xs tracking-widest uppercase font-medium transition-colors"
          style={{ color: "rgba(13,13,24,0.45)" }}>
          Оформить ещё заявку
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Контакты */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2 font-medium" style={{ color: "rgba(13,13,24,0.55)" }}>
            Ваше имя
          </label>
          <input
            type="text" value={name} onChange={e => setName(e.target.value)}
            placeholder="Иван Иванов" required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{ background: "#f5f6fa", border: "1px solid rgba(13,13,24,0.1)", color: "#0d0d18" }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(232,51,74,0.6)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,24,0.1)")}
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase mb-2 font-medium" style={{ color: "rgba(13,13,24,0.55)" }}>
            Телефон
          </label>
          <input
            type="tel" value={phone} onChange={e => setPhone(e.target.value)}
            placeholder="+7 900 000 00 00" required
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{ background: "#f5f6fa", border: "1px solid rgba(13,13,24,0.1)", color: "#0d0d18" }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(232,51,74,0.6)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(13,13,24,0.1)")}
          />
        </div>
      </div>

      {/* Выбор цвета и количества */}
      <div>
        <label className="block text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: "rgba(13,13,24,0.55)" }}>
          Выберите цвет и количество коробок
        </label>
        <div className="space-y-2">
          {COLOR_OPTIONS.map(c => {
            const selected = colors[c.value] !== undefined;
            return (
              <div key={c.value}
                className="flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer"
                style={{
                  background: selected ? `${c.accent}14` : "#f5f6fa",
                  border: `1px solid ${selected ? c.accent + "70" : "rgba(13,13,24,0.08)"}`,
                }}
                onClick={() => toggleColor(c.value)}>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-all"
                    style={{ background: selected ? c.accent : "#fff", border: `1px solid ${selected ? c.accent : "rgba(13,13,24,0.2)"}` }}>
                    {selected && <Icon name="Check" size={12} style={{ color: c.value === "yellow-black" || c.value === "grey-black" ? "#111" : "#fff" } as React.CSSProperties} />}
                  </div>
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: c.accent }} />
                  <span className="text-sm font-medium" style={{ color: selected ? "#0d0d18" : "rgba(13,13,24,0.65)" }}>{c.label}</span>
                </div>
                {selected && (
                  <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <button type="button" onClick={() => changeQty(c.value, -1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-lg font-bold transition-all"
                      style={{ background: "rgba(13,13,24,0.06)", color: "#0d0d18" }}>−</button>
                    <span className="font-oswald font-bold text-base w-6 text-center" style={{ color: c.accent }}>
                      {colors[c.value]}
                    </span>
                    <button type="button" onClick={() => changeQty(c.value, 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-lg font-bold transition-all"
                      style={{ background: "rgba(13,13,24,0.06)", color: "#0d0d18" }}>+</button>
                    <span className="text-xs ml-1" style={{ color: "rgba(13,13,24,0.4)" }}>кор.</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Итог */}
      {totalBoxes > 0 && (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl"
          style={{ background: "rgba(232,51,74,0.08)", border: "1px solid rgba(232,51,74,0.25)" }}>
          <span className="text-sm" style={{ color: "rgba(13,13,24,0.65)" }}>Итого:</span>
          <div className="text-right">
            <span className="font-oswald font-bold" style={{ color: "#0d0d18" }}>{totalBoxes} {totalBoxes === 1 ? "коробка" : totalBoxes < 5 ? "коробки" : "коробок"}</span>
            <span className="text-xs ml-2" style={{ color: "rgba(13,13,24,0.45)" }}>({totalPcs.toLocaleString("ru")} шт)</span>
          </div>
        </div>
      )}

      {/* Кнопка */}
      <button type="submit"
        disabled={!name || !phone || totalBoxes === 0}
        className="w-full py-4 rounded-xl font-oswald font-bold tracking-wide uppercase text-sm flex items-center justify-center gap-2 transition-all"
        style={{
          background: name && phone && totalBoxes > 0 ? "#e8334a" : "rgba(232,51,74,0.3)",
          color: "#fff",
          boxShadow: name && phone && totalBoxes > 0 ? "0 8px 30px rgba(232,51,74,0.3)" : "none",
          cursor: name && phone && totalBoxes > 0 ? "pointer" : "not-allowed",
        }}>
        <Icon name="Send" size={17} />
        Отправить заявку в MAX
      </button>

      <div className="flex items-center justify-center gap-4 pt-1">
        <a href="mailto:AdduS@internet.ru"
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: "rgba(13,13,24,0.45)" }}>
          <Icon name="Mail" size={13} />
          AdduS@internet.ru
        </a>
        <span style={{ color: "rgba(13,13,24,0.2)" }}>·</span>
        <span className="text-xs" style={{ color: "rgba(13,13,24,0.45)" }}>
          Ответим в течение 30 мин
        </span>
      </div>
    </form>
  );
}

const Index = () => {
  const catalogRef = useRef<HTMLElement>(null);
  const orderRef = useRef<HTMLElement>(null);
  const { ref: specsRef, visible: specsVisible } = useInView();
  const { ref: usesRef, visible: usesVisible } = useInView();
  const { ref: featRef, visible: featVisible } = useInView();
  const { ref: boxRef, visible: boxVisible } = useInView();
  const { ref: catRef, visible: catVisible } = useInView();
  const { ref: ctaRef, visible: ctaVisible } = useInView();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen font-rubik" style={{ background: "#f5f6fa", color: "#0d0d18" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-3"
        style={{ background: "rgba(255,255,255,0.85)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(13,13,24,0.07)" }}>
        <div className="flex items-center gap-3">
          <img src="https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/c65dd462-3864-4ea0-be12-a665879a3039.jpg"
            alt="AdduS" className="h-9 w-9 rounded-lg object-contain" style={{ background: "#fff" }} />
          <span className="font-oswald font-bold text-xl tracking-wide" style={{ color: "#0d0d18" }}>AdduS</span>
        </div>
        <div className="hidden md:flex gap-8">
          {([["Каталог", "catalog"], ["Заказать", "order"]] as [string, string][]).map(([label, id]) => (
            <a key={id} href={`#${id}`}
              className="text-xs tracking-widest uppercase transition-colors"
              style={{ color: "rgba(13,13,24,0.6)" }}>
              {label}
            </a>
          ))}
        </div>
        <button onClick={() => scrollTo(orderRef)} className="btn-neon px-5 py-2 rounded-lg text-xs"
          style={{ background: "#e8334a", color: "#fff" }}>
          Заказать оптом
        </button>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 70% at 65% 50%, rgba(245,200,0,0.08) 0%, transparent 70%)"
        }} />
        <div className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{ right: "5%", top: "15%", background: "radial-gradient(circle, rgba(245,200,0,0.18), transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{ left: "10%", bottom: "20%", background: "radial-gradient(circle, rgba(45,125,232,0.18), transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center w-full py-16">
          {/* Text */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img src="https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/c65dd462-3864-4ea0-be12-a665879a3039.jpg"
                alt="AdduS" className="h-14 w-14 rounded-2xl object-contain" style={{ background: "#fff", padding: 4, boxShadow: "0 4px 20px rgba(13,13,24,0.08)" }} />
              <div>
                <div className="font-oswald font-bold text-2xl tracking-wide" style={{ color: "#0d0d18" }}>AdduS</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(13,13,24,0.5)" }}>Официальный дистрибьютор</div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-medium tracking-widest uppercase"
              style={{ background: "rgba(232,51,74,0.1)", border: "1px solid rgba(232,51,74,0.35)", color: "#e8334a" }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: "#e8334a" }} />
              Оптовые поставки · от 400 шт
            </div>

            <h1 className="font-oswald font-bold mb-4 animate-fade-in-up leading-none"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5.2rem)", lineHeight: 1.0, color: "#0d0d18" }}>
              НЕОПРЕНОВЫЕ<br />
              <span style={{ color: "#e8334a" }}>ГРИПСЫ</span><br />
              <span style={{ color: "rgba(13,13,24,0.4)" }}>ОПТОМ</span>
            </h1>

            <div className="inline-flex items-baseline gap-2 mb-5 animate-fade-in-up delay-200 px-4 py-2 rounded-xl"
              style={{ background: "rgba(232,51,74,0.08)", border: "1px solid rgba(232,51,74,0.3)" }}>
              <span className="font-oswald font-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#e8334a" }}>39 ₽</span>
              <span className="text-sm font-medium" style={{ color: "rgba(13,13,24,0.6)" }}>
                за 1 шт при заказе коробки (400 шт)
              </span>
            </div>

            <p className="text-sm md:text-base leading-relaxed mb-4 animate-fade-in-up delay-200"
              style={{ color: "rgba(13,13,24,0.7)", maxWidth: 500 }}>
              Мягкие ручки из неопрена для <strong style={{ color: "#0d0d18" }}>турников, велосипедов, самокатов</strong> и садового инвентаря.
              Нескользящие, не натирают ладони, снижают нагрузку на кисти.
            </p>
            <p className="text-sm mb-8 animate-fade-in-up delay-300"
              style={{ color: "rgba(13,13,24,0.45)" }}>
              4 расцветки · длина 22 см · Ø 3,2 см · фасовка 4 шт · коробка 400 шт
            </p>

            <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up delay-300">
              <button onClick={() => scrollTo(catalogRef)}
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-oswald font-bold tracking-wide uppercase transition-all"
                style={{ background: "#e8334a", color: "#fff", boxShadow: "0 8px 30px rgba(232,51,74,0.3)" }}>
                <Icon name="ShoppingCart" size={18} />
                Смотреть каталог
              </button>
              <a href="https://max.ru/u/f9LHodD0cOIoL8E6ZlJf_S3kPbtwO1E6YBrsuPaZ0JgL35OAgQlNNE6ZRqo" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium transition-all"
                style={{ border: "1px solid rgba(13,13,24,0.18)", color: "#0d0d18", background: "#fff" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(232,51,74,0.6)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(13,13,24,0.18)")}>
                <Icon name="MessageCircle" size={18} />
                Написать в MAX
              </a>
            </div>

            <div className="flex gap-8 animate-fade-in-up delay-400">
              {[["4", "ЦВЕТА"], ["400 шт", "МИН. ЗАКАЗ"], ["22 см", "ДЛИНА"]].map(([val, lab]) => (
                <div key={lab}>
                  <div className="font-oswald font-bold text-2xl" style={{ color: "#e8334a" }}>{val}</div>
                  <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(13,13,24,0.45)" }}>{lab}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Images mosaic */}
          <div className="animate-float grid grid-cols-2 gap-3">
            {GRIPS.map((g) => (
              <div key={g.id} className="relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: "3/4", boxShadow: `0 12px 40px rgba(13,13,24,0.12), 0 0 0 1px ${g.accent}30` }}>
                <img src={g.img} alt={g.color} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(13,13,24,0.7) 0%, transparent 50%)"
                }} />
                <div className="absolute bottom-3 left-3">
                  <span className="font-oswald text-xs font-semibold tracking-wide" style={{ color: g.accent }}>{g.color}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECS ── */}
      <section ref={specsRef as unknown as React.RefObject<HTMLElement>} className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SPECS.map((s, i) => (
            <div key={s.label}
              className={`p-5 rounded-2xl transition-all duration-700 ${specsVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.08}s`, background: "#fff", border: "1px solid rgba(13,13,24,0.06)", boxShadow: "0 4px 20px rgba(13,13,24,0.04)" }}>
              <Icon name={s.icon as "Ruler"} size={22} className="mb-3" style={{ color: "#2d7de8" } as React.CSSProperties} />
              <div className="font-oswald font-bold text-xl mb-0.5" style={{ color: "#0d0d18" }}>{s.value}</div>
              <div className="text-xs" style={{ color: "rgba(13,13,24,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ПРИМЕНЕНИЕ ── */}
      <section ref={usesRef as unknown as React.RefObject<HTMLElement>} className="py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className={`mb-6 transition-all duration-700 ${usesVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-xs tracking-widest uppercase mb-2 font-medium" style={{ color: "#c99a00" }}>Применение</div>
          <h2 className="font-oswald font-bold text-2xl md:text-3xl" style={{ color: "#0d0d18" }}>ПОДХОДЯТ ДЛЯ</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {USES.map((u, i) => (
            <div key={u.text}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-700 ${usesVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.07}s`, background: "#fff", border: "1px solid rgba(45,125,232,0.25)", boxShadow: "0 2px 10px rgba(13,13,24,0.04)" }}>
              <Icon name={u.icon as "Bike"} size={15} style={{ color: "#2d7de8" } as React.CSSProperties} />
              <span className="text-sm" style={{ color: "rgba(13,13,24,0.8)" }}>{u.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ПРЕИМУЩЕСТВА ── */}
      <section ref={featRef as unknown as React.RefObject<HTMLElement>} className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className={`mb-10 transition-all duration-700 ${featVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-xs tracking-widest uppercase mb-2 font-medium" style={{ color: "#c99a00" }}>Почему выбирают нас</div>
          <h2 className="font-oswald font-bold text-2xl md:text-3xl" style={{ color: "#0d0d18" }}>ПРЕИМУЩЕСТВА</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div key={f.title}
              className={`p-6 rounded-2xl transition-all duration-700 ${featVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s`, background: "#fff", border: "1px solid rgba(13,13,24,0.06)", boxShadow: "0 4px 20px rgba(13,13,24,0.04)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(232,51,74,0.1)" }}>
                <Icon name={f.icon as "Hand"} size={20} style={{ color: "#e8334a" } as React.CSSProperties} />
              </div>
              <div className="font-oswald font-semibold text-sm tracking-wide mb-1" style={{ color: "#0d0d18" }}>{f.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: "rgba(13,13,24,0.6)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── КОРОБКА И ДОСТАВКА ── */}
      <section ref={boxRef as unknown as React.RefObject<HTMLElement>} className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Габариты коробки */}
          <div className={`rounded-3xl p-8 transition-all duration-700 ${boxVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ background: "#fff", border: "1px solid rgba(13,13,24,0.06)", boxShadow: "0 4px 20px rgba(13,13,24,0.04)" }}>
            <div className="flex items-center gap-2.5 mb-1">
              <Icon name="Box" size={20} style={{ color: "#e8334a" } as React.CSSProperties} />
              <div className="text-xs tracking-widest uppercase font-medium" style={{ color: "#e8334a" }}>Коробка 400 шт</div>
            </div>
            <h2 className="font-oswald font-bold text-2xl md:text-3xl mb-6" style={{ color: "#0d0d18" }}>ГАБАРИТЫ И ВЕС</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BOX_SPECS.map(s => (
                <div key={s.label} className="p-4 rounded-2xl text-center"
                  style={{ background: "#f5f6fa", border: "1px solid rgba(13,13,24,0.05)" }}>
                  <Icon name={s.icon as "Weight"} size={20} className="mb-2 mx-auto" style={{ color: "#2d7de8" } as React.CSSProperties} />
                  <div className="font-oswald font-bold text-lg" style={{ color: "#0d0d18" }}>{s.value}</div>
                  <div className="text-xs" style={{ color: "rgba(13,13,24,0.5)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Доставка */}
          <div className={`rounded-3xl p-8 transition-all duration-700 delay-200 ${boxVisible ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ background: "#fff", border: "1px solid rgba(13,13,24,0.06)", boxShadow: "0 4px 20px rgba(13,13,24,0.04)" }}>
            <div className="flex items-center gap-2.5 mb-1">
              <Icon name="Truck" size={20} style={{ color: "#c99a00" } as React.CSSProperties} />
              <div className="text-xs tracking-widest uppercase font-medium" style={{ color: "#c99a00" }}>Логистика</div>
            </div>
            <h2 className="font-oswald font-bold text-2xl md:text-3xl mb-6" style={{ color: "#0d0d18" }}>ДОСТАВКА ПО РОССИИ</h2>
            <div className="space-y-3">
              {DELIVERY.map(d => (
                <div key={d.text} className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{ background: "#f5f6fa", border: "1px solid rgba(13,13,24,0.05)" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(45,125,232,0.1)" }}>
                    <Icon name={d.icon as "Truck"} size={17} style={{ color: "#2d7de8" } as React.CSSProperties} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: "rgba(13,13,24,0.8)" }}>{d.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── КАТАЛОГ ── */}
      <section ref={catalogRef} id="catalog" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={catRef}>
          <div className={`text-center mb-14 transition-all duration-700 ${catVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: "#e8334a" }}>Ассортимент</div>
            <h2 className="font-oswald font-bold" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", color: "#0d0d18" }}>
              КАТАЛОГ ГРИПС
            </h2>
            <p className="mt-2 text-sm" style={{ color: "rgba(13,13,24,0.5)" }}>
              4 расцветки · фасовка 4 шт · коробка 400 шт
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GRIPS.map((g, i) => (
              <div key={g.id}
                className={`rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${catVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{
                  animationDelay: `${i * 0.12}s`,
                  background: "#fff",
                  border: activeCard === g.id ? `1px solid ${g.accent}70` : "1px solid rgba(13,13,24,0.07)",
                  boxShadow: activeCard === g.id ? `0 12px 40px ${g.accent}25` : "0 4px 20px rgba(13,13,24,0.05)",
                  transform: activeCard === g.id ? "translateY(-6px)" : "none",
                }}
                onMouseEnter={() => setActiveCard(g.id)}
                onMouseLeave={() => setActiveCard(null)}>

                {/* Фото */}
                <div className="relative overflow-hidden" style={{ height: 240 }}>
                  <img src={g.img} alt={g.color}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: activeCard === g.id ? "scale(1.06)" : "scale(1)" }} />
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to top, rgba(13,13,24,0.7) 0%, transparent 50%)"
                  }} />
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-oswald font-bold tracking-wide"
                    style={{ background: g.badgeBg, color: g.badgeText }}>
                    {g.badge}
                  </div>
                  <div className="absolute bottom-3 left-4">
                    <div className="text-xs font-medium tracking-widest uppercase" style={{ color: g.accent }}>{g.label}</div>
                    <div className="font-oswald font-bold text-xl text-white">{g.color}</div>
                  </div>
                </div>

                {/* Описание */}
                <div className="p-5">
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(13,13,24,0.65)" }}>{g.desc}</p>

                  <div className="space-y-1.5 mb-5 pb-4" style={{ borderBottom: "1px solid rgba(13,13,24,0.07)" }}>
                    {[["Длина", "22 см"], ["Диаметр", "3,2 см"], ["Упаковка", "4 шт / уп."], ["Коробка", "400 шт"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span style={{ color: "rgba(13,13,24,0.5)" }}>{k}</span>
                        <span style={{ color: "rgba(13,13,24,0.85)" }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={() => scrollTo(orderRef)}
                    className="w-full text-center py-3 rounded-xl text-xs font-oswald font-semibold tracking-wide uppercase transition-all"
                    style={{ background: g.accentDim, color: g.accent, border: `1px solid ${g.accent}45` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${g.accent}25`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = g.accentDim; }}>
                    Заказать этот цвет
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ORDER FORM ── */}
      <section ref={orderRef} id="order" className="py-24 px-6 md:px-12">
        <div ref={ctaRef}
          className={`max-w-2xl mx-auto transition-all duration-700 ${ctaVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="rounded-3xl p-8 md:p-12 relative overflow-hidden"
            style={{ background: "#fff", border: "1px solid rgba(232,51,74,0.2)", boxShadow: "0 12px 50px rgba(13,13,24,0.08)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,51,74,0.08) 0%, transparent 70%)"
            }} />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <img src="https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/c65dd462-3864-4ea0-be12-a665879a3039.jpg"
                  alt="AdduS" className="h-11 w-11 rounded-xl object-contain flex-shrink-0" style={{ background: "#fff", padding: 3, border: "1px solid rgba(13,13,24,0.06)" }} />
                <div>
                  <div className="text-xs tracking-widest uppercase font-medium" style={{ color: "#e8334a" }}>Оптовый заказ AdduS</div>
                  <h2 className="font-oswald font-bold text-2xl md:text-3xl leading-tight" style={{ color: "#0d0d18" }}>ОФОРМИТЬ ЗАЯВКУ</h2>
                </div>
              </div>

              <OrderForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 md:px-12 text-center"
        style={{ borderTop: "1px solid rgba(13,13,24,0.07)", color: "rgba(13,13,24,0.5)" }}>
        <div className="flex items-center justify-center gap-2 mb-1">
          <img src="https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/c65dd462-3864-4ea0-be12-a665879a3039.jpg"
            alt="AdduS" className="h-7 w-7 rounded-md object-contain" style={{ background: "#fff", padding: 2 }} />
          <span className="font-oswald text-lg font-bold tracking-wide" style={{ color: "rgba(13,13,24,0.7)" }}>AdduS</span>
        </div>
        <p className="text-xs">Оптовая продажа неопреновых грипс · Минимальный заказ от 400 шт · 4 расцветки в наличии</p>
      </footer>

    </div>
  );
};

export default Index;