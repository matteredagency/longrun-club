"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { getRelatedProducts } from "@/data/products";

const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 75;

export default function CartPage() {
  const { items, removeItem, updateQty, total, count } = useCart();
  const searchParams = useSearchParams();
  const [promoCode, setPromoCode] = useState("");
  const related = getRelatedProducts("", 4);

  useEffect(() => {
    const code = searchParams.get("discount_code");
    if (code) setPromoCode(code);
  }, [searchParams]);
  const tax = total * TAX_RATE;
  const shipping = total >= FREE_SHIPPING_THRESHOLD ? 0 : 9.95;
  const orderTotal = total + tax + shipping;

  return (
    <>
      <Header />
      <main className="px-8 sm:px-12 lg:px-20 py-12 min-h-[70vh]">
        {/* Title */}
        <div className="flex items-baseline gap-3 mb-10">
          <h1 className="text-[2.2rem] font-bold tracking-[-1.5px]">YOUR CART</h1>
          <span className="text-[#6b7280] font-light">({count} {count === 1 ? "item" : "items"})</span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#6b7280] text-lg font-light mb-6">Your cart is empty.</p>
            <Link href="/women" className="px-8 py-4 rounded-lg bg-[#111827] text-white font-medium text-sm hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
            {/* Cart Items */}
            <div className="flex flex-col">
              {items.map((item, i) => (
                <div key={`${item.id}-${item.color}-${item.size}`}>
                  {i > 0 && <div className="h-px bg-black/8" />}
                  <div className="flex items-center gap-5 py-6">
                    <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-[#F3F4F6]">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#111827] text-sm truncate">{item.name}</p>
                      <p className="text-[#6b7280] text-xs mt-0.5">{item.color} · Size {item.size}</p>
                    </div>
                    {/* Qty */}
                    <div className="flex items-center border border-black/15 rounded-lg overflow-hidden">
                      <button onClick={() => updateQty(item.id, item.color, item.size, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center text-[#111827] hover:bg-[#F3F4F6] transition-colors text-lg">−</button>
                      <span className="w-9 h-9 flex items-center justify-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.color, item.size, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center text-[#111827] hover:bg-[#F3F4F6] transition-colors text-lg">+</button>
                    </div>
                    <p className="font-bold text-[#111827] text-base w-16 text-right">${(item.price * item.quantity).toFixed(0)}</p>
                    <button onClick={() => removeItem(item.id, item.color, item.size)} className="text-[#6b7280] hover:text-[#111827] transition-colors p-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </button>
                  </div>
                </div>
              ))}
              <div className="h-px bg-black/8" />

              {/* Continue Shopping */}
              <Link href="/women" className="mt-6 text-sm text-[#3B82F6] font-medium hover:opacity-70 transition-opacity inline-flex items-center gap-1">
                ← Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl border border-black/8 p-7 h-fit">
              <h2 className="text-lg font-bold text-[#111827] mb-6">Order Summary</h2>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Shipping</span>
                  <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6b7280]">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo code */}
              <form className="flex gap-2 mb-6" onSubmit={e => e.preventDefault()}>
                <input type="text" placeholder="Promo code" value={promoCode} onChange={e => setPromoCode(e.target.value)} className="flex-1 px-4 py-2.5 rounded-lg border border-black/15 text-sm outline-none focus:border-[#3B82F6] transition-all" />
                <button type="submit" className="px-4 py-2.5 rounded-lg bg-[#F3F4F6] text-[#111827] text-sm font-medium hover:bg-black/10 transition-colors">Apply</button>
              </form>

              <div className="h-px bg-black/8 mb-6" />

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-[#111827]">Total</span>
                <span className="text-2xl font-bold text-[#111827]">${orderTotal.toFixed(2)}</span>
              </div>

              <button className="w-full py-4 rounded-lg bg-[#111827] text-white font-medium text-sm hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 mb-4">
                Proceed to Checkout
              </button>

              <p className="text-center text-xs text-green-600 font-medium mb-4">
                🚚 Free shipping on orders over $75
              </p>

              {/* Payment icons */}
              <div className="flex justify-center gap-2 flex-wrap">
                {["VISA", "MC", "AMEX", "PYPL", "APAY"].map(p => (
                  <span key={p} className="px-2 py-1 rounded border border-black/10 text-[9px] font-medium text-[#6b7280] tracking-wide">{p}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* You May Also Like */}
        <section className="mt-24 pt-16 border-t border-black/8">
          <h2 className="text-2xl font-bold tracking-[-1px] mb-8">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
