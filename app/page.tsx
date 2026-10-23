"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  cost: number;
  price: number;
  source: string;
  status: "Actif" | "Brouillon";
};

type Order = {
  id: string;
  customer: string;
  product: string;
  city: string;
  total: number;
  status: "جديد" | "تأكيد المورد" | "في التوصيل" | "تم التسليم";
};

const initialProducts: Product[] = [
  { id: 1, name: "زربية الأطلس", category: "ديكور", cost: 420, price: 690, source: "تعاونية الأطلس", status: "Actif" },
  { id: 2, name: "حقيبة جلد يدوي", category: "إكسسوارات", cost: 180, price: 320, source: "صانع تقليدي", status: "Actif" },
  { id: 3, name: "طاجين فخار مزخرف", category: "مطبخ", cost: 95, price: 175, source: "ورشة فاس", status: "Brouillon" },
];

const initialOrders: Order[] = [
  { id: "PZ-1048", customer: "سلمى أ.", product: "زربية الأطلس", city: "مراكش", total: 690, status: "جديد" },
  { id: "PZ-1047", customer: "ياسين م.", product: "حقيبة جلد يدوي", city: "الدار البيضاء", total: 320, status: "تأكيد المورد" },
  { id: "PZ-1046", customer: "مريم ب.", product: "طاجين فخار مزخرف", city: "الرباط", total: 175, status: "في التوصيل" },
];

const money = (n: number) => `${n.toLocaleString("fr-MA")} د.م.`;

