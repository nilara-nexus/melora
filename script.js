/* =========================================================
   MELORA — APPLICATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    /* =====================================================
       STORAGE
    ===================================================== */

    const STORAGE = {
        cart: "melora_cart",
        wishlist: "melora_wishlist",
        users: "melora_users",
        currentUser: "melora_current_user",
        orders: "melora_orders",
        newsletter: "melora_newsletter"
    };

    const getStorage = (key, fallback = []) => {
        try {
            return JSON.parse(localStorage.getItem(key)) || fallback;
        } catch {
            return fallback;
        }
    };

    const setStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    let cart = getStorage(STORAGE.cart);
    let wishlist = getStorage(STORAGE.wishlist);
    let users = getStorage(STORAGE.users);
    let orders = getStorage(STORAGE.orders);
    let currentUser = getStorage(STORAGE.currentUser, null);

    /* =====================================================
       LOADER
    ===================================================== */

    window.addEventListener("load", () => {

        setTimeout(() => {
            document.getElementById("loader")?.classList.add("loaded");
        }, 900);

        startVideo();
        heroEntrance();
    });

    /* =====================================================
       HERO VIDEO
    ===================================================== */

    const heroVideo = document.getElementById("heroVideo");

    if (heroVideo) {

        heroVideo.muted = true;

        const startVideo = async () => {

            try {
                await heroVideo.play();
            } catch (error) {
                console.log(
                    "Video autoplay waiting for browser permission."
                );
            }

        };

        window.startVideo = startVideo;

        window.addEventListener("load", startVideo);

        document.addEventListener("visibilitychange", () => {

            if (document.hidden) {
                heroVideo.pause();
            } else {
                heroVideo.play().catch(() => {});
            }

        });

    }

    /* =====================================================
       GSAP
    ===================================================== */

    if (typeof gsap !== "undefined") {

        gsap.registerPlugin(ScrollTrigger);

    }

    /* =====================================================
       HERO ENTRANCE
    ===================================================== */

    function heroEntrance() {

        if (typeof gsap === "undefined") return;

        const tl = gsap.timeline();

        tl.fromTo(
            ".hero-overlay",
            { opacity: 0.2 },
            {
                opacity: 1,
                duration: 1.8,
                ease: "power2.out"
            }
        )

        .from(
            ".hero-brand",
            {
                opacity: 0,
                y: 25,
                duration: .8
            },
            "-=.9"
        )

        .from(
            ".hero-content h1",
            {
                opacity: 0,
                y: 70,
                duration: 1.1,
                ease: "power4.out"
            },
            "-=.5"
        )

        .from(
            ".hero-content p",
            {
                opacity: 0,
                y: 25,
                duration: .7
            },
            "-=.55"
        )

        .from(
            ".hero-buttons button",
            {
                opacity: 0,
                y: 25,
                stagger: .12,
                duration: .6
            },
            "-=.35"
        )

        .from(
            ".scroll-indicator",
            {
                opacity: 0,
                y: 15,
                duration: .7
            },
            "-=.2"
        );

    }

    /* =====================================================
       HERO PARTICLES
    ===================================================== */

    const particleContainer =
        document.getElementById("heroParticles");

    if (particleContainer) {

        for (let i = 0; i < 35; i++) {

            const particle = document.createElement("span");

            particle.className = "hero-particle";

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.top =
                `${Math.random() * 100}%`;

            particle.style.opacity =
                `${0.15 + Math.random() * .55}`;

            particle.style.transform =
                `scale(${0.5 + Math.random() * 1.5})`;

            particleContainer.appendChild(particle);

            if (typeof gsap !== "undefined") {

                gsap.to(particle, {
                    y: -40 - Math.random() * 80,
                    x: -20 + Math.random() * 40,
                    opacity: 0,
                    duration: 3 + Math.random() * 4,
                    repeat: -1,
                    delay: Math.random() * 4,
                    ease: "sine.inOut"
                });

            }

        }

    }

    /* =====================================================
       MOUSE PARALLAX
    ===================================================== */

    const heroContent =
        document.querySelector(".hero-content");

    if (heroContent && window.matchMedia("(pointer:fine)").matches) {

        window.addEventListener("mousemove", (e) => {

            const x =
                (e.clientX / window.innerWidth - .5) * 12;

            const y =
                (e.clientY / window.innerHeight - .5) * 8;

            heroContent.style.transform =
                `translate(${x}px,${y}px)`;

        });

    }

    /* =====================================================
       HEADER
    ===================================================== */

    const siteHeader =
        document.getElementById("siteHeader");

    window.addEventListener("scroll", () => {

        siteHeader?.classList.toggle(
            "scrolled",
            window.scrollY > 80
        );

    }, { passive: true });

    /* =====================================================
       MOBILE NAV
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const navLinks =
        document.getElementById("navLinks");

    menuToggle?.addEventListener("click", () => {

        navLinks?.classList.toggle("open");

    });

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks?.classList.remove("open");
        });

    });

    /* =====================================================
       SMOOTH HERO BUTTONS
    ===================================================== */

    const smoothScrollTo = (id) => {

        const target = document.querySelector(id);

        if (!target) return;

        window.scrollTo({
            top: target.offsetTop - 70,
            behavior: "smooth"
        });

    };

    document.getElementById("exploreBtn")
        ?.addEventListener("click", () => {
            smoothScrollTo("#experience");
        });

    document.getElementById("shopBtn")
        ?.addEventListener("click", () => {
            smoothScrollTo("#collection");
        });

    /* =====================================================
       GSAP SCROLL REVEALS
    ===================================================== */

    if (
        typeof gsap !== "undefined" &&
        typeof ScrollTrigger !== "undefined"
    ) {

        gsap.utils.toArray(".reveal").forEach(element => {

            gsap.fromTo(
                element,
                {
                    opacity: 0,
                    y: 50
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 88%",
                        once: true
                    }
                }
            );

        });

        gsap.to(".story-circle.circle-one", {
            rotation: 360,
            scrollTrigger: {
                trigger: ".story-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 2
            }
        });

        gsap.to(".cocoa-tree", {
            y: -30,
            scrollTrigger: {
                trigger: ".origin-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });

        gsap.to(".product-3d", {
            y: -35,
            rotationY: 25,
            scrollTrigger: {
                trigger: ".viewer-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });

    }

    /* =====================================================
       BREAK THE BAR
    ===================================================== */

    const breakButton =
        document.getElementById("breakButton");

    const chocolateBar =
        document.getElementById("chocolateBar");

    const breakMessage =
        document.getElementById("breakMessage");

    breakButton?.addEventListener("click", () => {

        chocolateBar.classList.toggle("broken");

        if (chocolateBar.classList.contains("broken")) {

            gsap?.to(breakMessage, {
                opacity: 1,
                scale: 1,
                duration: .5
            });

            breakButton.textContent = "REBUILD THE BAR";

        } else {

            gsap?.to(breakMessage, {
                opacity: 0,
                scale: .8,
                duration: .4
            });

            breakButton.textContent = "BREAK THE BAR";

        }

    });

    /* =====================================================
       PRODUCT DATA
    ===================================================== */

    const productData = {

        "Midnight 72%": {
            price: 24,
            description:
                "Deep cocoa, toasted almond and an elegant lingering finish."
        },

        "Golden Caramel": {
            price: 28,
            description:
                "Silky milk chocolate layered with golden caramel and sea salt."
        },

        "Velvet Berry": {
            price: 30,
            description:
                "Dark cocoa combined with bright red berries and velvet ganache."
        },

        "Hazelnut Nocturne": {
            price: 26,
            description:
                "Roasted hazelnut, deep cocoa and soft praline."
        }

    };

    /* =====================================================
       CART
    ===================================================== */

    function addToCart(name, price, quantity = 1) {

        const existing =
            cart.find(item => item.name === name);

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                id: Date.now(),
                name,
                price,
                quantity
            });
        }

        setStorage(STORAGE.cart, cart);

        updateCartUI();

        showToast(`${name} added to cart`);

    }

    function updateCartUI() {

        const count =
            cart.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

        const total =
            cart.reduce(
                (sum, item) =>
                    sum + item.price * item.quantity,
                0
            );

        const cartCount =
            document.getElementById("cartCount");

        const cartSubtotal =
            document.getElementById("cartSubtotal");

        const checkoutTotal =
            document.getElementById("checkoutTotal");

        if (cartCount)
            cartCount.textContent = count;

        if (cartSubtotal)
            cartSubtotal.textContent =
                `$${total.toFixed(2)}`;

        if (checkoutTotal)
            checkoutTotal.textContent =
                `$${total.toFixed(2)}`;

        renderCart();
    }

    function renderCart() {

        const container =
            document.getElementById("cartItems");

        if (!container) return;

        if (!cart.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <p>Your cart is waiting for a moment.</p>
                </div>
            `;

            return;
        }

        container.innerHTML =
            cart.map(item => `

                <div class="cart-item">

                    <div class="cart-thumb"></div>

                    <div>

                        <h4>${escapeHtml(item.name)}</h4>

                        <p>
                            $${item.price.toFixed(2)}
                        </p>

                        <div class="qty-controls">

                            <button
                                data-action="minus"
                                data-id="${item.id}">
                                −
                            </button>

                            <span>${item.quantity}</span>

                            <button
                                data-action="plus"
                                data-id="${item.id}">
                                +
                            </button>

                        </div>

                    </div>

                    <button
                        class="remove-item"
                        data-action="remove"
                        data-id="${item.id}">
                        ×
                    </button>

                </div>

            `).join("");

    }

    document
        .getElementById("cartItems")
        ?.addEventListener("click", e => {

            const button =
                e.target.closest("[data-action]");

            if (!button) return;

            const id =
                Number(button.dataset.id);

            const action =
                button.dataset.action;

            const item =
                cart.find(i => i.id === id);

            if (!item) return;

            if (action === "plus") {
                item.quantity++;
            }

            if (action === "minus") {

                item.quantity--;

                if (item.quantity <= 0) {
                    cart = cart.filter(i => i.id !== id);
                }

            }

            if (action === "remove") {
                cart = cart.filter(i => i.id !== id);
            }

            setStorage(STORAGE.cart, cart);

            updateCartUI();

        });

    /* =====================================================
       ADD CART BUTTONS
    ===================================================== */

    document
        .querySelectorAll(".add-cart")
        .forEach(button => {

            button.addEventListener("click", () => {

                const card =
                    button.closest(".product-card");

                const name =
                    card.dataset.name;

                const price =
                    Number(card.dataset.price);

                addToCart(name, price);

            });

        });

    /* =====================================================
       QUICK VIEW
    ===================================================== */

    let quickProduct = null;

    const productModal =
        document.getElementById("productModal");

    document
        .querySelectorAll(".quick-view")
        .forEach(button => {

            button.addEventListener("click", () => {

                const name =
                    button.dataset.product;

                quickProduct = name;

                const data =
                    productData[name];

                document.getElementById(
                    "quickProductName"
                ).textContent = name;

                document.getElementById(
                    "quickProductDescription"
                ).textContent = data.description;

                document.getElementById(
                    "quickProductPrice"
                ).textContent =
                    `$${data.price}`;

                productModal.classList.add("open");

                document.body.classList.add("no-scroll");

            });

        });

    document
        .getElementById("quickAddButton")
        ?.addEventListener("click", () => {

            if (!quickProduct) return;

            addToCart(
                quickProduct,
                productData[quickProduct].price
            );

            closeModal(productModal);

        });

    /* =====================================================
       WISHLIST
    ===================================================== */

    function updateWishlistUI() {

        document.getElementById(
            "wishlistCount"
        ).textContent = wishlist.length;

        document
            .querySelectorAll(".product-card")
            .forEach(card => {

                const name = card.dataset.name;

                const button =
                    card.querySelector(".wishlist-btn");

                if (
                    wishlist.some(
                        item => item.name === name
                    )
                ) {
                    button?.classList.add("active");
                    if (button) button.textContent = "♥";
                } else {
                    button?.classList.remove("active");
                    if (button) button.textContent = "♡";
                }

            });

        renderWishlist();
    }

    document
        .querySelectorAll(".wishlist-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                const card =
                    button.closest(".product-card");

                const name =
                    card.dataset.name;

                const price =
                    Number(card.dataset.price);

                const existing =
                    wishlist.find(
                        item => item.name === name
                    );

                if (existing) {

                    wishlist =
                        wishlist.filter(
                            item => item.name !== name
                        );

                    showToast("Removed from wishlist");

                } else {

                    wishlist.push({
                        name,
                        price
                    });

                    showToast("Added to wishlist");

                }

                setStorage(
                    STORAGE.wishlist,
                    wishlist
                );

                updateWishlistUI();

            });

        });

    function renderWishlist() {

        const container =
            document.getElementById("wishlistItems");

        if (!container) return;

        if (!wishlist.length) {

            container.innerHTML = `
                <div class="empty-state">
                    <p>Your wishlist is empty.</p>
                </div>
            `;

            return;
        }

        container.innerHTML =
            wishlist.map(item => `

                <div class="wishlist-item">

                    <div class="wishlist-thumb"></div>

                    <div>
                        <h4>${escapeHtml(item.name)}</h4>
                        <p>$${item.price}</p>
                    </div>

                    <button
                        class="remove-item"
                        data-wishlist-remove="${escapeHtml(item.name)}">
                        ×
                    </button>

                </div>

            `).join("");

    }

    document
        .getElementById("wishlistItems")
        ?.addEventListener("click", e => {

            const button =
                e.target.closest("[data-wishlist-remove]");

            if (!button) return;

            const name =
                button.dataset.wishlistRemove;

            wishlist =
                wishlist.filter(
                    item => item.name !== name
                );

            setStorage(
                STORAGE.wishlist,
                wishlist
            );

            updateWishlistUI();

        });

    /* =====================================================
       DRAWERS
    ===================================================== */

    const backdrop =
        document.getElementById("drawerBackdrop");

    function openDrawer(id) {

        document.getElementById(id)
            ?.classList.add("open");

        backdrop?.classList.add("open");

    }

    function closeDrawer(id) {

        document.getElementById(id)
            ?.classList.remove("open");

        backdrop?.classList.remove("open");

    }

    document
        .getElementById("cartOpen")
        ?.addEventListener("click", () => {
            openDrawer("cartDrawer");
        });

    document
        .getElementById("wishlistOpen")
        ?.addEventListener("click", () => {
            openDrawer("wishlistDrawer");
        });

    document
        .querySelectorAll("[data-drawer]")
        .forEach(button => {

            button.addEventListener("click", () => {

                closeDrawer(
                    button.dataset.drawer
                );

            });

        });

    backdrop?.addEventListener("click", () => {

        closeDrawer("cartDrawer");
        closeDrawer("wishlistDrawer");

    });

    /* =====================================================
       SEARCH
    ===================================================== */

    const searchModal =
        document.getElementById("searchModal");

    document
        .getElementById("searchOpen")
        ?.addEventListener("click", () => {

            searchModal.classList.add("open");

            document.body.classList.add("no-scroll");

            setTimeout(() => {
                document.getElementById("searchInput")?.focus();
            }, 100);

        });

    const searchInput =
        document.getElementById("searchInput");

    searchInput?.addEventListener("input", () => {

        const query =
            searchInput.value.toLowerCase().trim();

        const results =
            Object.keys(productData)
                .filter(name =>
                    name.toLowerCase().includes(query)
                );

        const container =
            document.getElementById("searchResults");

        if (!query) {
            container.innerHTML = "";
            return;
        }

        if (!results.length) {

            container.innerHTML =
                `<p style="color:#a99c91;padding-top:20px">
                    No MELORA moment found.
                </p>`;

            return;
        }

        container.innerHTML =
            results.map(name => `

                <div class="search-result">

                    <span>${escapeHtml(name)}</span>

                    <button
                        data-search-product="${escapeHtml(name)}">
                        VIEW
                    </button>

                </div>

            `).join("");

    });

    document
        .getElementById("searchResults")
        ?.addEventListener("click", e => {

            const button =
                e.target.closest("[data-search-product]");

            if (!button) return;

            const name =
                button.dataset.searchProduct;

            closeModal(searchModal);

            quickProduct = name;

            document.getElementById(
                "quickProductName"
            ).textContent = name;

            document.getElementById(
                "quickProductDescription"
            ).textContent =
                productData[name].description;

            document.getElementById(
                "quickProductPrice"
            ).textContent =
                `$${productData[name].price}`;

            productModal.classList.add("open");

            document.body.classList.add("no-scroll");

        });

    /* =====================================================
       MODALS
    ===================================================== */

    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove("open");

        document.body.classList.remove("no-scroll");

    }

    document
        .querySelectorAll("[data-close]")
        .forEach(button => {

            button.addEventListener("click", () => {

                const modal =
                    document.getElementById(
                        button.dataset.close
                    );

                closeModal(modal);

            });

        });

    document
        .querySelectorAll(".modal")
        .forEach(modal => {

            modal.addEventListener("click", e => {

                if (e.target === modal) {
                    closeModal(modal);
                }

            });

        });

    document.addEventListener("keydown", e => {

        if (e.key === "Escape") {

            document
                .querySelectorAll(".modal.open")
                .forEach(closeModal);

            closeDrawer("cartDrawer");
            closeDrawer("wishlistDrawer");

        }

    });

    /* =====================================================
       3D PRODUCT VIEWER
    ===================================================== */

    const product3D =
        document.getElementById("product3D");

    let viewerRotation = -25;

    function updateViewer() {

        product3D.style.transform =
            `rotateX(-5deg) rotateY(${viewerRotation}deg)`;

    }

    document
        .getElementById("rotateLeft")
        ?.addEventListener("click", () => {

            viewerRotation -= 45;

            updateViewer();

        });

    document
        .getElementById("rotateRight")
        ?.addEventListener("click", () => {

            viewerRotation += 45;

            updateViewer();

        });

    document
        .getElementById("rotateReset")
        ?.addEventListener("click", () => {

            viewerRotation = -25;

            updateViewer();

        });

    /* =====================================================
       CREATE YOUR MELORA
    ===================================================== */

    const boxName =
        document.getElementById("boxName");

    const boxPreviewName =
        document.getElementById("boxPreviewName");

    const boxFlavor =
        document.getElementById("boxFlavor");

    const customBox =
        document.getElementById("customBox");

    boxName?.addEventListener("input", () => {

        boxPreviewName.textContent =
            boxName.value.trim().toUpperCase() ||
            "YOUR MOMENT";

    });

    boxFlavor?.addEventListener("change", () => {

        const value = boxFlavor.value;

        const backgrounds = {
            Midnight:
                "linear-gradient(145deg,#63351e,#1c0c06)",
            Caramel:
                "linear-gradient(145deg,#d09b46,#593514)",
            Berry:
                "linear-gradient(145deg,#782838,#290b12)",
            Hazelnut:
                "linear-gradient(145deg,#80502c,#251208)"
        };

        customBox.style.background =
            backgrounds[value];

    });

    document
        .getElementById("createBoxBtn")
        ?.addEventListener("click", () => {

            const size =
                document.getElementById("boxSize").value;

            const prices = {
                small: 18,
                medium: 32,
                large: 56
            };

            const name =
                boxName.value.trim() ||
                "YOUR MOMENT";

            const flavor =
                boxFlavor.value;

            addToCart(
                `${flavor} Custom Box — ${name}`,
                prices[size]
            );

        });

    /* =====================================================
       REVIEWS
    ===================================================== */

    const reviews =
        [...document.querySelectorAll(".review")];

    let currentReview = 0;

    function showReview(index) {

        reviews.forEach(
            review => review.classList.remove("active")
        );

        reviews[index]?.classList.add("active");

    }

    document
        .getElementById("reviewNext")
        ?.addEventListener("click", () => {

            currentReview =
                (currentReview + 1) % reviews.length;

            showReview(currentReview);

        });

    document
        .getElementById("reviewPrev")
        ?.addEventListener("click", () => {

            currentReview =
                (currentReview - 1 + reviews.length)
                % reviews.length;

            showReview(currentReview);

        });

    /* =====================================================
       FAQ
    ===================================================== */

    document
        .querySelectorAll(".faq-question")
        .forEach(question => {

            question.addEventListener("click", () => {

                const item =
                    question.parentElement;

                document
                    .querySelectorAll(".faq-item")
                    .forEach(other => {

                        if (other !== item) {
                            other.classList.remove("open");
                        }

                    });

                item.classList.toggle("open");

            });

        });

    /* =====================================================
       NEWSLETTER
    ===================================================== */

    document
        .getElementById("newsletterForm")
        ?.addEventListener("submit", e => {

            e.preventDefault();

            const email =
                document.getElementById(
                    "newsletterEmail"
                ).value.trim();

            if (!email) return;

            let subscribers =
                getStorage(
                    STORAGE.newsletter
                );

            if (!subscribers.includes(email)) {
                subscribers.push(email);
            }

            setStorage(
                STORAGE.newsletter,
                subscribers
            );

            document.getElementById(
                "newsletterMessage"
            ).textContent =
                "Welcome to the MELORA circle.";

            e.target.reset();

        });

    /* =====================================================
       CONTACT
    ===================================================== */

    document
        .getElementById("contactForm")
        ?.addEventListener("submit", e => {

            e.preventDefault();

            const name =
                document.getElementById(
                    "contactName"
                ).value.trim();

            document.getElementById(
                "contactStatus"
            ).textContent =
                `Thank you, ${name}. Your message has been received.`;

            e.target.reset();

        });

    /* =====================================================
       OFFER
    ===================================================== */

    document
        .getElementById("offerBtn")
        ?.addEventListener("click", () => {

            smoothScrollTo("#newsletter");

            document.getElementById(
                "newsletterEmail"
            )?.focus();

            showToast(
                "Enter your email to claim 15% off."
            );

        });

    /* =====================================================
       AUTH
    ===================================================== */

    let authMode = "login";

    const profileModal =
        document.getElementById("profileModal");

    const authTitle =
        document.getElementById("authTitle");

    const authName =
        document.getElementById("authName");

    const authSubmitText =
        document.getElementById("authSubmitText");

    const loginTab =
        document.getElementById("loginTab");

    const signupTab =
        document.getElementById("signupTab");

    function setAuthMode(mode) {

        authMode = mode;

        if (mode === "login") {

            loginTab.classList.add("active");
            signupTab.classList.remove("active");

            authTitle.innerHTML =
                `Welcome <em>back.</em>`;

            authSubmitText.textContent =
                "LOGIN";

            authName.classList.add("hidden");

        } else {

            signupTab.classList.add("active");
            loginTab.classList.remove("active");

            authTitle.innerHTML =
                `Create your <em>moment.</em>`;

            authSubmitText.textContent =
                "CREATE ACCOUNT";

            authName.classList.remove("hidden");

        }

    }

    loginTab?.addEventListener(
        "click",
        () => setAuthMode("login")
    );

    signupTab?.addEventListener(
        "click",
        () => setAuthMode("signup")
    );

    document
        .getElementById("profileOpen")
        ?.addEventListener("click", () => {

            profileModal.classList.add("open");

            document.body.classList.add("no-scroll");

            renderProfile();

        });

    document
        .getElementById("footerLogin")
        ?.addEventListener("click", e => {

            e.preventDefault();

            profileModal.classList.add("open");

            document.body.classList.add("no-scroll");

            renderProfile();

        });

    document
        .getElementById("authForm")
        ?.addEventListener("submit", e => {

            e.preventDefault();

            const email =
                document.getElementById(
                    "authEmail"
                ).value.trim().toLowerCase();

            const password =
                document.getElementById(
                    "authPassword"
                ).value;

            const message =
                document.getElementById(
                    "authMessage"
                );

            if (password.length < 6) {

                message.textContent =
                    "Password must contain at least 6 characters.";

                return;

            }

            if (authMode === "signup") {

                const name =
                    authName.value.trim();

                if (name.length < 2) {

                    message.textContent =
                        "Please enter your full name.";

                    return;

                }

                if (
                    users.some(
                        user => user.email === email
                    )
                ) {

                    message.textContent =
                        "An account with this email already exists.";

                    return;

                }

                const user = {
                    id: Date.now(),
                    name,
                    email,
                    password
                };

                users.push(user);

                setStorage(
                    STORAGE.users,
                    users
                );

                currentUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };

                setStorage(
                    STORAGE.currentUser,
                    currentUser
                );

                message.textContent =
                    "Account created successfully.";

                setTimeout(renderProfile, 500);

            } else {

                const user =
                    users.find(
                        user =>
                            user.email === email &&
                            user.password === password
                    );

                if (!user) {

                    message.textContent =
                        "Invalid email or password.";

                    return;

                }

                currentUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };

                setStorage(
                    STORAGE.currentUser,
                    currentUser
                );

                message.textContent =
                    "Login successful.";

                setTimeout(renderProfile, 400);

            }

        });

    function renderProfile() {

        const authView =
            document.getElementById("authView");

        const profileView =
            document.getElementById("profileView");

        if (!currentUser) {

            authView.classList.remove("hidden");
            profileView.classList.add("hidden");

            return;

        }

        authView.classList.add("hidden");
        profileView.classList.remove("hidden");

        document.getElementById(
            "profileName"
        ).textContent =
            currentUser.name;

        document.getElementById(
            "profileEmail"
        ).textContent =
            currentUser.email;

        document.getElementById(
            "profileAvatar"
        ).textContent =
            currentUser.name
                .charAt(0)
                .toUpperCase();

        const userOrders =
            orders.filter(
                order =>
                    order.email === currentUser.email
            );

        const spent =
            userOrders.reduce(
                (sum, order) =>
                    sum + order.total,
                0
            );

        document.getElementById(
            "profileOrders"
        ).textContent =
            userOrders.length;

        document.getElementById(
            "profileWishlist"
        ).textContent =
            wishlist.length;

        document.getElementById(
            "profileSpent"
        ).textContent =
            `$${spent.toFixed(0)}`;

    }

    document
        .getElementById("logoutButton")
        ?.addEventListener("click", () => {

            currentUser = null;

            localStorage.removeItem(
                STORAGE.currentUser
            );

            renderProfile();

            setAuthMode("login");

            document.getElementById(
                "authMessage"
            ).textContent = "";

        });

    /* =====================================================
       CHECKOUT
    ===================================================== */

    const checkoutModal =
        document.getElementById("checkoutModal");

    document
        .getElementById("checkoutButton")
        ?.addEventListener("click", () => {

            if (!cart.length) {

                showToast("Your cart is empty.");

                return;

            }

            checkoutModal.classList.add("open");

            document.body.classList.add("no-scroll");

            if (currentUser) {

                document.getElementById(
                    "checkoutName"
                ).value =
                    currentUser.name;

                document.getElementById(
                    "checkoutEmail"
                ).value =
                    currentUser.email;

            }

        });

    document
        .getElementById("checkoutForm")
        ?.addEventListener("submit", e => {

            e.preventDefault();

            if (!cart.length) return;

            const name =
                document.getElementById(
                    "checkoutName"
                ).value.trim();

            const email =
                document.getElementById(
                    "checkoutEmail"
                ).value.trim();

            const address =
                document.getElementById(
                    "checkoutAddress"
                ).value.trim();

            const total =
                cart.reduce(
                    (sum, item) =>
                        sum + item.price * item.quantity,
                    0
                );

            const order = {
                id: "MLR-" + Date.now(),
                name,
                email,
                address,
                items: [...cart],
                total,
                date: new Date().toISOString()
            };

            orders.push(order);

            setStorage(
                STORAGE.orders,
                orders
            );

            cart = [];

            setStorage(
                STORAGE.cart,
                cart
            );

            updateCartUI();

            document.getElementById(
                "checkoutStatus"
            ).textContent =
                `Order ${order.id} placed successfully.`;

            showToast("Order placed successfully.");

            setTimeout(() => {

                closeModal(checkoutModal);

                document.getElementById(
                    "checkoutForm"
                ).reset();

                document.getElementById(
                    "checkoutStatus"
                ).textContent = "";

            }, 1800);

        });

    /* =====================================================
       OFFER / NEWSLETTER TARGET
    ===================================================== */

    const newsletterSection =
        document.querySelector(".newsletter-section");

    if (newsletterSection) {
        newsletterSection.id = "newsletter";
    }

    /* =====================================================
       PRODUCT DISCOVER BUTTONS
    ===================================================== */

    document
        .querySelectorAll("[data-product]")
        .forEach(button => {

            if (
                button.classList.contains("quick-view")
            ) return;

            button.addEventListener("click", () => {

                const name =
                    button.dataset.product;

                if (!productData[name]) return;

                quickProduct = name;

                document.getElementById(
                    "quickProductName"
                ).textContent = name;

                document.getElementById(
                    "quickProductDescription"
                ).textContent =
                    productData[name].description;

                document.getElementById(
                    "quickProductPrice"
                ).textContent =
                    `$${productData[name].price}`;

                productModal.classList.add("open");

                document.body.classList.add("no-scroll");

            });

        });

    /* =====================================================
       STORY BUTTON
    ===================================================== */

    document
        .getElementById("storyButton")
        ?.addEventListener("click", () => {

            showToast(
                "MELORA — chocolate crafted around moments."
            );

        });

    /* =====================================================
       TOAST
    ===================================================== */

    let toastTimer;

    function showToast(message) {

        const toast =
            document.getElementById("toast");

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

            }, 2500);

    }

    /* =====================================================
       SECURITY / HTML ESCAPE
    ===================================================== */

    function escapeHtml(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }

    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateCartUI();
    updateWishlistUI();
    renderProfile();

});