// App.js
const { useState, useEffect, useRef } = React;

/** SHIPPING ADDRESSES MAPPING */
const shippingAddresses = {
  NL: { address_line1: "Kerkstraat 1", city: "Amsterdam", state: "", zip: "1012JS", country: "NL" },
  SA: { address_line1: "King Fahd Road", city: "Riyadh", state: "Riyadh", zip: "11564", country: "SA" },
  FR: { address_line1: "10 Rue de Rivoli", city: "Paris", state: "", zip: "75001", country: "FR" },
  PL: { address_line1: "ul. Marszałkowska 1", city: "Warsaw", state: "", zip: "00-001", country: "PL" },
  PT: { address_line1: "Av. da Liberdade 100", city: "Lisbon", state: "", zip: "1250-096", country: "PT" },
  BE: { address_line1: "Rue Neuve 1", city: "Brussels", state: "", zip: "1000", country: "BE" },
  // CN: { address_line1: "No.1 Zhongshan Road", city: "Shanghai", state: "", zip: "200000", country: "CN" },
  // HK: { address_line1: "1 Queen's Road Central", city: "Hong Kong", state: "", zip: "", country: "HK" },
  "United Kingdom": { address_line1: "221B Baker Street", city: "London", zip: "NW1 6XE", country: "GB" },
  AT: { address_line1: "Stephansplatz 1", city: "Vienna", state: "", zip: "1010", country: "AT" }
};

/** THEME CONFIGS */
const themeConfigs = {
  default: {
    name: "Default",
    colorBackground: "#ffffff",
    colorAction: "#007BFF",
    colorText: "#333333",
    colorFormBackground: "#ffffff",
    colorFormBorder: "#e0e0e0",
    colorBorder: "#e0e0e0",
    colorDisabled: "#c0c0c0",
    colorError: "#ff3b30",
    colorSuccess: "#34c759",
    colorInverse: "#ffffff",
    colorOutline: "#dcdcdc",
    colorSecondary: "#8e8e93",
    borderRadius: ["0.75rem", "0.75rem"],
    button: { fontFamily: "'Roboto', sans-serif", fontSize: "16px", fontWeight: 500, transition: "background 0.3s ease" },
    input: { fontFamily: "'Roboto', sans-serif", fontSize: "16px", fontWeight: 400 },
    label: { fontFamily: "'Roboto', sans-serif", fontSize: "14px", fontWeight: 500 }
  },
  midnight: {
    name: "Midnight",
    colorBackground: "#0A0A0C",
    colorFormBackground: "#1F1F1F",
    colorFormBorder: "#1F1F1F",
    colorBorder: "#68686C",
    colorText: "#F9F9FB",
    colorSecondary: "#828388",
    colorAction: "#5E48FC",
    colorOutline: "#ADA4EC",
    colorSuccess: "#2ECC71",
    colorError: "#FF3300",
    colorDisabled: "#64646E",
    colorInverse: "#F9F9FB",
    borderRadius: ["8px", "8px"],
    button: {
      fontFamily:
        "'Roboto Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 700
    },
    input: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: 400
    },
    label: {
      fontFamily:
        "'Roboto Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 400
    }
  },
  simplicity: {
    name: "Simplicity",
    colorBackground: "#ffffff",
    colorBorder: "#CED0D1",
    colorText: "#09182B",
    colorSecondary: "#828687",
    colorAction: "#000000",
    colorOutline: "#FFFFFF",
    colorSuccess: "#3CB628",
    colorError: "#8B3232",
    colorDisabled: "#AAAAAA",
    colorInverse: "#ffffff",
    colorFormBackground: "#F5F5F5",
    colorFormBorder: "#F5F5F5",
    borderRadius: ["0px", "0px"],
    button: {
      fontFamily:
        "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 500,
      letterSpacing: 0,
      transition: "background 0.3s ease"
    },
    input: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: 400,
      letterSpacing: 0
    },
    label: {
      fontFamily:
        "'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 500,
      letterSpacing: 0
    }
  },
  grapefruit: {
    name: "Grapefruit",
    colorBackground: "#F7F7F5",
    colorBorder: "#F2F2F2",
    colorText: "#000000",
    colorSecondary: "#000000",
    colorAction: "#E05650",
    colorOutline: "#E1AAA8",
    colorSuccess: "#06DDB2",
    colorError: "#ff0000",
    colorDisabled: "#BABABA",
    colorInverse: "#F2F2F2",
    colorFormBackground: "#FFFFFF",
    colorFormBorder: "#DFDFDF",
    borderRadius: ["8px", "50px"],
    button: {
      fontFamily:
        "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "24px",
      fontWeight: 700
    },
    input: {
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "16px",
      lineHeight: "20px",
      fontWeight: 400
    },
    label: {
      fontFamily:
        "Lato, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'Noto Sans', 'Liberation Sans', Arial, sans-serif",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: 400
    }
  }
};

/** Helper Functions for Localisation **/
function getCurrency(localisation) {
  switch (localisation) {
    case "NL":
    case "FR":
    case "PL":
    case "PT":
    case "BE":
    case "AT":
      return "EUR";
    case "SA":
      return "SAR";
    // case "CN":
    //   return "CNY";
    // case "HK":
    //   return "HKD";
    default:
      return "GBP";
  }
}

function getLocale(localisation) {
  switch (localisation) {
    case "NL":
      return "nl";
    case "SA":
      return "ar";
    case "FR":
      return "fr";
    case "PL":
      return "pl";
    case "PT":
      return "pt";
    case "BE":
      return "nl";
    case "AT":
      return "de-AT";
    default:
      return "en-GB";
  }
}

function getDeliveryFee(localisation) {
  // Returns fee in cents
  switch (localisation) {
    case "NL":
    case "FR":
    case "PL":
    case "PT":
    case "BE":
    case "AT":
      return 500;
    case "SA":
      return 2000;
    // case "CN":
    // case "HK":
    //   return 1000;
    default:
      return 450;
  }
}

/** Build Flow appearance */
function buildFlowAppearance(theme) {
  return {
    colorAction: theme.colorAction,
    colorBackground: theme.colorFormBackground,
    colorBorder: theme.colorBorder,
    colorDisabled: theme.colorDisabled,
    colorError: theme.colorError,
    colorFormBackground: theme.colorFormBackground,
    colorFormBorder: theme.colorFormBorder,
    colorInverse: theme.colorInverse,
    colorOutline: theme.colorOutline,
    colorPrimary: theme.colorText,
    colorSecondary: theme.colorSecondary || theme.colorText,
    colorSuccess: theme.colorSuccess || "#2ECC71",
    button: theme.button,
    input: theme.input,
    label: theme.label,
    borderRadius: theme.borderRadius
  };
}

