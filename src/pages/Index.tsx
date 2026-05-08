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

const Index = () => {
  const catalogRef = useRef<HTMLElement>(null);
  const orderRef = useRef<HTMLElement>(null);
  const { ref: specsRef, visible: specsVisible } = useInView();
  const { ref: usesRef, visible: usesVisible } = useInView();
  const { ref: featRef, visible: featVisible } = useInView();
  const { ref: catRef, visible: catVisible } = useInView();
  const { ref: ctaRef, visible: ctaVisible } = useInView();
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const scrollTo = (ref: React.RefObject<HTMLElement>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen font-rubik" style={{ background: "#09090f", color: "#eaeef5" }}>

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-3"
        style={{ background: "rgba(9,9,15,0.88)", backdropFilter: "blur(18px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-3">
          <img src="https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/c65dd462-3864-4ea0-be12-a665879a3039.jpg"
            alt="AdduS" className="h-9 w-9 rounded-lg object-contain" style={{ background: "#fff" }} />
          <span className="font-oswald font-bold text-xl tracking-wide" style={{ color: "#fff" }}>AdduS</span>
        </div>
        <div className="hidden md:flex gap-8">
          {([["Каталог", "catalog"], ["Заказать", "order"]] as [string, string][]).map(([label, id]) => (
            <a key={id} href={`#${id}`}
              className="text-xs tracking-widest uppercase transition-colors hover:text-white"
              style={{ color: "rgba(234,238,245,0.5)" }}>
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
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 70% at 65% 50%, rgba(245,200,0,0.05) 0%, transparent 70%)"
        }} />
        <div className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{ right: "5%", top: "15%", background: "radial-gradient(circle, rgba(245,200,0,0.08), transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute w-64 h-64 rounded-full pointer-events-none"
          style={{ left: "10%", bottom: "20%", background: "radial-gradient(circle, rgba(45,125,232,0.08), transparent 70%)", filter: "blur(40px)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center w-full py-16">
          {/* Text */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img src="https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/c65dd462-3864-4ea0-be12-a665879a3039.jpg"
                alt="AdduS" className="h-14 w-14 rounded-2xl object-contain" style={{ background: "#fff", padding: 4 }} />
              <div>
                <div className="font-oswald font-bold text-2xl tracking-wide text-white">AdduS</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(234,238,245,0.4)" }}>Официальный дистрибьютор</div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-medium tracking-widest uppercase"
              style={{ background: "rgba(220,40,50,0.12)", border: "1px solid rgba(220,40,50,0.35)", color: "#e8334a" }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block animate-pulse" style={{ background: "#e8334a" }} />
              Оптовые поставки · от 400 шт
            </div>

            <h1 className="font-oswald font-bold mb-5 animate-fade-in-up leading-none"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5.2rem)", lineHeight: 1.0 }}>
              НЕОПРЕНОВЫЕ<br />
              <span style={{ color: "#e8334a" }}>ГРИПСЫ</span><br />
              <span style={{ color: "rgba(234,238,245,0.45)" }}>ОПТОМ</span>
            </h1>

            <p className="text-sm md:text-base leading-relaxed mb-4 animate-fade-in-up delay-200"
              style={{ color: "rgba(234,238,245,0.65)", maxWidth: 500 }}>
              Мягкие ручки из неопрена для <strong style={{ color: "#eaeef5" }}>турников, велосипедов, самокатов</strong> и садового инвентаря.
              Нескользящие, не натирают ладони, снижают нагрузку на кисти.
            </p>
            <p className="text-sm mb-8 animate-fade-in-up delay-300"
              style={{ color: "rgba(234,238,245,0.4)" }}>
              4 расцветки · длина 22 см · Ø 3,2 см · фасовка 4 шт · коробка 400 шт
            </p>

            <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up delay-300">
              <button onClick={() => scrollTo(catalogRef)}
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-oswald font-bold tracking-wide uppercase transition-all"
                style={{ background: "#e8334a", color: "#fff", boxShadow: "0 0 30px rgba(232,51,74,0.3)" }}>
                <Icon name="ShoppingCart" size={18} />
                Смотреть каталог
              </button>
              <button onClick={() => scrollTo(orderRef)}
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-medium transition-all"
                style={{ border: "1px solid rgba(234,238,245,0.2)", color: "#eaeef5" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(245,200,0,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(234,238,245,0.2)")}>
                <Icon name="Phone" size={18} />
                Оставить заявку
              </button>
            </div>

            <div className="flex gap-8 animate-fade-in-up delay-400">
              {[["4", "ЦВЕТА"], ["400 шт", "МИН. ЗАКАЗ"], ["22 см", "ДЛИНА"]].map(([val, lab]) => (
                <div key={lab}>
                  <div className="font-oswald font-bold text-2xl" style={{ color: "#e8334a" }}>{val}</div>
                  <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(234,238,245,0.35)" }}>{lab}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Images mosaic */}
          <div className="animate-float grid grid-cols-2 gap-3">
            {GRIPS.map((g) => (
              <div key={g.id} className="relative overflow-hidden rounded-2xl"
                style={{ aspectRatio: "3/4", boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px ${g.accent}30` }}>
                <img src={g.img} alt={g.color} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(to top, rgba(9,9,15,0.75) 0%, transparent 50%)"
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
              style={{ animationDelay: `${i * 0.08}s`, background: "#12121c", border: "1px solid rgba(255,255,255,0.06)" }}>
              <Icon name={s.icon as "Ruler"} size={22} className="mb-3" style={{ color: "#2d7de8" } as React.CSSProperties} />
              <div className="font-oswald font-bold text-xl text-white mb-0.5">{s.value}</div>
              <div className="text-xs" style={{ color: "rgba(234,238,245,0.45)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ПРИМЕНЕНИЕ ── */}
      <section ref={usesRef as unknown as React.RefObject<HTMLElement>} className="py-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className={`mb-6 transition-all duration-700 ${usesVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-xs tracking-widest uppercase mb-2 font-medium" style={{ color: "#f5c800" }}>Применение</div>
          <h2 className="font-oswald font-bold text-white text-2xl md:text-3xl">ПОДХОДЯТ ДЛЯ</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {USES.map((u, i) => (
            <div key={u.text}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-700 ${usesVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.07}s`, background: "#12121c", border: "1px solid rgba(45,125,232,0.22)" }}>
              <Icon name={u.icon as "Bike"} size={15} style={{ color: "#2d7de8" } as React.CSSProperties} />
              <span className="text-sm" style={{ color: "rgba(234,238,245,0.8)" }}>{u.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ПРЕИМУЩЕСТВА ── */}
      <section ref={featRef as unknown as React.RefObject<HTMLElement>} className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className={`mb-10 transition-all duration-700 ${featVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-xs tracking-widest uppercase mb-2 font-medium" style={{ color: "#f5c800" }}>Почему выбирают нас</div>
          <h2 className="font-oswald font-bold text-white text-2xl md:text-3xl">ПРЕИМУЩЕСТВА</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div key={f.title}
              className={`p-6 rounded-2xl transition-all duration-700 ${featVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s`, background: "#12121c", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(232,51,74,0.1)" }}>
                <Icon name={f.icon as "Hand"} size={20} style={{ color: "#e8334a" } as React.CSSProperties} />
              </div>
              <div className="font-oswald font-semibold text-sm tracking-wide text-white mb-1">{f.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: "rgba(234,238,245,0.5)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── КАТАЛОГ ── */}
      <section ref={catalogRef} id="catalog" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={catRef}>
          <div className={`text-center mb-14 transition-all duration-700 ${catVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-xs tracking-widest uppercase mb-3 font-medium" style={{ color: "#e8334a" }}>Ассортимент</div>
            <h2 className="font-oswald font-bold text-white" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              КАТАЛОГ ГРИПС
            </h2>
            <p className="mt-2 text-sm" style={{ color: "rgba(234,238,245,0.4)" }}>
              4 расцветки · фасовка 4 шт · коробка 400 шт
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GRIPS.map((g, i) => (
              <div key={g.id}
                className={`rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${catVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{
                  animationDelay: `${i * 0.12}s`,
                  background: "#12121c",
                  border: activeCard === g.id ? `1px solid ${g.accent}70` : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: activeCard === g.id ? `0 0 40px ${g.accent}15` : "none",
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
                    background: "linear-gradient(to top, rgba(9,9,15,0.7) 0%, transparent 50%)"
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
                  <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(234,238,245,0.55)" }}>{g.desc}</p>

                  <div className="space-y-1.5 mb-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {[["Длина", "22 см"], ["Диаметр", "3,2 см"], ["Упаковка", "4 шт / уп."], ["Коробка", "400 шт"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span style={{ color: "rgba(234,238,245,0.38)" }}>{k}</span>
                        <span style={{ color: "rgba(234,238,245,0.85)" }}>{v}</span>
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

      {/* ── ORDER CTA ── */}
      <section ref={orderRef} id="order" className="py-24 px-6 md:px-12">
        <div ref={ctaRef}
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${ctaVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="rounded-3xl p-10 md:p-16 relative overflow-hidden"
            style={{ background: "#12121c", border: "1px solid rgba(232,51,74,0.25)" }}>
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,51,74,0.07) 0%, transparent 70%)"
            }} />
            <div className="relative z-10">
              <div className="flex justify-center mb-4">
                <img src="https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/c65dd462-3864-4ea0-be12-a665879a3039.jpg"
                  alt="AdduS" className="h-12 w-12 rounded-xl object-contain" style={{ background: "#fff", padding: 3 }} />
              </div>
              <div className="text-xs tracking-widest uppercase mb-4 font-medium" style={{ color: "#e8334a" }}>Оптовый заказ AdduS</div>
              <h2 className="font-oswald font-bold text-white mb-4" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                ГОТОВЫ СДЕЛАТЬ ЗАКАЗ?
              </h2>
              <p className="mb-2 text-sm leading-relaxed" style={{ color: "rgba(234,238,245,0.6)" }}>
                Минимальный заказ — <strong className="text-white">1 коробка (400 шт)</strong>.
                Укажите нужный цвет и количество коробок — ответим в течение 30 минут.
              </p>
              <p className="mb-8 text-xs" style={{ color: "rgba(234,238,245,0.3)" }}>
                Возможен заказ нескольких цветов в одной поставке
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-4 rounded-xl text-sm font-oswald font-bold tracking-wide uppercase flex items-center justify-center gap-2 transition-all"
                  style={{ background: "#e8334a", color: "#fff", boxShadow: "0 0 30px rgba(232,51,74,0.35)" }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 0 50px rgba(232,51,74,0.55)")}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 0 30px rgba(232,51,74,0.35)")}>
                  <Icon name="MessageCircle" size={18} />
                  Написать в WhatsApp
                </button>
                <button className="px-10 py-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
                  style={{ border: "1px solid rgba(45,125,232,0.4)", color: "#eaeef5" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(45,125,232,0.8)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(45,125,232,0.4)")}>
                  <Icon name="Mail" size={18} />
                  Отправить e-mail
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 px-6 md:px-12 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", color: "rgba(234,238,245,0.28)" }}>
        <div className="flex items-center justify-center gap-2 mb-1">
          <img src="https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/bucket/c65dd462-3864-4ea0-be12-a665879a3039.jpg"
            alt="AdduS" className="h-7 w-7 rounded-md object-contain" style={{ background: "#fff", padding: 2 }} />
          <span className="font-oswald text-lg font-bold tracking-wide" style={{ color: "rgba(234,238,245,0.5)" }}>AdduS</span>
        </div>
        <p className="text-xs">Оптовая продажа неопреновых грипс · Минимальный заказ от 400 шт · 4 расцветки в наличии</p>
      </footer>

    </div>
  );
};

export default Index;