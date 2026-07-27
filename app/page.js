"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  UserRound,
  X
} from "lucide-react";

const products = [
  { id: 1, name: "Velvet Cloud Lip Color", category: "Makeup", price: 28, rating: 4.9, reviews: 124, shade: "Rosewood", visual: "lip" },
  { id: 2, name: "The Fluid Tailored Trouser", category: "Wardrobe", price: 128, rating: 4.8, reviews: 86, shade: "Espresso", visual: "trouser" },
  { id: 3, name: "Dew Reset Face Serum", category: "Skincare", price: 48, rating: 4.9, reviews: 203, shade: "30 ml", visual: "serum" },
  { id: 4, name: "Architect Blazer", category: "Wardrobe", price: 188, rating: 4.7, reviews: 59, shade: "Warm Ivory", visual: "blazer" }
];

const productArt = {
  lip: <div className="lip-art"><i /><b /></div>,
  trouser: <div className="trouser-art"><i /><i /></div>,
  serum: <div className="serum-art"><i /><b /></div>,
  blazer: <div className="blazer-art"><i /><b /></div>
};

export default function Home() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const results = useMemo(
    () => products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  function addToCart(product) {
    setCart((current) => {
      const exists = current.find((item) => item.id === product.id);
      return exists
        ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...current, { ...product, qty: 1 }];
    });
    setToast(`${product.name} added to your bag`);
    setTimeout(() => setToast(""), 2600);
  }

  function updateQty(id, delta) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, qty: item.qty + delta } : item)
      .filter((item) => item.qty > 0));
  }

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <main>
      <div className="announcement">
        <span>Complimentary shipping on orders $75+</span>
        <span className="announcement-center">New: The High Summer Edit</span>
        <button>US / USD <ChevronDown size={13} /></button>
      </div>

      <header className="site-header">
        <button className="icon-button mobile-only" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></button>
        <a className="logo" href="#top" aria-label="Sable and Bloom home">
          <span>SABLE</span><i>&</i><span>BLOOM</span>
        </a>
        <nav>
          <button onClick={() => scrollTo("new")}>New In</button>
          <button onClick={() => scrollTo("beauty")}>Beauty</button>
          <button onClick={() => scrollTo("fashion")}>Wardrobe</button>
          <button onClick={() => scrollTo("edit")}>The Edit</button>
        </nav>
        <div className="header-actions">
          <button className="icon-button" aria-label="Search" onClick={() => setSearchOpen(true)}><Search /></button>
          <button className="icon-button hide-mobile" aria-label="Account"><UserRound /></button>
          <button className="icon-button bag-button" aria-label={`Shopping bag with ${cartCount} items`} onClick={() => setCartOpen(true)}>
            <ShoppingBag />
            {cartCount > 0 && <span>{cartCount}</span>}
          </button>
        </div>
      </header>

      <section id="top" className="hero">
        <img src="/images/hero-campaign.png" alt="Model in a sculptural black dress holding a beauty product" />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <p className="eyebrow">The new perspective · 2026</p>
          <h1>Dress the mood.<br /><em>Define the ritual.</em></h1>
          <p>Modern essentials for the face, form and every version of you.</p>
          <div className="hero-buttons">
            <button className="button light" onClick={() => scrollTo("new")}>Shop new arrivals <ArrowRight size={17} /></button>
            <button className="text-link light-link" onClick={() => scrollTo("edit")}>Explore the campaign</button>
          </div>
        </div>
        <div className="hero-index"><b>01</b><span /><small>03</small></div>
      </section>

      <section className="promise-bar">
        <div><Sparkles size={18} /><span><b>Curated with intention</b><small>Beauty and pieces worth keeping</small></span></div>
        <div><span className="line-icon">↺</span><span><b>Easy returns</b><small>30 days to find your fit</small></span></div>
        <div><span className="line-icon">◇</span><span><b>Considered formulas</b><small>Vegan and cruelty-free beauty</small></span></div>
      </section>

      <section id="new" className="section products-section">
        <div className="section-heading">
          <div><p className="eyebrow dark">Just landed</p><h2>The considered collection</h2></div>
          <button className="text-link" onClick={() => scrollTo("beauty")}>View all pieces <ArrowRight size={16} /></button>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card" key={product.id}>
              <div className={`product-image tone-${index + 1}`}>
                {index === 0 && <span className="badge">Bestseller</span>}
                {index === 2 && <span className="badge new">New</span>}
                <button
                  className={`heart ${wishlist.includes(product.id) ? "active" : ""}`}
                  aria-label="Save to wishlist"
                  onClick={() => setWishlist((list) => list.includes(product.id) ? list.filter((id) => id !== product.id) : [...list, product.id])}
                ><Heart size={19} fill={wishlist.includes(product.id) ? "currentColor" : "none"} /></button>
                {productArt[product.visual]}
                <button className="quick-add" onClick={() => addToCart(product)}>Quick add <Plus size={16} /></button>
              </div>
              <div className="product-meta">
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <div className="product-row"><span>${product.price}</span><small><Star size={12} fill="currentColor" /> {product.rating} ({product.reviews})</small></div>
                <p className="shade">{product.shade}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="edit" className="split-editorial">
        <article id="beauty" className="editorial-card beauty">
          <img src="/images/beauty-edit.png" alt="Unbranded beauty products arranged on sculptural stone" />
          <div><p className="eyebrow">Beauty, refined</p><h2>Skin first.<br />Everything else follows.</h2><button className="button light" onClick={() => scrollTo("new")}>Shop beauty <ArrowRight size={17} /></button></div>
        </article>
        <article id="fashion" className="editorial-card fashion">
          <img src="/images/fashion-edit.png" alt="Model wearing modern cream tailoring" />
          <div><p className="eyebrow">The modern uniform</p><h2>Ease, with<br />a point of view.</h2><button className="button light" onClick={() => scrollTo("new")}>Shop wardrobe <ArrowRight size={17} /></button></div>
        </article>
      </section>

      <section className="journal">
        <div className="journal-number">01</div>
        <div className="journal-copy">
          <p className="eyebrow dark">The Sable & Bloom journal</p>
          <h2>Less, but<br /><em>more you.</em></h2>
          <p>We believe personal style is a practice—not a performance. Build a wardrobe and ritual that make room for the person wearing them.</p>
          <button className="text-link">Read our point of view <ArrowRight size={16} /></button>
        </div>
        <blockquote>
          “The best essentials don’t ask you to become someone else.”
          <span>— Mara Ellison, Creative Director</span>
        </blockquote>
      </section>

      <section className="newsletter">
        <p className="eyebrow">Stay in the know</p>
        <h2>A little beauty in your inbox.</h2>
        <p>New arrivals, considered rituals, and 15% off your first order.</p>
        {subscribed ? (
          <div className="success"><Check size={18} /> You’re on the list. Welcome to Sable & Bloom.</div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); if (email) setSubscribed(true); }}>
            <input type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
            <button type="submit">Join us <ArrowRight size={16} /></button>
          </form>
        )}
      </section>

      <footer>
        <div className="footer-brand">
          <a className="logo light-logo" href="#top"><span>SABLE</span><i>&</i><span>BLOOM</span></a>
          <p>Beauty for the ritual.<br />Garments for the living.</p>
          <div className="socials"><button>Instagram</button><button>Pinterest</button><button>TikTok</button></div>
        </div>
        <div className="footer-links">
          <div><h3>Shop</h3><button onClick={() => scrollTo("new")}>New arrivals</button><button onClick={() => scrollTo("beauty")}>Beauty</button><button onClick={() => scrollTo("fashion")}>Wardrobe</button><button>Gift cards</button></div>
          <div><h3>Help</h3><button>Contact us</button><button>Shipping & returns</button><button>Size guide</button><button>FAQ</button></div>
          <div><h3>About</h3><button>Our story</button><button>Our standards</button><button>Journal</button><button>Careers</button></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Sable & Bloom</span><span>Privacy · Terms · Accessibility</span><span>Made with intention</span></div>
      </footer>

      {toast && <div className="toast"><Check size={17} /> {toast}</div>}

      <div className={`drawer-overlay ${cartOpen || menuOpen || searchOpen ? "visible" : ""}`} onClick={() => { setCartOpen(false); setMenuOpen(false); setSearchOpen(false); }} />

      <aside className={`cart-drawer ${cartOpen ? "open" : ""}`} aria-hidden={!cartOpen}>
        <div className="drawer-head"><h2>Your bag <span>{cartCount}</span></h2><button className="icon-button" onClick={() => setCartOpen(false)}><X /></button></div>
        {cart.length === 0 ? (
          <div className="empty-bag"><ShoppingBag size={34} strokeWidth={1.2} /><h3>Your bag is ready for something beautiful.</h3><p>Explore considered essentials for beauty and wardrobe.</p><button className="button dark-button" onClick={() => { setCartOpen(false); scrollTo("new"); }}>Start shopping</button></div>
        ) : (
          <>
            <div className="cart-items">{cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-thumb">{productArt[item.visual]}</div>
                <div><p>{item.category}</p><h3>{item.name}</h3><small>{item.shade}</small><div className="quantity"><button onClick={() => updateQty(item.id, -1)}><Minus size={13} /></button><span>{item.qty}</span><button onClick={() => updateQty(item.id, 1)}><Plus size={13} /></button></div></div>
                <strong>${item.price * item.qty}</strong>
              </div>
            ))}</div>
            <div className="cart-summary"><p><span>Subtotal</span><strong>${cartTotal}</strong></p><small>Shipping and taxes calculated at checkout.</small><button className="button dark-button">Checkout <ArrowRight size={17} /></button></div>
          </>
        )}
      </aside>

      <aside className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="drawer-head"><span className="mini-logo">S&B</span><button className="icon-button" onClick={() => setMenuOpen(false)}><X /></button></div>
        <nav><button onClick={() => scrollTo("new")}>New In <ArrowRight /></button><button onClick={() => scrollTo("beauty")}>Beauty <ArrowRight /></button><button onClick={() => scrollTo("fashion")}>Wardrobe <ArrowRight /></button><button onClick={() => scrollTo("edit")}>The Edit <ArrowRight /></button></nav>
      </aside>

      <div className={`search-panel ${searchOpen ? "open" : ""}`}>
        <div className="search-inner">
          <Search size={25} />
          <input autoFocus={searchOpen} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search beauty, wardrobe and more..." />
          <button className="icon-button" onClick={() => setSearchOpen(false)}><X /></button>
        </div>
        {query && <div className="search-results">{results.length ? results.map((item) => <button key={item.id} onClick={() => { addToCart(item); setSearchOpen(false); }}><span>{item.category}</span>{item.name}<strong>${item.price}</strong></button>) : <p>No results found for “{query}”</p>}</div>}
      </div>
    </main>
  );
}
