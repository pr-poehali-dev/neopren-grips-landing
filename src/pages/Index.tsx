import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const GRIPS = [
  {
    id: 1,
    color: "Чёрный",
    hex: "#1a1a1a",
    border: "#444",
    accent: "#00f5a0",
    label: "CLASSIC BLACK",
    desc: "Универсальный вариант — подходит для любого велосипеда и экипировки. Самый популярный цвет в оптовых поставках.",
    price: "от 8 900 ₽",
    priceUnit: "за коробку",
    badge: "ХИТ ПРОДАЖ",
    badgeColor: "#00f5a0",
    badgeText: "#080c10",
    inStock: true,
  },
  {
    id: 2,
    color: "Красный",
    hex: "#c0392b",
    border: "#e74c3c",
    accent: "#ff4d4d",
    label: "SPORT RED",
    desc: "Яркий спортивный акцент. Высокий спрос среди MTB и трюкового направления. Отлично сочетается с чёрной рамой.",
    price: "от 9 200 ₽",
    priceUnit: "за коробку",
    badge: "СПОРТ",
    badgeColor: "#ff4d4d",
    badgeText: "#fff",
    inStock: true,
  },
  {
    id: 3,
    color: "Синий",
    hex: "#1a3a6e",
    border: "#2980b9",
    accent: "#4d9fff",
    label: "OCEAN BLUE",
    desc: "Свежий городской стиль. Популярен среди велопрокатов и городских велошкол. Устойчив к выгоранию.",
    price: "от 9 200 ₽",
    priceUnit: "за коробку",
    badge: "НОВИНКА",
    badgeColor: "#4d9fff",
    badgeText: "#fff",
    inStock: true,
  },
  {
    id: 4,
    color: "Зелёный",
    hex: "#1a3d2b",
    border: "#27ae60",
    accent: "#00e676",
    label: "TRAIL GREEN",
    desc: "Природный камуфляжный оттенок. Востребован в трейловом и горном сегменте. Оригинальный внешний вид.",
    price: "от 9 200 ₽",
    priceUnit: "за коробку",
    badge: "ЭКО СТИЛЬ",
    badgeColor: "#00e676",
    badgeText: "#080c10",
    inStock: true,
  },
];

