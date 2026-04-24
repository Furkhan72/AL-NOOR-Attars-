const PHONE = "9515932347";
let cart = [];

const products = [

{ name:"Maliki-al-Oudh", mrp:399, price:150, notes:"Maliki Oud • Hunain",
  img:"MALIKI OUD.jpeg" },

{ name:"Najdiya intense", mrp:399, price:150, notes:"Najdiya • Hunain",
  img:"NAJDIYA.jpeg" },

{ name:"Velvet-al-oud", mrp:399, price:150, notes:"velvet • Hunain",
  img:"VELVET OUD.jpeg" },

{ name:"Gulab", mrp:299, price:100, notes:"Gulab • rose",
  img:"GULAB.jpeg" },

{ name:"Black-oud", mrp:299, price:100, notes:"Black oud • oud",
  img:"BLACK OUD.jpeg" },

{ name:"Ice Burg", mrp:299, price:100, notes:"Ice Burg • cool",
  img:"ICE BURG.jpeg" },

{ name:"Indigo", mrp:299, price:100, notes:"Indigo • cool",
  img:"INDIGO.jpeg" },

{ name:"MAGNET", mrp:299, price:100, notes:"Magnet • cool",
  img:"MAGNET 555.jpeg" },

{ name:"Intense", mrp:299, price:100, notes:"Intense",
  img:"INTENSE.jpeg" },

{ name:"White-oud", mrp:299, price:100, notes:"white oud • oud",
  img:"MALIKI OUD.jpeg" },

{ name:"Kasturi musk", mrp:299, price:100, notes:"Kasturi musk • musk",
  img:"KASTURI MUSK.jpeg" },

{ name:"Musk Amber", mrp:299, price:100, notes:"Musk amber • musk",
  img:"MUSK AMBER.jpeg" }

];

function initProducts() {
    const grid = document.getElementById("product-grid");
    grid.innerHTML = products.map((p) => {
        let discount = Math.round(((p.mrp-p.price)/p.mrp)*100);
        return `
            <div class="premium-card group p-4 rounded-sm reveal">
                <div class="relative overflow-hidden mb-8 aspect-[4/5]">
                    <div class="absolute top-4 left-4 z-10 bg-[#d4af37]/90 text-[#040d08] text-[9px] font-bold px-3 py-1 tracking-widest">
                        -${discount}%
                    </div>
                    <img src="${p.img}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.8s] group-hover:scale-110 opacity-80 group-hover:opacity-100">
                </div>
                
                <h3 class="serif text-lg mb-2 tracking-wide">${p.name}</h3>
                <p class="text-[9px] text-gray-500 uppercase tracking-[0.2em] mb-8 h-8 font-light">${p.notes}</p>
                
                <div class="flex items-center justify-between">
                    <div>
                        <div class="text-[#d4af37] text-lg font-light tracking-wider">₹${p.price}</div>
                        <div class="text-[10px] text-gray-600 line-through">₹${p.mrp}</div>
                    </div>
                    <button onclick="addToCart('${p.name}',${p.price})" class="btn-buy px-5 py-3 font-bold">
                        Add
                    </button>
                </div>
            </div>
        `;
    }).join("");
    handleScroll();
}

window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    window.scrollY > 50 ? nav.classList.add('scrolled', 'py-5') : nav.classList.remove('scrolled', 'py-8');
    handleScroll();
});

function handleScroll() {
    document.querySelectorAll('.reveal').forEach(r => {
        if(r.getBoundingClientRect().top < window.innerHeight - 50) r.classList.add('active');
    });
}

function addToCart(name, price) {
    let item = cart.find(i => i.name === name);
    item ? item.qty++ : cart.push({name, price, qty:1});
    updateCart();
    toggleCart();
}

function updateCart() {
    const container = document.getElementById("cart-items");
    let total = 0, count = 0;
    container.innerHTML = "";
    cart.forEach((item, i) => {
        let sum = item.price * item.qty;
        total += sum; count += item.qty;
        container.innerHTML += `
            <div class="flex justify-between items-start border-b border-white/5 pb-8 group">
                <div>
                    <h4 class="serif text-xs tracking-[0.2em] uppercase mb-4">${item.name}</h4>
                    <div class="flex items-center gap-6">
                        <button onclick="changeQty(${i},-1)" class="opacity-30 hover:opacity-100 hover:text-[#d4af37] transition-all text-lg">—</button>
                        <span class="text-xs font-light">${item.qty}</span>
                        <button onclick="changeQty(${i},1)" class="opacity-30 hover:opacity-100 hover:text-[#d4af37] transition-all text-lg">+</button>
                    </div>
                </div>
                <span class="text-[#d4af37] text-sm font-light tracking-widest">₹${sum}</span>
            </div>
        `;
    });
    document.getElementById("total-price").innerText = total.toLocaleString();
    document.getElementById("cart-count").innerText = count;
}

function changeQty(i, val) {
    cart[i].qty += val;
    if (cart[i].qty <= 0) cart.splice(i, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("translate-x-full");
}

function checkout() {
    if (cart.length === 0) return;

    let text = "✨━━━━━━━━━━━━✨\n";
    text += "        *AL NOOR*\n";
    text += "   _The House of Rare Attars_\n";
    text += "✨━━━━━━━━━━━━✨\n\n";

    text += "🛍️ *YOUR ORDER*\n";
    text += "────────────────────\n";

    let grandTotal = 0;

    cart.forEach((i, index) => {
        let itemTotal = i.price * i.qty;
        grandTotal += itemTotal;

        text += `*${index + 1}. ${i.name}*\n`;
        text += `   ₹${i.price} × ${i.qty} = ₹${itemTotal}\n\n`;
    });

    text += "────────────────────\n";

    text += `💰 *TOTAL AMOUNT*\n`;
    text += `✨ ₹${grandTotal}\n\n`;

    text += "🚚 _Fast & Secure Delivery_\n\n";

    text += "🤍 Thank you for choosing *AL SARA*\n";
    text += "🌿 Experience Luxury in Every Drop\n\n";

    text += "✨━━━━━━━━━━━━━━━━━━━✨";

    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`);
}
window.onload = initProducts;

