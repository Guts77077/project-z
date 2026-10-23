use client";

import { useMemo, useState } from "react";

type Product = {
  name: string;
  price: string;
  category: string;
  status: "Draft" | "Published";
  description: string;
  image?: string;
};

const starterProducts: Product[] = [
  {
    name: "Moroccan Artisan Basket",
    price: "249 DH",
    category: "Artisan",
    status: "Published",
    description: "Handcrafted Moroccan basket with a natural, timeless look."
  }
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>(starterProducts);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Artisan");
  const [image, setImage] = useState<string | undefined>();
  const [generated, setGenerated] = useState(false);

  const stats = useMemo(() => ({
    products: products.length,
    published: products.filter(p => p.status === "Published").length,
    orders: 0,
    revenue: "0 DH"
  }), [products]);

  function generateAI() {
    setGenerated(true);
    if (!name) setName("Moroccan Artisan Product");
  }

  function addProduct() {
    if (!name || !price) return;
    setProducts(prev => [
      ...prev,
      {
        name,
        price: `${price} DH`,
        category,
        status: "Published",
        description: "AI-ready product listing. Connect the AI engine to generate richer copy, SEO, content and sales messages.",
        image
      }
    ]);
    setName("");
    setPrice("");
    setImage(undefined);
    setGenerated(false);
    setShowAdd(false);
  }

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">Z</div>
          <div>
            <strong>PROJECT Z</strong>
            <span>AI SELLER</span>
          </div>
        </div>

        <nav>
          <button className="nav active">⌂ <span>Dashboard</span></button>
          <button className="nav" onClick={() => setShowAdd(true)}>＋ <span>Products</span></button>
          <button className="nav">▣ <span>Orders</span></button>
          <button className="nav">◈ <span>Marketing</span></button>
          <button className="nav">⚙ <span>Settings</span></button>
        </nav>

        <div className="sidebar-note">
          <small>MISSION</small>
          <p>Photo + price → AI does the selling.</p>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">MARRAKECH • MOROCCO</p>
            <h1>Your AI selling operation.</h1>
            <p className="muted">Build products, publish them, then let AI handle the work.</p>
          </div>
          <button className="primary" onClick={() => setShowAdd(true)}>＋ Add product</button>
        </header>

        <section className="stats">
          <div><span>Products</span><strong>{stats.products}</strong></div>
          <div><span>Published</span><strong>{stats.published}</strong></div>
          <div><span>Orders</span><strong>{stats.orders}</strong></div>
          <div><span>Revenue</span><strong>{stats.revenue}</strong></div>
        </section>

        <section className="hero-card">
          <div>
            <p className="eyebrow">THE CORE LOOP</p>
            <h2>One photo. One price. One click.</h2>
            <p>Project Z turns a simple product upload into a complete product listing. Next we connect the AI engine, WhatsApp sales flow, COD orders and marketing automation.</p>
            <button className="primary" onClick={() => setShowAdd(true)}>Create my first product →</button>
          </div>
          <div className="flow">
            <span>📷 Photo</span><b>→</b><span>🤖 AI</span><b>→</b><span>🛍️ Store</span><b>→</b><span>💬 Sales</span>
          </div>
        </section>

        <section className="section-head">
          <div>
            <p className="eyebrow">CATALOG</p>
            <h2>Your products</h2>
          </div>
          <button className="ghost" onClick={() => setShowAdd(true)}>+ New product</button>
        </section>

        <div className="products">
          {products.map((p, i) => (
            <article className="product-card" key={i}>
              <div className="product-image">
                {p.image ? <img src={p.image} alt={p.name} /> : <div className="placeholder">Z</div>}
              </div>
              <div className="product-info">
                <div className="row"><span className="pill">{p.category}</span><span className="status">{p.status}</span></div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <strong className="price">{p.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <p className="eyebrow">NEW PRODUCT</p>
                <h2>Let AI prepare it.</h2>
              </div>
              <button className="close" onClick={() => setShowAdd(false)}>×</button>
            </div>

            <label>Product photo</label>
            <div className="upload">
              {image ? <img src={image} alt="Preview" /> : <><span>📷</span><b>Upload product photo</b><small>JPG, PNG or WEBP</small></>}
              <input type="file" accept="image/*" onChange={e => {
                const file = e.target.files?.[0];
                if (file) setImage(URL.createObjectURL(file));
              }} />
            </div>

            <label>Product name <small>optional</small></label>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Handmade leather babouche" />

            <div className="two">
              <div>
                <label>Price (DH)</label>
                <input value={price} onChange={e => setPrice(e.target.value)} placeholder="249" inputMode="decimal" />
              </div>
              <div>
                <label>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option>Artisan</option>
                  <option>Vintage</option>
                  <option>Fashion</option>
                  <option>Home</option>
                  <option>Gifts</option>
                </select>
              </div>
            </div>

            <button className="ai-button" onClick={generateAI}>✦ Generate with AI {generated && "✓"}</button>
            {generated && <div className="ai-preview">AI preview ready — next step is connecting the real model to generate the title, description, benefits, SEO, FAQ and WhatsApp sales script automatically.</div>}
            <button className="primary full" onClick={addProduct}>Publish product →</button>
          </div>
        </div>
      )}
    </main>
  );
}