const FEATURES = [
  { icon: "Package", title: "Фасовка 4 шт", desc: "Каждая упаковка содержит 4 грипсы — удобно для розничной продажи" },
  { icon: "Box", title: "1 коробка = 400 шт", desc: "Минимальный заказ — 1 коробка (100 упаковок × 4 шт)" },
  { icon: "Truck", title: "Быстрая отгрузка", desc: "Отправка в течение 1–2 рабочих дней после оплаты" },
  { icon: "ShieldCheck", title: "Неопрен premium", desc: "Материал повышенной прочности, устойчив к износу и скольжению" },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

const Index = () => {
  const catalogRef = useRef<HTMLElement>(null);
  const { ref: featRef, visible: featVisible } = useInView();
  const { ref: catRef, visible: catVisible } = useInView();
  const { ref: ctaRef, visible: ctaVisible } = useInView();

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen font-rubik" style={{ background: "#080c10", color: "#e8edf5" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4"
        style={{ background: "rgba(8,12,16,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,245,160,0.1)" }}>
        <div className="font-oswald text-xl font-bold tracking-widest text-neon">GRIP<span style={{ color: "#fff" }}>PRO</span></div>
        <div className="hidden md:flex gap-8 text-sm font-medium" style={{ color: "rgba(232,237,245,0.7)" }}>
          <button onClick={scrollToCatalog} className="hover:text-neon transition-colors tracking-wide uppercase text-xs">Каталог</button>
          <a href="#order" className="hover:text-neon transition-colors tracking-wide uppercase text-xs">Заказать</a>
        </div>
        <button onClick={scrollToCatalog} className="btn-neon px-5 py-2 rounded text-xs">
          Заказать оптом
        </button>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(0,245,160,0.07) 0%, transparent 70%)"
        }} />
        <div className="absolute right-10 top-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #00f5a0 0%, transparent 70%)", filter: "blur(40px)" }} />
        <div className="absolute right-1/3 bottom-1/4 w-40 h-40 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #4d9fff 0%, transparent 70%)", filter: "blur(30px)" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 text-xs font-medium tracking-widest uppercase"
              style={{ background: "rgba(0,245,160,0.1)", border: "1px solid rgba(0,245,160,0.3)", color: "#00f5a0" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse inline-block" />
              Оптовые поставки · от 400 шт
            </div>

            <h1 className="font-oswald font-bold leading-none mb-6 animate-fade-in-up"
              style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)", lineHeight: 1.05 }}>
              НЕОПРЕНОВЫЕ<br />
              <span className="text-neon">ГРИПСЫ</span><br />
              <span style={{ color: "rgba(232,237,245,0.5)" }}>ОПТОМ</span>
            </h1>

            <p className="text-base md:text-lg mb-8 leading-relaxed animate-fade-in-up delay-200"
              style={{ color: "rgba(232,237,245,0.65)", maxWidth: 480 }}>
              Профессиональные неопреновые грипсы для велосипедов.
              4 цвета в наличии. Фасовка по 4 шт. Минимальный заказ — <strong className="text-white">1 коробка (400 штук)</strong>.
            </p>

            <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up delay-300">
              <button onClick={scrollToCatalog} className="btn-neon px-8 py-4 rounded-lg text-sm flex items-center gap-2">
                <Icon name="ShoppingCart" size={18} />
                Смотреть каталог
              </button>
              <a href="#order" className="flex items-center gap-2 px-8 py-4 rounded-lg text-sm font-medium transition-all"
                style={{ border: "1px solid rgba(232,237,245,0.2)", color: "#e8edf5" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,245,160,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,237,245,0.2)")}>
                <Icon name="Phone" size={18} />
                Связаться
              </a>
            </div>

            <div className="flex gap-8 animate-fade-in-up delay-400">
              {[["4", "ЦВЕТА"], ["400 шт", "МИН. ЗАКАЗ"], ["4 шт", "В УПАКОВКЕ"]].map(([val, lab]) => (
                <div key={lab}>
                  <div className="font-oswald font-bold text-2xl text-neon">{val}</div>
                  <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(232,237,245,0.4)" }}>{lab}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-center animate-float">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl" style={{
                background: "radial-gradient(circle, rgba(0,245,160,0.15) 0%, transparent 70%)",
                filter: "blur(20px)", transform: "scale(1.2)"
              }} />
              <img
                src="https://cdn.poehali.dev/projects/424a5ffb-c6d5-4da2-88c4-48c11e429a4a/files/fc536441-8beb-4094-bd50-6df68a010fae.jpg"
                alt="Неопреновые грипсы 4 цвета"
                className="relative z-10 rounded-3xl w-full max-w-md object-cover"
                style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,245,160,0.1)" }}
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest uppercase">Каталог</span>
          <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, #00f5a0, transparent)" }} />
        </div>
      </section>

      {/* FEATURES */}
      <section ref={featRef} className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <div key={f.title}
              className={`p-6 rounded-2xl neon-border transition-all duration-700 ${featVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s`, background: "#0f1520" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "rgba(0,245,160,0.1)" }}>
                <Icon name={f.icon as "Package"} size={20} className="text-neon" />
              </div>
              <div className="font-oswald font-semibold text-sm tracking-wide mb-1">{f.title}</div>
              <div className="text-xs leading-relaxed" style={{ color: "rgba(232,237,245,0.5)" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOG */}
      <section ref={catalogRef} id="catalog" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div ref={catRef}>
          <div className={`text-center mb-16 transition-all duration-700 ${catVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="text-neon text-xs tracking-widest uppercase mb-3 font-medium">Ассортимент</div>
            <h2 className="font-oswald font-bold text-white"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
              КАТАЛОГ ГРИПС
            </h2>
            <p className="mt-3 text-sm" style={{ color: "rgba(232,237,245,0.5)" }}>
              Все цвета доступны для заказа · Упаковка 4 шт · Коробка 400 шт
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GRIPS.map((g, i) => (
              <div key={g.id}
                className={`card-grip rounded-3xl overflow-hidden transition-all duration-700 ${catVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.12}s`, borderColor: `${g.border}40` }}>

                <div className="relative h-36 flex items-center justify-center overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${g.hex} 0%, ${g.border}80 100%)` }}>
                  <div className="absolute inset-0"
                    style={{ background: `radial-gradient(circle at 70% 30%, ${g.accent}30 0%, transparent 60%)` }} />

                  <div className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center"
                    style={{
                      background: g.hex,
                      border: `3px solid ${g.accent}`,
                      boxShadow: `0 0 30px ${g.accent}50`
                    }}>
                    <div className="w-10 h-10 rounded-full" style={{ background: `radial-gradient(circle, ${g.accent}40, transparent)` }} />
                  </div>

                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-oswald font-semibold tracking-wide"
                    style={{ background: g.badgeColor, color: g.badgeText }}>
                    {g.badge}
                  </div>
                </div>

                <div className="p-5">
                  <div className="text-xs tracking-widest uppercase mb-1 font-medium" style={{ color: g.accent }}>{g.label}</div>
                  <h3 className="font-oswald font-bold text-xl text-white mb-3">{g.color}</h3>
                  <p className="text-xs leading-relaxed mb-5" style={{ color: "rgba(232,237,245,0.55)" }}>{g.desc}</p>

                  <div className="flex items-end justify-between mb-4 pb-4"
                    style={{ borderBottom: `1px solid rgba(255,255,255,0.07)` }}>
                    <div>
                      <div className="font-oswald font-bold text-2xl" style={{ color: g.accent }}>{g.price}</div>
                      <div className="text-xs" style={{ color: "rgba(232,237,245,0.4)" }}>{g.priceUnit}</div>
                    </div>
                    <div className="text-xs px-2.5 py-1 rounded-full"
                      style={{ background: "rgba(0,245,160,0.08)", color: "#00f5a0", border: "1px solid rgba(0,245,160,0.2)" }}>
                      В наличии
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-5">
                    {[["Материал", "Неопрен premium"], ["Упаковка", "4 шт / уп."], ["Коробка", "400 шт (100 уп.)"]].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span style={{ color: "rgba(232,237,245,0.4)" }}>{k}</span>
                        <span style={{ color: "rgba(232,237,245,0.8)" }}>{v}</span>
                      </div>
                    ))}
                  </div>

                  <a href="#order"
                    className="block w-full text-center py-3 rounded-xl text-xs font-oswald font-semibold tracking-wide uppercase transition-all"
                    style={{ background: `${g.accent}15`, color: g.accent, border: `1px solid ${g.accent}40` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${g.accent}30`; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${g.accent}15`; }}>
                    Заказать этот цвет
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / ORDER */}
      <section id="order" className="py-24 px-6 md:px-12">
        <div ref={ctaRef} className={`max-w-3xl mx-auto text-center transition-all duration-700 ${ctaVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="rounded-3xl p-10 md:p-16 relative overflow-hidden"
            style={{ background: "#0f1520", border: "1px solid rgba(0,245,160,0.2)" }}>
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,245,160,0.08) 0%, transparent 70%)"
            }} />
            <div className="relative z-10">
              <div className="text-neon text-xs tracking-widest uppercase mb-4 font-medium">Оптовый заказ</div>
              <h2 className="font-oswald font-bold text-white mb-4"
                style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                ГОТОВЫ СДЕЛАТЬ ЗАКАЗ?
              </h2>
              <p className="mb-8 text-sm leading-relaxed" style={{ color: "rgba(232,237,245,0.6)" }}>
                Минимальный заказ — <strong className="text-white">1 коробка (400 шт)</strong>.
                Напишите нам, укажите нужный цвет и количество коробок — ответим в течение 30 минут.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-neon px-10 py-4 rounded-xl text-sm flex items-center justify-center gap-2 animate-pulse-neon">
                  <Icon name="MessageCircle" size={18} />
                  Написать в WhatsApp
                </button>
                <button className="px-10 py-4 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all"
                  style={{ border: "1px solid rgba(232,237,245,0.2)", color: "#e8edf5" }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,245,160,0.5)")}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(232,237,245,0.2)")}>
                  <Icon name="Mail" size={18} />
                  Отправить e-mail
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 md:px-12 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "rgba(232,237,245,0.3)" }}>
        <div className="font-oswald text-lg font-bold tracking-widest mb-2">
          GRIP<span style={{ color: "rgba(232,237,245,0.3)" }}>PRO</span>
        </div>
        <p className="text-xs">Оптовая продажа неопреновых грипс · Минимальный заказ от 400 шт</p>
      </footer>

    </div>
  );
};

export default Index;
