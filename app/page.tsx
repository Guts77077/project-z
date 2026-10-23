"use client";

import { useState } from "react";

export default function Home() {
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Artisan");
  const [productName, setProductName] = useState("");

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-12">
          <p className="text-sm text-zinc-400">PROJECT Z</p>
          <h1 className="mt-2 text-4xl font-bold">
            AI Commerce Agent
          </h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Upload a product, add the price, and let AI prepare it for selling.
          </p>
        </div>

        <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <h2 className="text-2xl font-semibold">Add Product</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Product photo
              </label>

              <label className="flex min-h-64 cursor-pointer items-center justify-center rounded-xl border border-dashed border-zinc-700 bg-zinc-900 text-zinc-500 hover:border-zinc-500">
                <input type="file" accept="image/*" className="hidden" />
                <span>Click to upload product photo</span>
              </label>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Price (DH)
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Example: 350"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-zinc-400">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 outline-none"
                >
                  <option>Artisan</option>
                  <option>Vintage</option>
                  <option>Fashion</option>
                  <option>Home Decor</option>
                  <option>Jewelry</option>
                </select>
              </div>

              <button
                onClick={() =>
                  setProductName(
                    "AI will generate your product information here"
                  )
                }
                className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-black hover:bg-zinc-200"
              >
                ✨ Generate Product with AI
              </button>
            </div>
          </div>

          {productName && (
            <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900 p-5">
              <p className="text-sm text-zinc-500">AI Preview</p>
              <h3 className="mt-2 text-xl font-semibold">{productName}</h3>

              <div className="mt-4 grid gap-3 text-sm text-zinc-400">
                <p>Price: {price || "—"} DH</p>
                <p>Category: {category}</p>
                <p>Product description: Ready for AI generation.</p>
                <p>Sales message: Ready for AI generation.</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