export default function Home() {
  const [tab, setTab] = useState("نظرة عامة");
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [notice, setNotice] = useState("");
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState("ديكور");
  const [newCost, setNewCost] = useState("100");
  const [newPrice, setNewPrice] = useState("180");
  const [newSource, setNewSource] = useState("");
  const [aiProduct, setAiProduct] = useState("زربية مغربية مصنوعة يدوياً");
  const [aiTone, setAiTone] = useState("دافئ وأصيل");
  const [aiResult, setAiResult] = useState("");

  const filteredProducts = useMemo(
    () => products.filter((p) => `${p.name} ${p.category} ${p.source}`.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );
  const profit = products.reduce((sum, p) => sum + (p.price - p.cost), 0);
  const nav = [
    { label: "نظرة عامة", icon: "⌂" },
    { label: "المنتجات", icon: "◇" },
    { label: "الطلبات", icon: "▤" },
    { label: "الموردون", icon: "♧" },
    { label: "مساعد AI", icon: "✳" },
  ];

  function addProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newName.trim() || !newSource.trim()) return;
    setProducts((old) => [{ id: Date.now(), name: newName.trim(), category: newCategory, cost: Number(newCost) || 0, price: Number(newPrice) || 0, source: newSource.trim(), status: "Brouillon" }, ...old]);
    setNewName("");
    setNewSource("");
    setShowProductForm(false);
    setNotice("تزاد المنتوج فالقائمة بنجاح.");
    setTab("المنتجات");
  }

  function changeOrderStatus(id: string) {
    const states: Order["status"][] = ["جديد", "تأكيد المورد", "في التوصيل", "تم التسليم"];
    setOrders((old) => old.map((o) => o.id === id ? { ...o, status: states[(states.indexOf(o.status) + 1) % states.length] } : o));
    setNotice("تحدّثات حالة الطلب. هادي غير بيانات تجريبية فالنسخة الحالية.");
  }

  function generateCopy() {
    const text = `✨ ${aiProduct} — لمسة من التراث المغربي لدارك\n\nقطعة مميزة كتجمع بين الصنعة التقليدية والجمال الأصيل، بتفاصيل كتزيد الدفء والشخصية لأي فضاء. اختيار زوين ليك أو كهدية مميزة.\n\n📦 التوصيل متاح داخل المغرب حسب تأكيد التوفر.\n💬 تواصل معنا لمعرفة التفاصيل.\n\n#صناعة_تقليدية #صنع_بالمغرب #ديكور_مغربي`;
    setAiResult(text);
  }

  return (
    <main className="pz-shell" dir="rtl">
      <aside className="pz-sidebar">
        <div className="pz-brand">
          <div className="pz-mark">Z</div>
          <div><div className="pz-brand-name">PROJECT Z</div><div className="pz-brand-sub">من الصنعة المغربية، للمستقبل</div></div>
        </div>
        <div className="pz-workspace"><span className="pz-live-dot" /> مساحة العمل <span className="pz-chevron">⌄</span></div>
        <div className="pz-nav-label">القائمة الرئيسية</div>
        <nav className="pz-nav">
          {nav.map((item) => <button key={item.label} className={`pz-nav-item ${tab === item.label ? "active" : ""}`} onClick={() => { setTab(item.label); setNotice(""); }}><span className="pz-nav-icon">{item.icon}</span><span>{item.label}</span>{item.label === "الطلبات" && <span className="pz-nav-count">{orders.length}</span>}</button>)}
        </nav>
        <div className="pz-sidebar-bottom">
          <div className="pz-help-card"><div className="pz-help-icon">✦</div><strong>كلشي كيبدا بفكرة</strong><p>نظّم منتجاتك وخلي Project Z يكبر معاك خطوة بخطوة.</p><button onClick={() => setTab("مساعد AI")}>جرّب مساعد AI <span>←</span></button></div>
          <div className="pz-profile"><div className="pz-avatar">PZ</div><div className="pz-profile-text"><strong>صاحب المشروع</strong><span>المسؤول الرئيسي</span></div><span className="pz-dots">•••</span></div>
        </div>
      </aside>

      <section className="pz-main">
        <header className="pz-topbar">
          <div className="pz-breadcrumb">مساحة العمل <span>/</span> <strong>{tab}</strong></div>
          <div className="pz-top-actions"><div className="pz-status"><span className="pz-live-dot" /> النسخة التجريبية</div><button className="pz-icon-button" aria-label="الإشعارات" onClick={() => setNotice("ما كاين حتى إشعار جديد.")}>♧</button><div className="pz-top-avatar">Z</div></div>
        </header>

        <div className="pz-content">
          {notice && <div className="pz-notice"><span>✓</span>{notice}<button onClick={() => setNotice("")}>×</button></div>}
          {tab === "نظرة عامة" && <>
            <div className="pz-welcome-row"><div><div className="pz-eyebrow"><span /> لوحة القيادة ديالك</div><h1>صباح الخير، مرحبا بك فـ <em>Project Z.</em></h1><p className="pz-lead">كلشي مجموع هنا باش تسيّر تجارتك بذكاء، من أول منتوج حتى آخر طلب.</p></div><button className="pz-primary" onClick={() => { setShowProductForm(true); setTab("المنتجات"); }}>＋ زيد منتوج جديد</button></div>
            <div className="pz-banner"><div className="pz-banner-pattern">✳</div><div className="pz-banner-copy"><span className="pz-banner-kicker">حكاية كل منتوج كتستاهل توصل</span><h2>التراث ديالنا، بفرصة جديدة.</h2><p>بدا صغير، تعلّم من السوق، وكبّر مشروعك منتوج بمنتوج.</p><button onClick={() => setTab("مساعد AI")}>اكتشف مساعد الذكاء الاصطناعي <span>←</span></button></div><div className="pz-banner-art"><div className="pz-sun" /><div className="pz-arch"><div className="pz-vase">✺</div></div><div className="pz-art-caption">صنعة • أصالة • مستقبل</div></div></div>
            <div className="pz-section-heading"><div><h2>نظرة على المشروع</h2><p>ملخص تجريبي باش تبدا تنظم الخدمة ديالك.</p></div><span className="pz-period">● بيانات تجريبية</span></div>
            <div className="pz-stats">
              <article className="pz-stat-card"><div className="pz-stat-top"><span>الطلبات النشيطة</span><span className="pz-stat-icon terracotta">▤</span></div><div className="pz-stat-number">{orders.filter(o => o.status !== "تم التسليم").length.toString().padStart(2, "0")}</div><div className="pz-stat-foot"><span className="pz-stat-neutral">خاصها متابعة</span><span>طلبات مازال مفتوحة</span></div><div className="pz-mini-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
              <article className="pz-stat-card"><div className="pz-stat-top"><span>المنتجات المسجلة</span><span className="pz-stat-icon olive">◇</span></div><div className="pz-stat-number">{products.length.toString().padStart(2, "0")}</div><div className="pz-stat-foot"><span className="pz-stat-good">قابلة للتطوير</span><span>فكتالوغ المشروع</span></div><div className="pz-stat-progress"><span style={{ width: `${Math.min(products.length * 15, 100)}%` }} /></div></article>
              <article className="pz-stat-card"><div className="pz-stat-top"><span>هامش الربح المحتمل</span><span className="pz-stat-icon gold">✧</span></div><div className="pz-stat-number">{money(profit)}</div><div className="pz-stat-foot"><span className="pz-stat-neutral">قبل التوصيل والمصاريف</span></div><div className="pz-stat-spark">⌁⌁⌁⌁⌁⌁⌁</div></article>
              <article className="pz-stat-card"><div className="pz-stat-top"><span>الموردون</span><span className="pz-stat-icon blue">♧</span></div><div className="pz-stat-number">02</div><div className="pz-stat-foot"><span className="pz-stat-neutral">أمثلة توضيحية</span><span>حرفيين وورشات</span></div><div className="pz-stat-suppliers"><span>أط</span><span>فـ</span><span>+ موردين</span></div></article>
            </div>
            <div className="pz-bottom-grid"><section className="pz-panel"><div className="pz-panel-head"><div><h3>آخر الطلبات</h3><p>تبع الحالة ديال كل طلب</p></div><button className="pz-text-button" onClick={() => setTab("الطلبات")}>شوف الكل ←</button></div><div className="pz-order-list">{orders.slice(0, 3).map(o => <div className="pz-order-row" key={o.id}><div className="pz-order-symbol">↗</div><div className="pz-order-info"><strong>{o.product}</strong><span>{o.id} · {o.customer} · {o.city}</span></div><div className="pz-order-right"><strong>{money(o.total)}</strong><span className={`pz-pill ${o.status === "تم التسليم" ? "success" : o.status === "في التوصيل" ? "blue" : "pending"}`}>{o.status}</span></div></div>)}</div></section>
              <section className="pz-panel pz-quick-panel"><div className="pz-panel-head"><div><h3>خطوات سريعة</h3><p>شنو بغيتي تدير اليوم؟</p></div><span className="pz-quick-spark">✳</span></div><button className="pz-quick-action" onClick={() => { setTab("المنتجات"); setShowProductForm(true); }}><span className="pz-quick-icon">＋</span><span><strong>سجّل منتوج جديد</strong><small>الثمن، المصدر والتصنيف</small></span><b>←</b></button><button className="pz-quick-action" onClick={() => setTab("مساعد AI")}><span className="pz-quick-icon ai">✧</span><span><strong>وجد وصف تسويقي</strong><small>بدا محتوى المنتوج ديالك</small></span><b>←</b></button><button className="pz-quick-action" onClick={() => setTab("الموردون")}><span className="pz-quick-icon supplier">♧</span><span><strong>نظّم الموردين</strong><small>الحرفيين والورشات</small></span><b>←</b></button></section></div>
          </>}

          {tab === "المنتجات" && <><div className="pz-page-heading"><div><div className="pz-eyebrow"><span /> الكاتالوغ</div><h1>المنتجات <em>ديالك.</em></h1><p className="pz-lead">نظّم المنتوجات والمصادر والثمن ديال البيع.</p></div><button className="pz-primary" onClick={() => setShowProductForm(!showProductForm)}>＋ زيد منتوج</button></div>
            {showProductForm && <form className="pz-form-card" onSubmit={addProduct}><div className="pz-form-title"><h3>منتوج جديد</h3><button type="button" className="pz-close" onClick={() => setShowProductForm(false)}>×</button></div><div className="pz-form-grid"><label>اسم المنتوج<input required value={newName} onChange={e => setNewName(e.target.value)} placeholder="مثال: زربية يدوية" /></label><label>التصنيف<select value={newCategory} onChange={e => setNewCategory(e.target.value)}><option>ديكور</option><option>إكسسوارات</option><option>مطبخ</option><option>ملابس</option><option>عناية وجمال</option><option>أخرى</option></select></label><label>ثمن المورد (د.م.)<input type="number" min="0" value={newCost} onChange={e => setNewCost(e.target.value)} /></label><label>ثمن البيع (د.م.)<input type="number" min="0" value={newPrice} onChange={e => setNewPrice(e.target.value)} /></label><label className="pz-form-wide">اسم المورد أو الورشة<input required value={newSource} onChange={e => setNewSource(e.target.value)} placeholder="اسم الحرفي، التعاونية أو المتجر" /></label></div><div className="pz-form-actions"><span>هامش الربح الأولي: <strong>{money((Number(newPrice) || 0) - (Number(newCost) || 0))}</strong></span><button className="pz-primary" type="submit">حفظ المنتوج</button></div></form>}
            <div className="pz-table-toolbar"><div className="pz-search">⌕ <input value={search} onChange={e => setSearch(e.target.value)} placeholder="قلّب على منتوج أو مورد..." /></div><span>{filteredProducts.length} منتجات</span></div>
            <div className="pz-product-grid">{filteredProducts.map((p, i) => <article className="pz-product-card" key={p.id}><div className={`pz-product-visual visual-${i % 3}`}><span className="pz-product-category">{p.category}</span><div className="pz-product-symbol">{p.category === "ديكور" ? "✺" : p.category === "مطبخ" ? "◉" : "◇"}</div><span className="pz-product-visual-label">PROJECT Z · ARTISANAL</span></div><div className="pz-product-body"><div className="pz-product-title"><h3>{p.name}</h3><span className={`pz-product-status ${p.status === "Actif" ? "is-active" : ""}`}>{p.status}</span></div><div className="pz-product-source">♧ {p.source}</div><div className="pz-product-prices"><div><small>ثمن البيع</small><strong>{money(p.price)}</strong></div><div><small>هامش أولي</small><strong className="pz-margin">{money(p.price - p.cost)}</strong></div></div><button className="pz-product-action" onClick={() => { setAiProduct(p.name); setTab("مساعد AI"); }}>وجد ليه محتوى تسويقي <span>←</span></button></div></article>)}</div>
          </>}

          {tab === "الطلبات" && <><div className="pz-page-heading"><div><div className="pz-eyebrow"><span /> تتبع العمليات</div><h1>الطلبات <em>والتوصيل.</em></h1><p className="pz-lead">تابع الطلبات وبدّل الحالة ديالها من بعد كل خطوة.</p></div><span className="pz-demo-tag">بيانات تجريبية</span></div><div className="pz-order-board">{orders.map(o => <article className="pz-order-card" key={o.id}><div className="pz-order-card-top"><span className="pz-order-id">{o.id}</span><span className={`pz-pill ${o.status === "تم التسليم" ? "success" : o.status === "في التوصيل" ? "blue" : "pending"}`}>{o.status}</span></div><h3>{o.product}</h3><p>{o.customer} · {o.city}</p><div className="pz-order-card-bottom"><strong>{money(o.total)}</strong><button onClick={() => changeOrderStatus(o.id)}>بدّل الحالة ←</button></div></article>)}</div><p className="pz-footnote">ملاحظة: هاد الطلبات تجريبية ومحلية؛ ما كاين حتى زبون حقيقي أو شركة توصيل مربوطة دابا.</p></>}

          {tab === "الموردون" && <><div className="pz-page-heading"><div><div className="pz-eyebrow"><span /> شبكة الشركاء</div><h1>ناس الصنعة <em>والموردين.</em></h1><p className="pz-lead">نظّم المصادر ديالك وتأكد من التوفر قبل ما تأكد الطلب للزبون.</p></div><span className="pz-demo-tag">واجهة أولية</span></div><div className="pz-supplier-grid"><article className="pz-supplier-card"><div className="pz-supplier-avatar terracotta-bg">أط</div><div className="pz-supplier-card-title"><h3>تعاونية الأطلس</h3><span>صناعة الزرابي</span></div><span className="pz-supplier-tag">مثال</span><p>منتوجات منسوجة يدوياً بطابع أمازيغي.</p><div className="pz-supplier-meta"><span>📍 مراكش / الأطلس</span><span>◇ ديكور</span></div><button onClick={() => setNotice("هاد المورد مثال توضيحي. زيد بيانات المورد الحقيقي من بعد.")}>تفاصيل المورد ←</button></article><article className="pz-supplier-card"><div className="pz-supplier-avatar olive-bg">فـ</div><div className="pz-supplier-card-title"><h3>ورشة فاس التقليدية</h3><span>فخار وسيراميك</span></div><span className="pz-supplier-tag">مثال</span><p>قطع فخارية وزخارف مستوحاة من التراث المغربي.</p><div className="pz-supplier-meta"><span>📍 فاس</span><span>◉ مطبخ وديكور</span></div><button onClick={() => setNotice("هاد المورد مثال توضيحي. زيد بيانات المورد الحقيقي من بعد.")}>تفاصيل المورد ←</button></article><button className="pz-add-supplier" onClick={() => setNotice("الخطوة القادمة: نضيفو نموذج تسجيل الموردين مع الهاتف، المدينة، المنتجات والتوفر.")}><span>＋</span><strong>زيد مورد جديد</strong><small>سجّل حرفي أو ورشة أو متجر</small></button></div><div className="pz-info-note"><span>✧</span><div><strong>قاعدة مهمة فـ Project Z</strong><p>قبل قبول أي طلب، خاص تأكيد توفر المنتوج والثمن ومدة التحضير مع المورد. هاد النسخة ما كتتاصلش بالموردين أوتوماتيكياً.</p></div></div></>}

          {tab === "مساعد AI" && <><div className="pz-page-heading"><div><div className="pz-eyebrow"><span /> مختبر المحتوى</div><h1>مساعدك <em>الإبداعي.</em></h1><p className="pz-lead">حضّر مسودة تسويقية أولية لمنتوجاتك، بنبرة مغربية دافئة.</p></div><span className="pz-ai-label">✧ AI workspace</span></div><div className="pz-ai-layout"><section className="pz-ai-form"><div className="pz-ai-form-heading"><div className="pz-ai-big-icon">✧</div><div><h3>صايب محتوى المنتوج</h3><p>دخل المعلومات ووجد مسودة قابلة للتعديل.</p></div></div><label>اسم المنتوج<input value={aiProduct} onChange={e => setAiProduct(e.target.value)} placeholder="اسم المنتوج" /></label><label>النبرة ديال الكتابة<select value={aiTone} onChange={e => setAiTone(e.target.value)}><option>دافئ وأصيل</option><option>راقي وفخم</option><option>خفيف وشبابي</option><option>مباشر وتجاري</option></select></label><button className="pz-primary pz-ai-generate" onClick={generateCopy}>✧ حضّر مسودة تسويقية <span>←</span></button><p className="pz-ai-disclaimer">حالياً هاد الأداة كتولّد نموذجاً محلياً بقالب جاهز؛ الربط مع API ديال الذكاء الاصطناعي غادي يكون فالمرحلة القادمة.</p></section><section className="pz-ai-preview"><div className="pz-preview-top"><span>معاينة المحتوى</span><span className="pz-preview-chip">DRAFT</span></div>{aiResult ? <><pre className="pz-ai-result">{aiResult.replace("قطعة مميزة", aiTone === "راقي وفخم" ? "قطعة راقية" : aiTone === "خفيف وشبابي" ? "قطعة زوينة وعصرية" : aiTone === "مباشر وتجاري" ? "اكتشف هاد المنتوج" : "قطعة مميزة")}</pre><button className="pz-copy-button" onClick={() => { if (navigator.clipboard) navigator.clipboard.writeText(aiResult); setNotice("إلا كان النسخ متاح فالمتصفح، المحتوى واجد تلصقو فالمكان اللي بغيتي."); }}>نسخ المحتوى <span>▣</span></button></> : <div className="pz-empty-preview"><div className="pz-empty-art">✳</div><strong>الفكرة ديالك، بداية الحكاية.</strong><p>عمر المعلومات على اليسار وكليكي على زر التحضير باش تظهر مسودة المحتوى هنا.</p></div>}</section></div></>}

          <footer className="pz-footer"><span>PROJECT Z <b>·</b> من المغرب، للعالم.</span><span>نسخة أولية للتجربة <b>✦</b></span></footer>
        </div>
      </section>
    </main>
  );
}