/** PRODUCTS */
const products = [
  { id: 1, name: "Polo shirt", price: 24.99, rating: 4, image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop", description: "A stylish, comfortable polo for everyday wear." },
  { id: 2, name: "Headphones", price: 19.99, rating: 5, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop", description: "Noise-cancelling headphones with a sleek design." },
  { id: 3, name: "Sunglasses", price: 14.99, rating: 4, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop", description: "Protect your eyes with these stylish sunglasses." },
  { id: 4, name: "Boots", price: 35.99, rating: 4, image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=800&auto=format&fit=crop", description: "Durable boots for all terrains." },
  { id: 5, name: "Event ticket", price: 2.00, rating: 3, image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop", description: "Access to an exciting event or show." },
  { id: 6, name: "Backpack", price: 35.99, rating: 4, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop", description: "Spacious backpack, perfect for travel or commuting." },
  { id: 7, name: "Laptop", price: 849.99, rating: 4, image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=800&auto=format&fit=crop", description: "Powerful and sleek laptop for work and entertainment." },
  { id: 8, name: "Food delivery", price: 18.99, rating: 4, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop", description: "Get your favorite meals delivered fresh and fast." },
  { id: 9, name: "Handbag", price: 499.99, rating: 5, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop", description: "Luxurious handbag, crafted from premium materials." }
];

// Recommended product IDs and items (for the Product Details page)
const recommendedIds = [2, 3, 4];
const recommendedItems = recommendedIds.map(id => products.find(p => p.id === id));

/**
 * Express Checkout enabled methods.
 */
function getExpressEnabledMethods(localisation) {
  if (localisation === "NL") {
    return ["googlepay", "ideal", "klarna"];
  } else if (localisation === "SA") {
    return ["googlepay", "tamara", "stcpay"];
  } else if (localisation === "FR") {
    return ["googlepay", "alma", "sepa"];
  } else if (localisation === "PL") {
    return ["googlepay", "p24"];
  } else if (localisation === "PT") {
    return ["googlepay", "multibanco", "mbway"];
  } else if (localisation === "BE") {
    return ["googlepay", "bancontact"];
  } else if (localisation === "AT") {
    return ["googlepay", "eps"];
  } else {
    return ["googlepay"];
  }
}

/**
 * ProductDetailPage Component
 */
function ProductDetailPage({ productId, theme, themeConfig, onAddToCart, onViewDetail, onBackToProducts, globalLocalisation }) {
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const checkoutRef = useRef(null);
  const localCurrency = getCurrency(globalLocalisation);
  const localLocale = getLocale(globalLocalisation);

  useEffect(() => {
    const found = products.find(p => p.id === productId);
    setProduct(found);
    return () => {
      if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
        checkoutRef.current.destroy();
      }
    };
  }, [productId]);

  useEffect(() => {
    if (!product) return;
    initializeExpressCheckout();
    return () => {
      if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
        checkoutRef.current.destroy();
      }
    };
  }, [product, theme, globalLocalisation]);

  async function initializeExpressCheckout() {
    try {
      const amount = Math.round(product.price * 100);
      const items = [{
        name: product.name,
        quantity: 1,
        reference: "SKU-" + product.id,
        unit_price: amount,
        total_amount: amount
      }];
      const billingAddress = shippingAddresses[globalLocalisation] || shippingAddresses["United Kingdom"];
      const enabledMethods = getExpressEnabledMethods(globalLocalisation);
      const response = await fetch("/api/create-payment-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: items[0].total_amount,
          currency: localCurrency,
          items,
          customer: { email: "john.doe@example.com", name: "John Doe" },
          billing: { address: billingAddress },
          description: "Your order from StoreFront",
          payment_method_configuration: {},
          enabled_payment_methods: enabledMethods,
          disabled_payment_methods: []
        })
      });
      if (!response.ok) throw new Error("Failed to create payment session");
      const paymentSession = await response.json();
      const appearance = buildFlowAppearance(themeConfig);
      const checkout = await CheckoutWebComponents({
        publicKey: "pk_sbox_e5v4rg3sztzmdusp47pvdg53kmc",
        environment: "sandbox",
        paymentSession,
        locale: localLocale,
        appearance,
        onReady: () => { console.log("Express Checkout ready (product detail)."); },
        onPaymentCompleted: (_component, result) => {
          console.log("Payment completed, full result:", result);
          
          try {
            // Get the session ID directly from the paymentSession object
            const responseToSave = {
              ...result,
              session_id: paymentSession.id  // This is the ps_xxx ID from the session creation
            };
            
            console.log("Saving payment response with session ID:", responseToSave);
            
            // Store in both storages
            sessionStorage.setItem("paymentResponse", JSON.stringify(responseToSave));
            localStorage.setItem("paymentResponse", JSON.stringify(responseToSave));
            
            // Redirect with session ID in URL
            window.location.href = `/success?session_id=${paymentSession.id}`;
          } catch (error) {
            console.error("Error saving payment data:", error);
            window.location.href = "/success";
          }
        },
        onError: (err) => {
          console.error("Express checkout error:", err);
          setErrorMessage(err.message || "Express checkout failed.");
        }
      });
      checkoutRef.current = checkout;
      const flow = checkout.create("flow");
      flow.mount("#express-checkout-container");
    } catch (err) {
      console.error("init error:", err);
      setErrorMessage("Could not initialize express checkout.");
    }
  }

  if (!product) {
    return (
      <div style={{ padding: "2rem" }}>
        <p style={{ fontStyle: "italic" }}>Product not found.</p>
        <button onClick={onBackToProducts} style={{ background: "none", border: "none", color: themeConfig.colorSecondary, textDecoration: "underline", cursor: "pointer" }}>
          Return to all products
        </button>
      </div>
    );
  }

  const ratingStars = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
  const pageStyle = { backgroundColor: themeConfig.colorBackground, color: themeConfig.colorText, minHeight: "100vh", padding: "2rem" };
  const containerStyle = { maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" };
  const mainButtonStyle = {
    backgroundColor: themeConfig.colorAction,
    border: "none",
    color: themeConfig.colorInverse,
    borderRadius: themeConfig.borderRadius[0],
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    transition: "background 0.3s ease"
  };

  // Adjust the container style based on the number of express checkout methods
  const enabledMethods = getExpressEnabledMethods(globalLocalisation);
  const checkoutContainerStyle = {
    marginTop: "1.5rem",
    minHeight: enabledMethods.length === 1 ? "120px" : "200px",
    backgroundColor: themeConfig.colorFormBackground,
    borderRadius: themeConfig.borderRadius[0],
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
  };

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <button style={{ background: "none", border: "none", color: themeConfig.colorSecondary, marginBottom: "1rem", cursor: "pointer", fontSize: "0.9rem", textDecoration: "underline" }} onClick={onBackToProducts}>
          ← Back to all products
        </button>
      </div>
      <div style={containerStyle}>
        <div style={{ textAlign: "center" }}>
          <div style={{ 
            width: "100%", 
            height: "400px", 
            overflow: "hidden", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            backgroundColor: themeConfig.colorFormBackground
          }}>
            <div style={{
              width: "85%",
              height: "85%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative"
            }}>
              <img 
                src={product.image} 
                alt={product.name} 
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  objectPosition: "center"
                }} 
              />
            </div>
          </div>
        </div>
        <div>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>{product.name}</h1>
          <div style={{ color: "#fbbf24", marginBottom: "0.75rem" }}>{ratingStars}</div>
          <p style={{ fontSize: "1.25rem", marginBottom: "0.75rem" }}>
            {getCurrency(globalLocalisation)}{product.price.toFixed(2)}
          </p>
          <p style={{ marginBottom: "1rem", color: themeConfig.colorSecondary }}>{product.description}</p>
          <button style={mainButtonStyle} onClick={() => onAddToCart(product)}>Add to cart</button>
          {errorMessage && (
            <div style={{ marginTop: "1rem", backgroundColor: "#fee2e2", color: "#dc2626", padding: "0.75rem", borderRadius: "0.5rem" }}>
              {errorMessage}
            </div>
          )}
          <div id="express-checkout-container" style={checkoutContainerStyle}></div>
        </div>
      </div>
      {/* Recommended Products Section */}
      <div style={{ maxWidth: "1000px", margin: "2rem auto" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: themeConfig.colorText }}>
          Recommended Products
        </h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {recommendedItems.map(item => (
            <div
              key={item.id}
              onClick={() => { onViewDetail(item.id); }}
              style={{
                cursor: "pointer",
                flex: "1 1 30%",
                border: `1px solid ${themeConfig.colorFormBorder}`,
                borderRadius: themeConfig.borderRadius[0],
                padding: "1rem",
                textAlign: "center"
              }}
            >
              <div style={{ 
                width: "100%", 
                height: "220px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
                position: "relative",
                backgroundColor: themeConfig.colorFormBackground
              }}>
                <div style={{
                  width: "80%",
                  height: "80%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative"
                }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      objectPosition: "center"
                    }} 
                  />
                </div>
              </div>
              <h4 style={{ fontSize: "1rem", color: themeConfig.colorText }}>{item.name}</h4>
              <p style={{ color: themeConfig.colorSecondary }}>
                {getCurrency(globalLocalisation)}{item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * CartPage Component
 */
function CartPage({ items, onRemoveOne, onCheckout, onBackToProducts, themeConfig, globalLocalisation }) {
  const [errorMessage, setErrorMessage] = useState("");
  const checkoutRef = useRef(null);
  const localCurrency = getCurrency(globalLocalisation);
  const localLocale = getLocale(globalLocalisation);

  function getPaymentMethodConfig(selected) {
    if (globalLocalisation === "NL") {
      // Updated to include Klarna
      switch (selected) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "ideal":
          return { enabled_payment_methods: ["ideal"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "ideal", "klarna"] };
        case "klarna":
          return { enabled_payment_methods: ["klarna"], disabled_payment_methods: ["card", "ideal", "googlepay"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "ideal", "klarna"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "SA") {
      switch (selected) {
        case "tamara":
          return { enabled_payment_methods: ["tamara"], disabled_payment_methods: [] };
        case "stcpay":
          return { enabled_payment_methods: ["stcpay"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "tamara", "stcpay"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "tamara", "stcpay"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "FR") {
      switch (selected) {
        case "alma":
          return { enabled_payment_methods: ["alma"], disabled_payment_methods: ["sepa"] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "alma", "sepa"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "alma", "sepa"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "PL") {
      switch (selected) {
        case "p24":
          return { enabled_payment_methods: ["p24"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "p24"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "p24"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "PT") {
      switch (selected) {
        case "multibanco":
          return { enabled_payment_methods: ["multibanco"], disabled_payment_methods: [] };
        case "mbway":
          return { enabled_payment_methods: ["mbway"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "multibanco", "mbway"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "multibanco", "mbway"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "BE") {
      switch (selected) {
        case "bancontact":
          return { enabled_payment_methods: ["bancontact"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "bancontact"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "bancontact"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "CN") {
      switch (selected) {
        case "alipay_cn":
          return { enabled_payment_methods: ["alipay_cn"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "alipay_cn"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "alipay_cn"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "HK") {
      switch (selected) {
        case "alipay_hk":
          return { enabled_payment_methods: ["alipay_hk"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "alipay_hk"] };
        case "all":
        default:
          return { enabled_payment_methods: ["googlepay", "alipay_hk"], disabled_payment_methods: [] };
      }
    } else if (globalLocalisation === "AT") {
      switch (selected) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: ["eps"] };
        case "eps":
          return { enabled_payment_methods: ["eps"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "eps"] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "eps"], disabled_payment_methods: [] };
      }
    } else {
      switch (selected) {
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "klarna"] };
        case "klarna":
          return { enabled_payment_methods: ["klarna"], disabled_payment_methods: ["card", "googlepay"] };
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "klarna"], disabled_payment_methods: [] };
      }
    }
  }
  const paymentConfig = getPaymentMethodConfig("all");
  const showStoreForFuture = paymentConfig.enabled_payment_methods.includes("card");

  useEffect(() => {
    if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
      checkoutRef.current.destroy();
      checkoutRef.current = null;
    }
    if (items.length > 0) {
      initializeCartExpressCheckout();
    }
  }, [items, themeConfig, globalLocalisation]);

  async function initializeCartExpressCheckout() {
    try {
      const cartItems = items.map(it => ({
        name: it.name,
        quantity: it.quantity,
        reference: "SKU-" + it.id,
        unit_price: Math.round(it.price * 100),
        total_amount: Math.round(it.price * it.quantity * 100)
      }));
      cartItems.push({
        name: "Delivery Fee",
        quantity: 1,
        reference: "DELIV-FEE",
        unit_price: getDeliveryFee(globalLocalisation),
        total_amount: getDeliveryFee(globalLocalisation)
      });
      const amount = cartItems.reduce((sum, x) => sum + x.total_amount, 0);
      const { enabled_payment_methods, disabled_payment_methods } = paymentConfig;
      const response = await fetch("/api/create-payment-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: localCurrency,
          items: cartItems,
          customer: { email: "john.doe@example.com", name: "John Doe" },
          billing: { address: shippingAddresses[globalLocalisation] || shippingAddresses["United Kingdom"] },
          payment_method_configuration: {},
          enabled_payment_methods,
          disabled_payment_methods
        })
      });
      if (!response.ok) throw new Error("Failed to create cart express checkout session");
      const paymentSession = await response.json();
      const appearance = buildFlowAppearance(themeConfig);
      const checkout = await CheckoutWebComponents({
        publicKey: "pk_sbox_e5v4rg3sztzmdusp47pvdg53kmc",
        environment: "sandbox",
        paymentSession,
        locale: localLocale,
        appearance,
        onReady: () => { console.log("Cart Express Checkout ready"); },
        onPaymentCompleted: (_component, result) => {
          console.log("Cart express payment completed:", result);
          if (result && Object.keys(result).length > 0) {
            localStorage.setItem("paymentResponse", JSON.stringify(result));
            console.log("Payment response saved to localStorage.");
          } else {
            console.warn("No payment response data found to save.");
          }
          setTimeout(() => {
            window.location.href = "/success";
          }, 100);
        },
        onError: (err) => {
          console.error("Cart express error:", err);
          setErrorMessage(err.message || "Cart express checkout failed.");
        }
      });
      checkoutRef.current = checkout;
      // Flow creation removed per instructions.
    } catch (err) {
      console.error("Cart express checkout init error:", err);
      setErrorMessage("Could not initialize cart express checkout");
    }
  }

  const calculateSubtotal = () => items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const pageStyle = { backgroundColor: themeConfig.colorBackground, color: themeConfig.colorText, minHeight: "100vh", paddingBottom: "2rem" };
  const containerStyle = { 
    backgroundColor: themeConfig.colorFormBackground, 
    color: themeConfig.colorText, 
    borderColor: themeConfig.colorFormBorder, 
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)", 
    borderRadius: themeConfig.borderRadius[0],
    border: `1px solid ${themeConfig.colorFormBorder}`
  };
  const buttonStyle = { 
    backgroundColor: themeConfig.colorAction, 
    border: "none", 
    color: themeConfig.colorInverse, 
    borderRadius: themeConfig.borderRadius[0], 
    padding: "0.75rem 1.25rem", 
    transition: "all 0.3s ease",
    fontWeight: "500",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  };

  return (
    <div style={{ 
      backgroundColor: themeConfig.colorBackground, 
      color: themeConfig.colorText, 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ flex: "1 0 auto" }}>
        <StepsIndicator currentStep={1} themeConfig={themeConfig} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <button 
              onClick={onBackToProducts} 
              style={{
                color: themeConfig.colorAction,
                backgroundColor: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.5rem",
                borderRadius: themeConfig.borderRadius[0],
                transition: "all 0.2s ease"
              }}
            >
              <span data-lucide="arrow-left" className="w-4 h-4"></span>
              <span>Continue Shopping</span>
            </button>
          </div>
          
          {items.length === 0 ? (
            <div className="text-center py-16 px-4" style={{
              backgroundColor: themeConfig.colorFormBackground,
              borderRadius: themeConfig.borderRadius[0],
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: `1px solid ${themeConfig.colorFormBorder}`
            }}>
              <div className="mb-4" style={{ color: themeConfig.colorDisabled }}>
                <span data-lucide="shopping-cart" className="w-16 h-16 mx-auto"></span>
              </div>
              <p style={{ color: themeConfig.colorDisabled }} className="mb-6 text-lg">Your cart is empty</p>
              <button 
                onClick={onBackToProducts} 
                style={buttonStyle}
                className="hover:shadow-lg transform hover:-translate-y-1"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="rounded-lg overflow-hidden" style={containerStyle}>
                <div className="divide-y" style={{ borderColor: themeConfig.colorBorder }}>
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center p-4 sm:p-6 hover:bg-opacity-50 transition-colors" style={{
                      backgroundColor: themeConfig.colorFormBackground,
                      borderColor: themeConfig.colorFormBorder
                    }}>
                      <div className="relative" style={{ minWidth: "80px" }}>
                        <img 
                          src={it.image} 
                          alt={it.name} 
                          className="w-20 h-20 object-cover rounded-md" 
                          style={{ 
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                          }} 
                        />
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                          style={{ 
                            backgroundColor: themeConfig.colorAction,
                            color: themeConfig.colorInverse
                          }}
                        >
                          {it.quantity}
                        </div>
                      </div>
                      <div className="ml-6 flex-1">
                        <h3 className="text-lg font-medium mb-1" style={{ color: themeConfig.colorText }}>{it.name}</h3>
                        <p className="font-medium" style={{ color: themeConfig.colorSecondary }}>
                          {getCurrency(globalLocalisation)}{it.price.toFixed(2)} × {it.quantity}
                        </p>
                        <p className="mt-1 font-bold" style={{ color: themeConfig.colorText }}>
                          {getCurrency(globalLocalisation)}{(it.price * it.quantity).toFixed(2)}
                        </p>
                      </div>
                      <button 
                        onClick={() => onRemoveOne(it.id)} 
                        className="flex items-center px-3 py-2 rounded-md transition-colors hover:bg-opacity-10"
                        style={{ 
                          color: themeConfig.colorDisabled,
                          backgroundColor: `${themeConfig.colorDisabled}10`,
                          border: "none"
                        }}
                      >
                        <span data-lucide="trash-2" className="w-5 h-5 mr-1"></span>
                        <span>Remove</span>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t" style={{ borderColor: themeConfig.colorFormBorder }}>
                  <div className="space-y-3">
                    <div className="flex justify-between text-base">
                      <span style={{ color: themeConfig.colorSecondary }}>Subtotal:</span>
                      <span>{getCurrency(globalLocalisation)}{calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base">
                      <span style={{ color: themeConfig.colorSecondary }}>Delivery:</span>
                      <span>{getCurrency(globalLocalisation)}{(getDeliveryFee(globalLocalisation) / 100).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3" style={{ borderColor: themeConfig.colorFormBorder }}>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span style={{ color: themeConfig.colorAction }}>
                          {getCurrency(globalLocalisation)}
                          {((calculateSubtotal() * 100 + getDeliveryFee(globalLocalisation)) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button 
                      onClick={onCheckout} 
                      style={buttonStyle} 
                      className="w-full hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Proceed to Checkout
                      <span data-lucide="arrow-right" className="w-4 h-4 ml-2"></span>
                    </button>
                  </div>
                </div>
              </div>
          
              {errorMessage && (
                <div style={{ 
                  marginTop: "1rem", 
                  backgroundColor: "#fee2e2", 
                  color: "#dc2626", 
                  padding: "0.75rem 1rem", 
                  borderRadius: "0.5rem",
                  border: "1px solid #fecaca",
                  display: "flex",
                  alignItems: "center"
                }}>
                  <span data-lucide="alert-circle" className="w-5 h-5 mr-2"></span>
                  {errorMessage}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * CheckoutPage Component
 */
function CheckoutPage({ items, theme, themeConfig, onPaymentSuccess, onRemoveOneItem, globalLocalisation, onLocalisationChange, onBackToCart }) {
  const [saveCard, setSaveCard] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState("all");
  const [selectedLocalisation, setSelectedLocalisation] = useState("United Kingdom");
  const [address, setAddress] = useState({
    address_line1: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [cardholderNamePosition, setCardholderNamePosition] = useState("top");
  const checkoutRef = useRef(null);

  useEffect(() => {
    if (globalLocalisation && globalLocalisation !== selectedLocalisation) {
      setSelectedLocalisation(globalLocalisation);
      autoPopulateAddress(globalLocalisation);
    }
  }, [globalLocalisation]);

  useEffect(() => {
    if (!addressConfirmed) {
      autoPopulateAddress(selectedLocalisation);
    }
  }, [selectedLocalisation, addressConfirmed]);

  useEffect(() => {
    if (addressConfirmed) {
      if (checkoutRef.current && typeof checkoutRef.current.destroy === "function") {
        checkoutRef.current.destroy();
        checkoutRef.current = null;
      }
      initializeCheckout();
    }
  }, [saveCard, selectedPaymentMethods, items, theme, selectedLocalisation, addressConfirmed, address, cardholderNamePosition]);

  const isAddressValid = (addr) => {
    if (!selectedLocalisation) return false;
    if (selectedLocalisation === "United Kingdom") {
      return addr.address_line1 && addr.city && addr.zip && addr.country;
    } else if (selectedLocalisation === "HK") {
      return addr.address_line1 && addr.city && addr.country;
    } else {
      return addr.address_line1 && addr.city && addr.zip && addr.country;
    }
  };

  function autoPopulateAddress(loc = selectedLocalisation) {
    setAddress(shippingAddresses[loc] || shippingAddresses["United Kingdom"]);
  }

  function getPaymentMethodConfig() {
    if (selectedLocalisation === "NL") {
      // Updated to include Klarna for NL
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "ideal":
          return { enabled_payment_methods: ["ideal"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "ideal", "klarna"] };
        case "klarna":
          return { enabled_payment_methods: ["klarna"], disabled_payment_methods: ["card", "ideal", "googlepay"] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "ideal", "klarna"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "SA") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "tamara":
          return { enabled_payment_methods: ["tamara"], disabled_payment_methods: [] };
        case "stcpay":
          return { enabled_payment_methods: ["stcpay"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "tamara", "stcpay"] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "tamara", "stcpay"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "FR") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: ["alma", "sepa"] };
        case "alma":
          return { enabled_payment_methods: ["alma"], disabled_payment_methods: ["sepa"] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "alma", "sepa"] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "alma", "sepa"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "PL") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: ["p24"] };
        case "p24":
          return { enabled_payment_methods: ["p24"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "p24"] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "p24"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "PT") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: ["multibanco", "mbway"] };
        case "multibanco":
          return { enabled_payment_methods: ["multibanco"], disabled_payment_methods: [] };
        case "mbway":
          return { enabled_payment_methods: ["mbway"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "multibanco", "mbway"] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "multibanco", "mbway"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "BE") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: ["bancontact"] };
        case "bancontact":
          return { enabled_payment_methods: ["bancontact"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "bancontact"] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "bancontact"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "CN") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: ["alipay_cn"] };
        case "alipay_cn":
          return { enabled_payment_methods: ["alipay_cn"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "alipay_cn"] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "alipay_cn"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "HK") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: ["alipay_hk"] };
        case "alipay_hk":
          return { enabled_payment_methods: ["alipay_hk"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "alipay_hk"] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "alipay_hk"], disabled_payment_methods: [] };
      }
    } else if (selectedLocalisation === "AT") {
      switch (selectedPaymentMethods) {
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: ["eps"] };
        case "eps":
          return { enabled_payment_methods: ["eps"], disabled_payment_methods: [] };
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "eps"] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "eps"], disabled_payment_methods: [] };
      }
    } else {
      switch (selectedPaymentMethods) {
        case "googlepay":
          return { enabled_payment_methods: ["googlepay"], disabled_payment_methods: ["card", "klarna"] };
        case "klarna":
          return { enabled_payment_methods: ["klarna"], disabled_payment_methods: ["card", "googlepay"] };
        case "card":
          return { enabled_payment_methods: ["card"], disabled_payment_methods: [] };
        case "all":
        default:
          return { enabled_payment_methods: ["card", "googlepay", "klarna"], disabled_payment_methods: [] };
      }
    }
  }

  const paymentConfig = getPaymentMethodConfig();
  const showStoreForFuture = paymentConfig.enabled_payment_methods.includes("card");
  const showCardNamePosition = showStoreForFuture;

  // Get available payment methods for the current localization
  const getAvailablePaymentMethods = () => {
    const methodsMap = {
      "United Kingdom": ["card", "googlepay", "klarna"],
      "NL": ["card", "googlepay", "ideal", "klarna"],
      "FR": ["card", "googlepay", "alma", "sepa"],
      "PL": ["card", "googlepay", "p24"],
      "PT": ["card", "googlepay", "multibanco", "mbway"],
      "BE": ["card", "googlepay", "bancontact"],
      "CN": ["card", "googlepay", "alipay_cn"],
      "HK": ["card", "googlepay", "alipay_hk"],
      "AT": ["card", "googlepay", "eps"],
      "SA": ["card", "googlepay", "tamara", "stcpay"]
    };
    
    return methodsMap[selectedLocalisation] || ["card", "googlepay", "klarna"];
  };

  // Get user-friendly names for payment methods
  const getPaymentMethodName = (method) => {
    const methodNames = {
      "card": "Cards",
      "googlepay": "Google Pay",
      "klarna": "Klarna",
      "ideal": "iDeal",
      "alma": "Alma",
      "sepa": "SEPA Direct Debit",
      "p24": "Przelewy24",
      "multibanco": "Multibanco",
      "mbway": "MB WAY",
      "bancontact": "Bancontact",
      "alipay_cn": "Alipay CN",
      "alipay_hk": "Alipay HK",
      "eps": "EPS",
      "tamara": "Tamara",
      "stcpay": "STC Pay"
    };
    
    return methodNames[method] || method;
  };

  // Common style for payment selects
  const commonSelectStyle = {
    width: "100%",
    padding: "0.5rem",  // Reduced from 0.75rem
    fontSize: "0.875rem",  // Reduced from 1rem
    borderRadius: themeConfig.borderRadius[0],
    border: `1px solid ${themeConfig.colorFormBorder}`,
    backgroundColor: themeConfig.colorFormBackground,
    color: themeConfig.colorText,
    transition: "border 0.3s ease"
  };

  async function initializeCheckout() {
    try {
      const cartItemsFormatted = items.map(it => ({
        name: it.name,
        quantity: it.quantity,
        reference: "SKU-" + it.id,
        unit_price: Math.round(it.price * 100),
        total_amount: Math.round(it.price * it.quantity * 100)
      }));
      cartItemsFormatted.push({
        name: "Delivery Fee",
        quantity: 1,
        reference: "DELIV-FEE",
        unit_price: getDeliveryFee(selectedLocalisation),
        total_amount: getDeliveryFee(selectedLocalisation)
      });
      const amount = cartItemsFormatted.reduce((sum, x) => sum + x.total_amount, 0);
      const { enabled_payment_methods, disabled_payment_methods } = getPaymentMethodConfig();
      const localCurrency = getCurrency(selectedLocalisation);
      const localLocale = getLocale(selectedLocalisation);
      const response = await fetch("/api/create-payment-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          currency: localCurrency,
          items: cartItemsFormatted,
          customer: { email: "john.doe@example.com", name: "John Doe" },
          billing: { address },
          description: "Your order from StoreFront",
          payment_method_configuration: {
            card: { store_payment_details: saveCard ? "enabled" : "disabled" }
          },
          enabled_payment_methods,
          disabled_payment_methods
        })
      });
      if (!response.ok) throw new Error("Failed to create payment session");
      const paymentSession = await response.json();
      const appearance = buildFlowAppearance(themeConfig);
      const checkout = await CheckoutWebComponents({
        publicKey: "pk_sbox_e5v4rg3sztzmdusp47pvdg53kmc",
        environment: "sandbox",
        paymentSession,
        locale: localLocale,
        appearance,
        componentOptions: {
          card: {
            displayCardholderName: cardholderNamePosition
          },
          flow: {
            expandFirstPaymentMethod: false
          }
        },
        onPaymentCompleted: (_component, result) => {
          console.log("Payment completed, full result:", result);
          
          try {
            // Get the session ID directly from the paymentSession object
            const responseToSave = {
              ...result,
              session_id: result.session_id || paymentSession.id // Backup from the session creation
            };
            
            sessionStorage.setItem("paymentResponse", JSON.stringify(responseToSave));
            localStorage.setItem("paymentResponse", JSON.stringify(responseToSave));
            
            console.log("Payment data saved with session_id:", responseToSave);
            
            // Store a flag to indicate we're coming from a payment
            sessionStorage.setItem("paymentJustCompleted", "true");
            
            console.log("Payment data saved, redirecting...");
            
            // Redirect using form submission to preserve data
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/success';
            
            const hiddenField = document.createElement('input');
            hiddenField.type = 'hidden';
            hiddenField.name = 'paymentData';
            hiddenField.value = JSON.stringify(responseToSave);
            form.appendChild(hiddenField);
            
            document.body.appendChild(form);
            form.submit();
          } catch (error) {
            console.error("Error saving payment data:", error);
            window.location.href = "/success";
          }
        },
        onError: (err) => {
          console.error("Payment error:", err);
          setErrorMessage(err.message);
        }
      });
      checkoutRef.current = checkout;
      const flow = checkout.create("flow");
      flow.mount("#flow-container");
    } catch (error) {
      console.error("Checkout init error:", error);
      setErrorMessage("Unable to initialize checkout. Please try again.");
    }
  }

  const calculateSubtotal = () => items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const localCurrency = getCurrency(selectedLocalisation);
  const localLocale = getLocale(selectedLocalisation);
  const pageStyle = { backgroundColor: themeConfig.colorBackground, color: themeConfig.colorText, minHeight: "100vh" };
  const containerStyle = { 
    backgroundColor: themeConfig.colorFormBackground, 
    borderColor: themeConfig.colorFormBorder, 
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    border: `1px solid ${themeConfig.colorFormBorder}`,
    borderRadius: themeConfig.borderRadius[0]
  };

  // Common input styles for form fields
  const inputStyle = {
    width: "100%",
    padding: "0.65rem 0.75rem",
    fontSize: "0.95rem",
    borderRadius: themeConfig.borderRadius[0],
    border: `1px solid ${themeConfig.colorFormBorder}`,
    backgroundColor: themeConfig.colorFormBackground,
    color: themeConfig.colorText,
    transition: "border 0.3s ease, box-shadow 0.3s ease",
    outline: "none"
  };

  // Common label styles
  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    marginBottom: "0.35rem",
    color: themeConfig.colorText
  };

  // Common button styles
  const buttonStyle = {
    backgroundColor: themeConfig.colorAction,
    color: themeConfig.colorInverse,
    border: "none",
    borderRadius: themeConfig.borderRadius[0],
    padding: "0.75rem 1.25rem",
    fontSize: "0.95rem",
    fontWeight: "500",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center"
  };

  return (
    <div style={{ 
      backgroundColor: themeConfig.colorBackground, 
      color: themeConfig.colorText, 
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column"
    }}>
      <div style={{ 
        flex: "1 0 auto",
        marginBottom: "6rem"
      }}>
        <StepsIndicator currentStep={addressConfirmed ? 3 : 2} themeConfig={themeConfig} />
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">{addressConfirmed ? 'Payment' : 'Shipping Address'}</h1>
            <button 
              onClick={onBackToCart} 
              style={{
                color: themeConfig.colorAction,
                backgroundColor: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                padding: "0.5rem",
                borderRadius: themeConfig.borderRadius[0],
                transition: "all 0.2s ease"
              }}
            >
              <span data-lucide="arrow-left" className="w-4 h-4"></span>
              <span>Back to Cart</span>
            </button>
          </div>
          
          {!addressConfirmed ? (
            <div style={{
              marginBottom: "1.5rem",
              padding: "1.5rem",
              backgroundColor: themeConfig.colorFormBackground,
              border: `1px solid ${themeConfig.colorFormBorder}`,
              borderRadius: themeConfig.borderRadius[0],
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
            }}>
              <h3 style={{ 
                marginBottom: "1rem",
                fontSize: "1.125rem",
                fontWeight: "bold",
                color: themeConfig.colorText,
                borderBottom: `1px solid ${themeConfig.colorFormBorder}`,
                paddingBottom: "0.75rem"
              }}>Shipping Information</h3>
              
              <div className="mb-5">
                <label style={labelStyle}>
                  Shipping Location
                </label>
                <div className="relative">
                  <select
                    value={selectedLocalisation}
                    onChange={(e) => {
                      const newLoc = e.target.value;
                      setSelectedLocalisation(newLoc);
                      onLocalisationChange(newLoc);
                      autoPopulateAddress(newLoc);
                      if (addressConfirmed) {
                        initializeCheckout();
                      }
                    }}
                    style={{
                      ...inputStyle,
                      border: `2px solid ${themeConfig.colorAction}`,
                      paddingRight: "2.5rem",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${themeConfig.colorAction.replace('#', '')}' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 0.75rem center",
                      backgroundSize: "1.25rem"
                    }}
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="NL">Netherlands</option>
                    <option value="FR">France</option>
                    <option value="BE">Belgium</option>
                    <option value="PL">Poland</option>
                    <option value="PT">Portugal</option>
                    <option value="AT">Austria</option>
                    <option value="SA">Saudi Arabia</option>
                    {/* <option value="CN">China</option> */}
                    {/* <option value="HK">Hong Kong</option> */}
                  </select>
                </div>
                <p className="text-xs mt-1" style={{ color: themeConfig.colorSecondary }}>
                  Select your country to automatically fill address information
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["address_line1", "city", "state", "zip", "country"].map((field) => {
                  // Skip state field for countries that don't use it
                  if (field === "state" && (selectedLocalisation === "HK" || selectedLocalisation === "BE" || selectedLocalisation === "SA")) {
                    return null;
                  }
                  
                  return (
                    <div key={field} className={field === "address_line1" ? "md:col-span-2" : ""}>
                      <label style={labelStyle}>
                        {field === "address_line1" ? "Street Address" : 
                         field === "zip" ? "Postal Code" :
                         field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        type="text"
                        value={address[field]}
                        readOnly
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        style={{
                          ...inputStyle,
                          backgroundColor: `${themeConfig.colorFormBackground}80`,
                          borderColor: themeConfig.colorFormBorder
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setAddressConfirmed(true)}
                  disabled={!isAddressValid(address)}
                  style={{
                    ...buttonStyle,
                    backgroundColor: isAddressValid(address) ? themeConfig.colorSuccess : "#cccccc",
                    opacity: isAddressValid(address) ? 1 : 0.7,
                    cursor: isAddressValid(address) ? "pointer" : "not-allowed",
                    transition: "all 0.3s ease"
                  }}
                  className="hover:shadow-lg transform hover:-translate-y-1"
                >
                  <span>Continue to Payment</span>
                  <span data-lucide="arrow-right" className="w-4 h-4 ml-2"></span>
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                marginBottom: "1.5rem",
                padding: "1rem 1.25rem",
                backgroundColor: themeConfig.colorFormBackground,
                border: `1px solid ${themeConfig.colorFormBorder}`,
                borderRadius: themeConfig.borderRadius[0],
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "all 0.2s ease"
              }}
              onClick={() => setAddressConfirmed(false)}
              className="hover:shadow-md"
            >
              <div>
                <h3 style={{ marginBottom: "0.25rem", fontSize: "1rem", fontWeight: "bold", color: themeConfig.colorText }}>
                  Shipping Address
                </h3>
                <p style={{ margin: 0, color: themeConfig.colorSecondary, fontSize: "0.9rem" }}>
                  {address.address_line1}, {address.city}, {address.state ? address.state + ", " : ""}{address.zip}, {address.country}
                </p>
              </div>
              <div style={{ color: themeConfig.colorAction }}>
                <span data-lucide="edit-2" className="w-5 h-5"></span>
              </div>
            </div>
          )}

          {addressConfirmed && (
            <div className="flex flex-col lg:flex-row lg:space-x-6">
              <div className="lg:w-2/3 mb-6 lg:mb-0">
                <div className="rounded-lg shadow-sm p-5" style={containerStyle}>
                  <h2 className="text-xl font-semibold mb-5 pb-3" style={{ 
                    color: themeConfig.colorText,
                    borderBottom: `1px solid ${themeConfig.colorFormBorder}`
                  }}>Payment Details</h2>
                  
                  {/* Payment Methods Box */}
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>
                      Payment Methods
                    </label>
                    <div className="relative">
                      <select
                        value={selectedPaymentMethods}
                        onChange={(e) => setSelectedPaymentMethods(e.target.value)}
                        style={{
                          ...inputStyle,
                          paddingRight: "2.5rem",
                          appearance: "none",
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${themeConfig.colorAction.replace('#', '')}' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 0.75rem center",
                          backgroundSize: "1.25rem"
                        }}
                      >
                        {/* All payment methods option */}
                        <option value="all">
                          All Payment Methods ({getAvailablePaymentMethods().map(method => getPaymentMethodName(method)).join(", ")})
                        </option>
                        
                        {/* Individual payment method options */}
                        {getAvailablePaymentMethods().map(method => (
                          <option key={method} value={method}>
                            {getPaymentMethodName(method)} only
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Cardholder Name Position selector (keep if showCardNamePosition is true) */}
                  {showCardNamePosition && (
                    <div style={{ marginBottom: "1.25rem" }}>
                      <label style={labelStyle}>
                        Cardholder Name Position
                      </label>
                      <div className="relative">
                        <select
                          value={cardholderNamePosition}
                          onChange={(e) => setCardholderNamePosition(e.target.value)}
                          style={{
                            ...inputStyle,
                            paddingRight: "2.5rem",
                            appearance: "none",
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23${themeConfig.colorAction.replace('#', '')}' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.75rem center",
                            backgroundSize: "1.25rem"
                          }}
                        >
                          <option value="top">Top</option>
                          <option value="bottom">Bottom</option>
                          <option value="hidden">Hidden</option>
                        </select>
                      </div>
                    </div>
                  )}
                  
                  {/* Save card checkbox */}
                  {showStoreForFuture && (
                    <div style={{ 
                      marginBottom: "1.25rem", 
                      display: "flex",
                      alignItems: "center"
                    }}>
                      <input 
                        type="checkbox" 
                        id="saveCard" 
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        style={{
                          width: "1.1rem",
                          height: "1.1rem",
                          borderRadius: "0.25rem",
                          border: `2px solid ${themeConfig.colorAction}`,
                          accentColor: themeConfig.colorAction
                        }}
                      />
                      <label 
                        htmlFor="saveCard" 
                        style={{ 
                          marginLeft: "0.5rem", 
                          color: themeConfig.colorText,
                          fontSize: "0.9rem",
                          cursor: "pointer"
                        }}
                      >
                        Save card for future purchases
                      </label>
                    </div>
                  )}
                  
                  {/* Flow container */}
                  <div 
                    id="flow-container" 
                    className="rounded-md pb-4" 
                    style={{ 
                      backgroundColor: themeConfig.colorFormBackground, 
                      borderRadius: themeConfig.borderRadius[0],
                      boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                      border: `1px solid ${themeConfig.colorFormBorder}`,
                      padding: "1px" // Prevent margin collapse
                    }}
                  ></div>
                  
                  {/* Error message */}
                  {errorMessage && (
                    <div className="mt-4 p-4 flex items-center" style={{ 
                      background: "#ffefef", 
                      border: "1px solid #fdd", 
                      borderRadius: "0.5rem" 
                    }}>
                      <span data-lucide="alert-triangle" className="w-5 h-5 mr-2" style={{ color: "#b00000" }}></span>
                      <p style={{ color: "#b00000" }}>{errorMessage}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Order Summary Panel - keep largely the same but update styling */}
              <div className="lg:w-1/3">
                <div className="rounded-lg shadow-sm p-4 sticky top-4" style={containerStyle}>
                  <h2 className="text-lg font-semibold mb-4 pb-2" style={{ 
                    color: themeConfig.colorText,
                    borderBottom: `1px solid ${themeConfig.colorFormBorder}`
                  }}>
                    Order Summary
                  </h2>
                  
                  {/* Product items */}
                  <div className="space-y-4">
                    {items.map(it => (
                      <div key={it.id} className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <img 
                            src={it.image} 
                            alt={it.name} 
                            className="w-14 h-14 object-cover rounded-md mr-3" 
                            style={{ 
                              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                              border: `1px solid ${themeConfig.colorFormBorder}`
                            }}
                          />
                          <div>
                            <h3 className="text-sm font-medium" style={{ color: themeConfig.colorText }}>{it.name}</h3>
                            <p className="text-xs" style={{ color: themeConfig.colorSecondary }}>Quantity: {it.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium" style={{ color: themeConfig.colorText }}>
                            {getCurrency(globalLocalisation)}{(it.price * it.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t mt-4 pt-4" style={{ borderColor: themeConfig.colorFormBorder }}>
                    <div className="flex justify-between py-2">
                      <p className="text-sm" style={{ color: themeConfig.colorSecondary }}>Subtotal</p>
                      <p className="text-sm font-medium" style={{ color: themeConfig.colorText }}>
                        {getCurrency(globalLocalisation)}{calculateSubtotal().toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between py-2">
                      <p className="text-sm" style={{ color: themeConfig.colorSecondary }}>Delivery</p>
                      <p className="text-sm font-medium" style={{ color: themeConfig.colorText }}>
                        {getCurrency(globalLocalisation)}{(getDeliveryFee(globalLocalisation) / 100).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between py-2 font-bold border-t mt-2" style={{ borderColor: themeConfig.colorFormBorder }}>
                      <span style={{ color: themeConfig.colorText }}>Total</span>
                      <span style={{ color: themeConfig.colorAction }}>
                        {getCurrency(globalLocalisation)}
                        {((calculateSubtotal() * 100 + getDeliveryFee(globalLocalisation)) / 100).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * MyAccountPage Component
 */
function MyAccountPage({ themeConfig, globalLocalisation }) {
  const address = shippingAddresses[globalLocalisation] || shippingAddresses["United Kingdom"];

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
      paddingBottom: '80px' // Add some space at the bottom
    }}>
      {/* Main content */}
      <div style={{ 
        flex: '0 1 auto',  // Changed from flex: 1 to prevent stretching
        padding: '2rem'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '2rem',
          textAlign: 'center',
          color: themeConfig.colorText 
        }}>My Account</h1>

        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '2rem',
          background: themeConfig.colorFormBackground,
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            marginBottom: '1rem',
            color: themeConfig.colorText 
          }}>Saved Address</h2>
          
          <div style={{
            padding: '1.5rem',
            border: `1px solid ${themeConfig.colorFormBorder}`,
            borderRadius: '6px',
            background: 'white'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '1rem' 
            }}>
              <strong style={{ color: themeConfig.colorText }}>Default</strong>
              <div>
                <button style={{
                  padding: '0.5rem 1rem',
                  marginLeft: '0.5rem',
                  background: themeConfig.colorAction,
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>Edit</button>
              </div>
            </div>
            <div style={{ 
              color: themeConfig.colorText,
              lineHeight: '1.5'
            }}>
              <div>{address.address_line1}</div>
              <div>{address.city}</div>
              <div>{address.zip}</div>
              <div>{address.country === "GB" ? "United Kingdom" : address.country}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * PaymentSuccessPage Component
 * Displays the full payment authorisation response.
 */
function PaymentSuccessPage({ paymentResponse, themeConfig, onBackToProducts }) {
  const [expandedFields, setExpandedFields] = useState({});
  const [showAll, setShowAll] = useState(false);
  const [copied, setCopied] = useState(false);

  // Important fields to highlight in payment response
  const keyFields = [
    "id",
    "status",
    "approved",
    "reference",
    "response_code",
    "response_summary",
    "customer", 
    "amount",
    "currency",
    "payment_method"
  ];

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const formatValue = (value) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value, null, 2);
    }
    return String(value);
  };

  const copyToClipboard = () => {
    const responseText = JSON.stringify(paymentResponse, null, 2);
    navigator.clipboard.writeText(responseText)
      .then(() => setCopied(true))
      .catch(err => console.error('Failed to copy response:', err));
  };

  const toggleField = (field) => {
    setExpandedFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderResponseField = (key, value, level = 0) => {
    const isObject = typeof value === 'object' && value !== null;
    const isExpandable = isObject && Object.keys(value).length > 0;
    const isExpanded = expandedFields[key] || showAll;
    
    // Format values based on the type
    const displayValue = isObject 
      ? isExpanded
        ? null
        : `{...}` 
      : value === null 
        ? 'null'
        : value === '' 
          ? '""' 
          : String(value);
    
    return (
      <div 
        key={key} 
        style={{ 
          marginBottom: "0.5rem",
          marginLeft: `${level * 1.5}rem`,
          padding: "0.5rem",
          borderRadius: "0.25rem",
          backgroundColor: keyFields.includes(key) ? `${themeConfig.colorAction}15` : 'transparent',
          transition: "background-color 0.2s ease"
        }}
      >
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center",
            cursor: isExpandable ? "pointer" : "default"
          }}
          onClick={() => isExpandable && toggleField(key)}
        >
          <div>
            <span style={{ 
              fontWeight: keyFields.includes(key) ? "bold" : "normal",
              color: keyFields.includes(key) ? themeConfig.colorAction : themeConfig.colorText 
            }}>
              {key}:
            </span>
            {!isExpandable && (
              <span style={{ marginLeft: "0.5rem", color: typeof value === 'string' ? themeConfig.colorSecondary : themeConfig.colorText }}>
                {displayValue}
              </span>
            )}
          </div>
          {isExpandable && (
            <span
              data-lucide={isExpanded ? "chevron-down" : "chevron-right"}
              style={{ 
                color: themeConfig.colorSecondary,
                width: "1rem",
                height: "1rem"
              }}
            ></span>
          )}
        </div>
        
        {isExpandable && isExpanded && (
          <div style={{ marginTop: "0.5rem" }}>
            {Object.entries(value).map(([nestedKey, nestedValue]) => 
              renderResponseField(nestedKey, nestedValue, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  // Container style based on theme
  const containerStyle = {
    backgroundColor: themeConfig.colorFormBackground,
    border: `1px solid ${themeConfig.colorFormBorder}`,
    borderRadius: themeConfig.borderRadius[0],
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
    padding: "2rem",
    maxWidth: "900px",
    margin: "0 auto",
    marginTop: "2rem"
  };

  // Button styles
  const buttonStyle = {
    backgroundColor: themeConfig.colorAction,
    color: themeConfig.colorInverse,
    border: "none",
    borderRadius: themeConfig.borderRadius[0],
    padding: "0.75rem 1.25rem",
    cursor: "pointer",
    fontWeight: "500",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease"
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "transparent",
    color: themeConfig.colorAction,
    border: `1px solid ${themeConfig.colorAction}`,
    boxShadow: "none"
  };

  return (
    <div style={{ 
      backgroundColor: themeConfig.colorBackground, 
      color: themeConfig.colorText, 
      minHeight: "100vh",
      paddingBottom: "3rem"
    }}>
      <div style={containerStyle}>
        <div style={{ 
          display: "flex", 
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1.5rem"
        }}>
          <div style={{ 
            backgroundColor: themeConfig.colorSuccess || themeConfig.colorAction,
            borderRadius: "50%",
            width: "3rem",
            height: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: themeConfig.colorInverse,
            fontSize: "1.75rem"
          }}>
            <span data-lucide="check" style={{ width: "1.75rem", height: "1.75rem" }}></span>
          </div>
          <div>
            <h1 style={{ 
              fontSize: "1.75rem", 
              fontWeight: "bold",
              margin: 0
            }}>
              Payment Successful
            </h1>
            <p style={{ 
              color: themeConfig.colorSecondary,
              margin: "0.25rem 0 0 0"
            }}>
              Your transaction has been completed successfully
            </p>
          </div>
        </div>
        
        <div style={{ 
          backgroundColor: themeConfig.colorFormBackground,
          border: `1px solid ${themeConfig.colorFormBorder}`,
          borderRadius: themeConfig.borderRadius[0],
          padding: "1.5rem",
          marginBottom: "2rem"
        }}>
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            borderBottom: `1px solid ${themeConfig.colorFormBorder}`,
            paddingBottom: "0.75rem"
          }}>
            <h2 style={{ 
              fontSize: "1.125rem", 
              fontWeight: "600",
              margin: 0
            }}>
              Payment Authorization Response
            </h2>
            <button 
              onClick={copyToClipboard}
              style={{
                background: "transparent",
                border: "none",
                color: themeConfig.colorAction,
                cursor: "pointer",
                padding: "0.25rem 0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                fontSize: "0.875rem",
                transition: "opacity 0.2s ease"
              }}
            >
              <span data-lucide={copied ? "check" : "clipboard"} style={{ width: "1rem", height: "1rem" }}></span>
              {copied ? "Copied!" : "Copy JSON"}
            </button>
          </div>
          
          <div style={{ 
            position: "relative",
            maxHeight: "400px",
            overflowY: "auto",
            padding: "0.5rem"
          }}>
            {paymentResponse && Object.entries(paymentResponse).map(([key, value]) => 
              renderResponseField(key, value)
            )}
          </div>
          
          <div style={{ 
            marginTop: "1rem",
            textAlign: "center"
          }}>
            <button
              onClick={() => setShowAll(!showAll)}
              style={{
                background: "transparent",
                border: "none",
                color: themeConfig.colorAction,
                cursor: "pointer",
                fontSize: "0.875rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
                margin: "0 auto"
              }}
            >
              <span data-lucide={showAll ? "eye-off" : "eye"} style={{ width: "1rem", height: "1rem" }}></span>
              {showAll ? "Collapse All Fields" : "Expand All Fields"}
            </button>
          </div>
        </div>
        
        <div style={{ 
          display: "flex",
          justifyContent: "center",
          gap: "1rem"
        }}>
          <button 
            onClick={onBackToProducts} 
            style={buttonStyle}
            className="hover:shadow-lg transform hover:-translate-y-1"
          >
            <span data-lucide="home" style={{ width: "1rem", height: "1rem", marginRight: "0.5rem" }}></span>
            Return to Shop
          </button>
        </div>
      </div>
    </div>
  );
}

// Update the StepsIndicator component's progress bar calculation
function StepsIndicator({ currentStep, themeConfig }) {
  const steps = [
    { number: 1, title: "Cart" },
    { number: 2, title: "Address" },
    { number: 3, title: "Payment" }
  ];

  return (
    <div style={{ 
      maxWidth: "700px",  
      margin: "0 auto 1.5rem",  
      padding: "0.75rem"  
    }}>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative"
      }}>
        {/* First segment (Cart to Address) */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "16%",
          right: "50%",
          height: "2px",
          background: currentStep === 1 ? themeConfig.colorBorder : themeConfig.colorAction,
          zIndex: 0,
          transition: "background-color 0.3s ease"  // Add transition
        }}/>
        
        {/* Second segment (Address to Payment) */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          right: "16%",
          height: "2px",
          background: currentStep <= 2 ? themeConfig.colorBorder : themeConfig.colorAction,
          zIndex: 0,
          transition: "background-color 0.3s ease"  // Add transition
        }}/>

        {/* Steps */}
        {steps.map((step) => (
          <div key={step.number} style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
            background: themeConfig.colorBackground,
            padding: "0 1rem"
          }}>
            <div style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.5rem",
              background: step.number === currentStep ? themeConfig.colorAction : themeConfig.colorBackground,
              border: `2px solid ${step.number === currentStep ? themeConfig.colorAction : themeConfig.colorBorder}`,
              color: step.number === currentStep ? themeConfig.colorInverse : themeConfig.colorText,
              transition: "all 0.3s ease",
              fontWeight: "500"
            }}>
              {step.number}
            </div>
            <div style={{
              fontSize: "0.75rem",
              fontWeight: step.number === currentStep ? "600" : "400",
              color: step.number === currentStep ? themeConfig.colorText : themeConfig.colorSecondary,
              transition: "all 0.3s ease"
            }}>
              {step.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * HomePage Component
 */
function HomePage({ themeConfig, onViewProduct, globalLocalisation, onViewAllProducts }) {
  // Featured products - selecting a subset of products to showcase
  const featuredProducts = [1, 6, 9].map(id => products.find(p => p.id === id));
  const newArrivals = [2, 7, 3].map(id => products.find(p => p.id === id));
  
  // Hero image URL - separate from product images
  const heroImageUrl = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=100&w=2400&auto=format&fit=crop";

  // Create derived colors for better contrast across themes
  const isDarkTheme = themeConfig.colorBackground.match(/^#[0-9A-F]{6}$/i) ? 
    (parseInt(themeConfig.colorBackground.substring(1, 3), 16) * 0.299 + 
     parseInt(themeConfig.colorBackground.substring(3, 5), 16) * 0.587 + 
     parseInt(themeConfig.colorBackground.substring(5, 7), 16) * 0.114) < 128 : 
    false;

  // Create adaptive colors for sections and buttons
  const sectionBackgroundColor = isDarkTheme ? 
    adjustColorBrightness(themeConfig.colorBackground, 10) : 
    adjustColorBrightness(themeConfig.colorBackground, -5);
  
  // Card hover effect color
  const cardHoverShadowColor = isDarkTheme ? 
    "rgba(255,255,255,0.1)" : 
    "rgba(0,0,0,0.1)";

  return (
    <div style={{ 
      backgroundColor: themeConfig.colorBackground, 
      color: themeConfig.colorText, 
      minHeight: "100vh" 
    }}>
      {/* Hero Section with full image and no colored overlay */}
      <section 
        style={{ 
          position: "relative", 
          height: "70vh", 
          overflow: "hidden",
          display: "flex",
          alignItems: "center"
        }}
      >
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundImage: `url(${heroImageUrl})`, 
            backgroundSize: "cover", 
            backgroundPosition: "center",
            opacity: 1
          }} 
        />
        {/* Dark overlay to ensure text readability */}
        <div 
          style={{ 
            position: "absolute", 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)",
            zIndex: 1
          }} 
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="md:w-2/3">
            <h1 
              style={{ 
                fontSize: "3.5rem", 
                fontWeight: "800", 
                color: "#ffffff",
                marginBottom: "1.5rem",
                lineHeight: "1.2",
                textShadow: "0px 2px 4px rgba(0,0,0,0.5)"
              }}
            >
              Discover Your Style, Elevate Your Life
            </h1>
            <p 
              style={{ 
                fontSize: "1.25rem", 
                color: "#ffffff", 
                marginBottom: "2rem",
                opacity: 0.9,
                textShadow: "0px 1px 2px rgba(0,0,0,0.5)"
              }}
            >
              Exceptional products that bring the best experiences to your everyday life. From fashion to tech, our curated collection has what you need.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onViewAllProducts}
                style={{ 
                  backgroundColor: "#ffffff", 
                  color: themeConfig.colorAction, 
                  padding: "0.75rem 2rem", 
                  borderRadius: themeConfig.borderRadius[0], 
                  fontWeight: "600",
                  border: "none",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.2)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
                }}
              >
                Shop Now
              </button>
              <button 
                onClick={() => window.scrollTo({
                  top: document.getElementById('featured').offsetTop,
                  behavior: 'smooth'
                })}
                style={{ 
                  backgroundColor: "transparent", 
                  color: "#ffffff", 
                  padding: "0.75rem 2rem", 
                  borderRadius: themeConfig.borderRadius[0], 
                  fontWeight: "600",
                  border: "2px solid #ffffff",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "background-color 0.2s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                Explore Featured
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              style={{ 
                fontSize: "2.5rem", 
                fontWeight: "700", 
                marginBottom: "1rem",
                color: themeConfig.colorText
              }}
            >
              Featured Products
            </h2>
            <p 
              style={{ 
                fontSize: "1.125rem", 
                color: themeConfig.colorSecondary, 
                maxWidth: "700px", 
                margin: "0 auto"
              }}
            >
              Handpicked by our experts for quality and style, these featured products represent the best of what we offer.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div 
                key={product.id} 
                style={{ 
                  backgroundColor: themeConfig.colorFormBackground,
                  borderRadius: themeConfig.borderRadius[0],
                  overflow: "hidden",
                  boxShadow: `0 4px 12px ${cardHoverShadowColor}`,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer"
                }}
                onClick={() => onViewProduct(product.id)}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = `0 12px 20px ${cardHoverShadowColor}`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = `0 4px 12px ${cardHoverShadowColor}`;
                }}
              >
                <div style={{ height: "300px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: themeConfig.colorFormBackground }}>
                  <div style={{ width: "80%", height: "80%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        transition: "transform 0.5s ease"
                      }}
                      onMouseOver={(e) => {
                        e.stopPropagation();
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseOut={(e) => {
                        e.stopPropagation();
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 style={{ 
                    fontSize: "1.25rem", 
                    fontWeight: "600", 
                    marginBottom: "0.5rem",
                    color: themeConfig.colorText
                  }}>
                    {product.name}
                  </h3>
                  <p 
                    style={{ 
                      marginBottom: "1rem", 
                      color: themeConfig.colorSecondary,
                      fontSize: "0.875rem"
                    }}
                  >
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span 
                      style={{ 
                        fontSize: "1.25rem", 
                        fontWeight: "700",
                        color: themeConfig.colorAction
                      }}
                    >
                      {getCurrency(globalLocalisation)}{product.price.toFixed(2)}
                    </span>
                    <div 
                      style={{ 
                        display: "inline-flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        backgroundColor: themeConfig.colorAction,
                        color: themeConfig.colorInverse,
                        cursor: "pointer"
                      }}
                      role="button"
                      aria-label={`View ${product.name}`}
                    >
                      <span data-lucide="arrow-right" className="w-5 h-5"></span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button 
              onClick={onViewAllProducts}
              style={{ 
                backgroundColor: themeConfig.colorAction, 
                color: themeConfig.colorInverse, 
                padding: "0.75rem 2rem", 
                borderRadius: themeConfig.borderRadius[0], 
                fontWeight: "600",
                border: "none",
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: `0 4px 12px ${cardHoverShadowColor}`,
                transition: "background-color 0.2s ease"
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = adjustColorBrightness(themeConfig.colorAction, isDarkTheme ? 15 : -15);
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = themeConfig.colorAction;
              }}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Categories Banners */}
      <section className="py-12" style={{ backgroundColor: sectionBackgroundColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              style={{ 
                borderRadius: themeConfig.borderRadius[0],
                overflow: "hidden",
                position: "relative",
                height: "300px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${products[0].image})`, // Using polo shirt image
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 0.5s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <div 
                style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6))`,
                  display: "flex",
                  alignItems: "center",
                  padding: "2rem"
                }}
              >
                <div>
                  <h3 
                    style={{ 
                      color: "#fff", 
                      fontSize: "2rem", 
                      fontWeight: "700", 
                      marginBottom: "0.5rem",
                      textShadow: "0px 2px 4px rgba(0,0,0,0.3)"
                    }}
                  >
                    Fashion Collection
                  </h3>
                  <p style={{ 
                    color: "#fff", 
                    marginBottom: "1rem", 
                    maxWidth: "300px",
                    textShadow: "0px 1px 2px rgba(0,0,0,0.3)"
                  }}>
                    Explore our range of stylish clothing and accessories
                  </p>
                  <button 
                    onClick={onViewAllProducts}
                    style={{ 
                      backgroundColor: "#fff", 
                      color: isDarkTheme ? themeConfig.colorAction : "#000", 
                      padding: "0.5rem 1.5rem", 
                      borderRadius: themeConfig.borderRadius[0], 
                      fontWeight: "600",
                      border: "none",
                      fontSize: "0.875rem",
                      cursor: "pointer"
                    }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            
            <div 
              style={{ 
                borderRadius: themeConfig.borderRadius[0],
                overflow: "hidden",
                position: "relative",
                height: "300px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${products[6].image})`, // Using joypad image
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "transform 0.5s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <div 
                style={{ 
                  position: "absolute", 
                  top: 0, 
                  left: 0, 
                  right: 0, 
                  bottom: 0, 
                  background: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6))`,
                  display: "flex",
                  alignItems: "center",
                  padding: "2rem"
                }}
              >
                <div>
                  <h3 
                    style={{ 
                      color: "#fff", 
                      fontSize: "2rem", 
                      fontWeight: "700", 
                      marginBottom: "0.5rem",
                      textShadow: "0px 2px 4px rgba(0,0,0,0.3)"
                    }}
                  >
                    Tech Gadgets
                  </h3>
                  <p style={{ 
                    color: "#fff", 
                    marginBottom: "1rem", 
                    maxWidth: "300px",
                    textShadow: "0px 1px 2px rgba(0,0,0,0.3)"
                  }}>
                    Discover the latest in technology and innovation
                  </p>
                  <button 
                    onClick={onViewAllProducts}
                    style={{ 
                      backgroundColor: "#fff", 
                      color: isDarkTheme ? themeConfig.colorAction : "#000", 
                      padding: "0.5rem 1.5rem", 
                      borderRadius: themeConfig.borderRadius[0], 
                      fontWeight: "600",
                      border: "none",
                      fontSize: "0.875rem",
                      cursor: "pointer"
                    }}
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              style={{ 
                fontSize: "2.5rem", 
                fontWeight: "700", 
                marginBottom: "1rem",
                color: themeConfig.colorText
              }}
            >
              New Arrivals
            </h2>
            <p 
              style={{ 
                fontSize: "1.125rem", 
                color: themeConfig.colorSecondary, 
                maxWidth: "700px", 
                margin: "0 auto"
              }}
            >
              The latest additions to our collection, bringing fresh styles and innovative designs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newArrivals.map(product => (
              <div 
                key={product.id} 
                onClick={() => onViewProduct(product.id)}
                style={{ 
                  backgroundColor: themeConfig.colorFormBackground,
                  borderRadius: themeConfig.borderRadius[0],
                  overflow: "hidden",
                  boxShadow: `0 4px 12px ${cardHoverShadowColor}`,
                  cursor: "pointer",
                  position: "relative"
                }}
              >
                <div 
                  style={{ 
                    position: "absolute", 
                    top: "1rem", 
                    left: "1rem", 
                    backgroundColor: themeConfig.colorAction,
                    color: themeConfig.colorInverse,
                    padding: "0.3rem 0.75rem",
                    borderRadius: "0.25rem",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    zIndex: 10
                  }}
                >
                  NEW
                </div>
                <div style={{ height: "250px", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: themeConfig.colorFormBackground }}>
                  <div style={{ width: "80%", height: "80%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <img 
                      src={product.image} 
                      alt={product.name}
                      style={{ 
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover",
                        transition: "transform 0.5s ease"
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <h3 style={{ 
                    fontSize: "1.1rem", 
                    fontWeight: "600", 
                    marginBottom: "0.5rem",
                    color: themeConfig.colorText
                  }}>
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span 
                      style={{ 
                        fontSize: "1.1rem", 
                        fontWeight: "700",
                        color: themeConfig.colorAction
                      }}
                    >
                      {getCurrency(globalLocalisation)}{product.price.toFixed(2)}
                    </span>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <span 
                          key={idx} 
                          style={{ 
                            color: idx < product.rating ? "#fbbf24" : isDarkTheme ? "#555" : "#e5e7eb",
                            marginLeft: "2px"
                          }}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section 
        style={{ 
          background: `linear-gradient(45deg, ${adjustColorBrightness(themeConfig.colorAction, -20)}, ${themeConfig.colorAction})`,
          padding: "4rem 0"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 
                style={{ 
                  fontSize: "2.5rem", 
                  fontWeight: "700", 
                  color: themeConfig.colorInverse,
                  marginBottom: "1rem",
                  textShadow: isDarkTheme ? "0px 2px 4px rgba(0,0,0,0.3)" : "none"
                }}
              >
                Join Our Newsletter
              </h2>
              <p 
                style={{ 
                  fontSize: "1.125rem", 
                  color: themeConfig.colorInverse,
                  marginBottom: "1.5rem",
                  opacity: 0.9,
                  textShadow: isDarkTheme ? "0px 1px 2px rgba(0,0,0,0.3)" : "none"
                }}
              >
                Stay updated with our latest products, promotions, and exclusive deals.
              </p>
            </div>
            <div>
              <div 
                style={{ 
                  display: "flex", 
                  borderRadius: themeConfig.borderRadius[0],
                  overflow: "hidden"
                }}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  style={{ 
                    backgroundColor: themeConfig.colorInverse,
                    padding: "1rem",
                    border: "none",
                    flex: "1",
                    color: themeConfig.colorText,
                    fontSize: "1rem"
                  }}
                />
                <button 
                  style={{ 
                    backgroundColor: isDarkTheme ? 
                      adjustColorBrightness(themeConfig.colorAction, 20) : 
                      adjustColorBrightness(themeConfig.colorAction, -20),
                    color: themeConfig.colorInverse,
                    border: "none",
                    padding: "0 1.5rem",
                    fontWeight: "600",
                    cursor: "pointer"
                  }}
                >
                  Subscribe
                </button>
              </div>
              <p 
                style={{ 
                  fontSize: "0.875rem", 
                  color: themeConfig.colorInverse,
                  marginTop: "0.75rem",
                  opacity: 0.7,
                  textShadow: isDarkTheme ? "0px 1px 2px rgba(0,0,0,0.3)" : "none"
                }}
              >
                By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Utility function for adjusting color brightness
function adjustColorBrightness(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = Math.max(0, Math.min(255, R + percent));
  G = Math.max(0, Math.min(255, G + percent));
  B = Math.max(0, Math.min(255, B + percent));

  const RR = R.toString(16).padStart(2, '0');
  const GG = G.toString(16).padStart(2, '0');
  const BB = B.toString(16).padStart(2, '0');

  return `#${RR}${GG}${BB}`;
}

/**
 * App Component
 */
function App() {
  const [currentPage, setCurrentPage] = useState("home"); // Default to homepage instead of products
  const [cartItems, setCartItems] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('selectedTheme') || 'default';
  });
  const [globalLocalisation, setGlobalLocalisation] = useState("United Kingdom");
  const [detailProductId, setDetailProductId] = useState(null);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cartItems") || "[]");
    setCartItems(saved);
  }, []);

  function saveCart(items) {
    localStorage.setItem("cartItems", JSON.stringify(items));
    setCartItems(items);
  }

  function triggerCartNotification() {
    setShowCartNotification(true);
    setTimeout(() => {
      setShowCartNotification(false);
    }, 2500);
  }

  function addToCart(prod) {
    const idx = cartItems.findIndex(x => x.id === prod.id);
    if (idx >= 0) {
      const updated = [...cartItems];
      updated[idx].quantity++;
      saveCart(updated);
    } else {
      saveCart([...cartItems, { ...prod, quantity: 1 }]);
    }
    triggerCartNotification();
  }

  function removeOneFromCart(id) {
    const updated = cartItems
      .map(it => (it.id === id ? { ...it, quantity: it.quantity - 1 } : it))
      .filter(x => x.quantity > 0);
    saveCart(updated);
  }

  function handlePaymentSuccess(response) {
    setPaymentResponse(response);
    localStorage.setItem("cartItems", JSON.stringify([]));
    setCartItems([]);
    setCurrentPage("success");
  }

  const themeConfig = themeConfigs[theme] || themeConfigs.default;

  // Add effect to save theme changes
  useEffect(() => {
    localStorage.setItem('selectedTheme', theme);
  }, [theme]);

  // Render Products: each card is now clickable to view details.
  function renderProducts() {
    const pageStyle = { backgroundColor: themeConfig.colorBackground, color: themeConfig.colorText, minHeight: "100vh", paddingBottom: "2rem" };
    const cardStyle = { 
      backgroundColor: themeConfig.colorFormBackground, 
      borderRadius: themeConfig.borderRadius[0], 
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)", 
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      height: "100%"
    };

    return (
      <div style={pageStyle}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => (
              <div key={p.id} onClick={() => { setDetailProductId(p.id); setCurrentPage("detail"); }} style={cardStyle}>
                <div style={{padding: "1.5rem", flex: "1", display: "flex", flexDirection: "column"}}>
                  <div style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.5rem",
                    position: "relative",
                    backgroundColor: themeConfig.colorFormBackground
                  }}>
                    <div style={{
                      width: "80%",
                      height: "80%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      position: "relative"
                    }}>
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        style={{ 
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center"
                        }} 
                      />
                    </div>
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: "1.125rem", 
                      fontWeight: "600", 
                      marginBottom: "0.5rem", 
                      color: themeConfig.colorText 
                    }}>
                      {p.name}
                    </h3>
                    <p style={{ 
                      fontSize: "1.125rem", 
                      fontWeight: "700", 
                      color: themeConfig.colorAction 
                    }}>
                      {getCurrency(globalLocalisation)}{p.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Add this useEffect
  React.useEffect(() => {
    // Initialize icons whenever the component updates
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  return (
    <div>
      <nav className="shadow-sm" style={{ backgroundColor: themeConfig.colorAction, color: themeConfig.colorInverse, padding: "0 1rem" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => { setDetailProductId(null); setCurrentPage("home"); }} 
                style={{ 
                  color: themeConfig.colorInverse,
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  letterSpacing: "1px",
                  padding: "0.5rem 0.75rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.2s ease",
                  textTransform: "uppercase",
                  position: "relative"
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = "0.9"}
                onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
              >
                <span style={{
                  display: "inline-block",
                  transform: "translateY(1px)"
                }}>
                  STOREFRONT
                </span>
              </button>
              
              {/* Add navigation links */}
              <div className="ml-8 flex space-x-6">
                <button
                  onClick={() => { setDetailProductId(null); setCurrentPage("home"); }}
                  style={{
                    color: themeConfig.colorInverse,
                    fontWeight: currentPage === "home" ? "600" : "400",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.25rem 0",
                    borderBottom: currentPage === "home" ? `2px solid ${themeConfig.colorInverse}` : "2px solid transparent",
                    transition: "all 0.2s ease"
                  }}
                >
                  Home
                </button>
                <button
                  onClick={() => { setDetailProductId(null); setCurrentPage("products"); }}
                  style={{
                    color: themeConfig.colorInverse,
                    fontWeight: currentPage === "products" ? "600" : "400",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.25rem 0",
                    borderBottom: currentPage === "products" ? `2px solid ${themeConfig.colorInverse}` : "2px solid transparent",
                    transition: "all 0.2s ease"
                  }}
                >
                  Shop
                </button>
              </div>
            </div>
            
            {/* Shopping cart and account */}
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setCurrentPage("cart")} 
                className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
                style={{ color: themeConfig.colorInverse }}
                aria-label="Shopping Cart"
              >
                <span data-lucide="shopping-bag" className="w-6 h-6"></span>
                {cartItems.length > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 rounded-full w-5 h-5 flex items-center justify-center text-xs" 
                    style={{ 
                      backgroundColor: themeConfig.colorInverse, 
                      color: themeConfig.colorAction 
                    }}
                  >
                    {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
                {showCartNotification && (
                  <div
                    className="absolute"
                    style={{
                      backgroundColor: themeConfig.colorAction,
                      color: themeConfig.colorInverse,
                      padding: "0.5rem 1rem",
                      top: "100%",
                      right: 0,
                      marginTop: "0.5rem",
                      borderRadius: themeConfig.borderRadius[0],
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      whiteSpace: "nowrap",
                      zIndex: 50
                    }}
                  >
                    Product added to your cart
                  </div>
                )}
              </button>
              <button 
                onClick={() => { setCurrentPage("account"); setDetailProductId(null); }} 
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
                style={{ color: themeConfig.colorInverse }}
                aria-label="My Account"
              >
                <span data-lucide="user" className="w-6 h-6"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {currentPage === "home" && (
        <HomePage 
          themeConfig={themeConfigs[theme] || themeConfigs.default}
          onViewProduct={(id) => { setDetailProductId(id); setCurrentPage("detail"); }}
          onViewAllProducts={() => { setCurrentPage("products"); }}
          globalLocalisation={globalLocalisation}
        />
      )}
      {currentPage === "products" && renderProducts()}
      {currentPage === "detail" && detailProductId && (
        <ProductDetailPage
          productId={detailProductId}
          theme={theme}
          themeConfig={themeConfigs[theme] || themeConfigs.default}
          onAddToCart={addToCart}
          onViewDetail={(rid) => { setDetailProductId(rid); setCurrentPage("detail"); }}
          onBackToProducts={() => { setDetailProductId(null); setCurrentPage("products"); }}
          globalLocalisation={globalLocalisation}
        />
      )}
      {currentPage === "cart" && (
        <CartPage
          items={cartItems}
          onRemoveOne={removeOneFromCart}
          onCheckout={() => setCurrentPage("checkout")}
          onBackToProducts={() => { setDetailProductId(null); setCurrentPage("products"); }}
          themeConfig={themeConfigs[theme] || themeConfigs.default}
          globalLocalisation={globalLocalisation}
        />
      )}
      {currentPage === "checkout" && (
        <CheckoutPage
          items={cartItems}
          theme={theme}
          themeConfig={themeConfigs[theme] || themeConfigs.default}
          onPaymentSuccess={handlePaymentSuccess}
          onRemoveOneItem={removeOneFromCart}
          globalLocalisation={globalLocalisation}
          onLocalisationChange={(newLoc) => setGlobalLocalisation(newLoc)}
          onBackToCart={() => setCurrentPage("cart")}
        />
      )}
      {currentPage === "account" && (
        <MyAccountPage themeConfig={themeConfigs[theme] || themeConfigs.default} globalLocalisation={globalLocalisation} />
      )}
      {currentPage === "success" && paymentResponse && (
        <PaymentSuccessPage
          paymentResponse={paymentResponse}
          themeConfig={themeConfigs[theme] || themeConfigs.default}
          onBackToProducts={() => { setCurrentPage("products"); setPaymentResponse(null); }}
        />
      )}

      <footer
        style={{
          backgroundColor: themeConfig.colorAction,
          color: themeConfig.colorInverse,
          padding: "1rem"
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-center items-center space-x-4">
          <div className="flex items-center">
            <label
              className="text-sm font-medium"
              style={{ color: themeConfig.colorInverse, marginRight: "0.5rem" }}
            >
              Theme:
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="rounded-md border-none p-1 text-sm"
              style={{
                backgroundColor: themeConfig.colorFormBackground,
                color: themeConfig.colorText,
                border: `1px solid ${themeConfig.colorFormBorder}`,
                padding: "0.5rem",
                borderRadius: themeConfig.borderRadius[0]
              }}
            >
              <option value="default">Default</option>
              <option value="midnight">Midnight</option>
              <option value="simplicity">Simplicity</option>
              <option value="grapefruit">Grapefruit</option>
            </select>
          </div>
          <div className="flex items-center">
            <label
              className="text-sm font-medium"
              style={{ color: themeConfig.colorInverse, marginRight: "0.5rem" }}
            >
              Localisation:
            </label>
            <select
              value={globalLocalisation}
              onChange={(e) => setGlobalLocalisation(e.target.value)}
              className="rounded-md border-none p-1 text-sm"
              style={{
                backgroundColor: themeConfig.colorFormBackground,
                color: themeConfig.colorText,
                border: `1px solid ${themeConfig.colorFormBorder}`,
                padding: "0.5rem",
                borderRadius: themeConfig.borderRadius[0]
              }}
            >
              <option value="United Kingdom">United Kingdom</option>
              <option value="NL">Netherlands</option>
              <option value="FR">France</option>
              <option value="BE">Belgium</option>
              <option value="PL">Poland</option>
              <option value="PT">Portugal</option>
              <option value="AT">Austria</option>
              <option value="SA">Saudi Arabia</option>
              {/* <option value="CN">China</option> */}
              {/* <option value="HK">Hong Kong</option> */}
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);