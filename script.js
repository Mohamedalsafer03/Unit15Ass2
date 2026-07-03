const carData = {
  "Mercedes-AMG GT 43 Premium Coupé": {
    images: ["AMGGT43.png", "AMGGT43.png", "AMGGT43.png", "AMGGT43.png", "AMGGT43.png"],
    description: "The Mercedes-AMG GT 43 is a 4-door sports coupé that blends everyday usability with true AMG performance. A turbocharged 2.0L engine with mild-hybrid assistance delivers thrilling acceleration and a sporty, connected drive.",
    specs: [
      { label: "Body Style",   value: "4-door Sports Coupé" },
      { label: "Engine",       value: "2.0L Turbo + Hybrid" },
      { label: "Power",        value: "421 hp" },
      { label: "0–100 km/h",  value: "4.5 sec" },
      { label: "Fuel Economy", value: "35.4 mpg combined" },
      { label: "CO₂",          value: "146 g/km" },
    ],
    finance: {
      price:    "£72,495",
      deposit:  "£7,250",
      monthly:  "£899",
      term:     "48 months",
      apr:      "7.9% APR",
      balloon:  "£36,200",
    },
  },
  "Mercedes-AMG GLE 53 SUV": {
    images: ["AMGGLE53SUV.png", "AMGGLE53SUV.png", "AMGGLE53SUV.png", "AMGGLE53SUV.png", "AMGGLE53SUV.png"],
    description: "The Mercedes-AMG GLE 53 combines the practicality of a performance SUV with electrified technology. A 3.0L inline-6 mild-hybrid produces 449 hp, delivering SUV versatility alongside genuine AMG thrills.",
    specs: [
      { label: "Body Style",   value: "Performance SUV" },
      { label: "Engine",       value: "3.0L Inline-6 Mild Hybrid" },
      { label: "Power",        value: "449 hp" },
      { label: "0–100 km/h",  value: "4.9 sec" },
      { label: "Fuel Economy", value: "67.3 mpg combined" },
      { label: "CO₂",          value: "95 g/km" },
    ],
    finance: {
      price:    "£89,995",
      deposit:  "£9,000",
      monthly:  "£1,099",
      term:     "48 months",
      apr:      "7.9% APR",
      balloon:  "£44,800",
    },
  },
  "Mercedes-AMG CLA 35 Coupé": {
    images: ["AMGCLA35Coupé.png", "AMGCLA35Coupé.png", "AMGCLA35Coupé.png", "AMGCLA35Coupé.png", "AMGCLA35Coupé.png"],
    description: "The Mercedes-AMG CLA 35 is the entry point into AMG's coupé lineup, but makes no compromises on style or pace. With sharp lines and a 302 hp turbocharged engine, it is built to impress on every road.",
    specs: [
      { label: "Body Style",   value: "4-door Coupé" },
      { label: "Engine",       value: "2.0L Turbocharged" },
      { label: "Power",        value: "302 hp" },
      { label: "0–100 km/h",  value: "4.9 sec" },
      { label: "Fuel Economy", value: "34.9 mpg combined" },
      { label: "CO₂",          value: "184 g/km" },
    ],
    finance: {
      price:    "£51,990",
      deposit:  "£5,200",
      monthly:  "£649",
      term:     "48 months",
      apr:      "7.9% APR",
      balloon:  "£25,900",
    },
  },
  "Mercedes-Maybach GLS 600": {
    images: ["MaybachGLS600.png", "MaybachGLS600.png", "MaybachGLS600.png", "MaybachGLS600.png", "MaybachGLS600.png"],
    description: "The Mercedes-Maybach GLS 600 is the pinnacle of luxury SUVs. Handcrafted in the Maybach tradition, it pairs a 4.0L biturbo V8 with first-class rear appointments — offering an unrivalled combination of space, silence and prestige.",
    specs: [
      { label: "Body Style",   value: "Luxury Full-size SUV" },
      { label: "Engine",       value: "4.0L Biturbo V8 + EQ Boost" },
      { label: "Power",        value: "558 hp" },
      { label: "0–100 km/h",  value: "4.9 sec" },
      { label: "Fuel Economy", value: "20.4 mpg combined" },
      { label: "CO₂",          value: "315 g/km" },
    ],
    finance: {
      price:    "£179,995",
      deposit:  "£18,000",
      monthly:  "£2,199",
      term:     "48 months",
      apr:      "7.9% APR",
      balloon:  "£89,900",
    },
  },
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function createCarModal() {
  if (document.getElementById("carDetailOverlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "carDetailOverlay";
  overlay.innerHTML = `
    <div id="carDetailModal">
      <button id="carDetailClose" aria-label="Close">✕</button>
      <div id="carDetailBody"></div>
    </div>
  `;

  const style = document.createElement("style");
  style.textContent = `
    #carDetailOverlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.65);
      z-index: 2000;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    #carDetailOverlay.active { display: flex; }

    #carDetailModal {
      background: #fff;
      width: 100%;
      max-width: 860px;
      max-height: 90vh;
      overflow-y: auto;
      position: relative;
      padding: 32px;
      box-shadow: 0 8px 40px rgba(0,0,0,0.3);
    }

    #carDetailClose {
      position: absolute;
      top: 14px; right: 16px;
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #333;
      line-height: 1;
    }

    /* ── Top layout: gallery left, info right ── */
    .cd-top {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
      margin-bottom: 32px;
    }

    /* Gallery */
    .cd-gallery {}
    .cd-main-img {
      width: 100%;
      height: 220px;
      object-fit: contain;
      background: #f0f0f0;
      display: block;
      margin-bottom: 10px;
    }
    .cd-thumbs {
      display: flex;
      gap: 8px;
    }
    .cd-thumb {
      width: 60px;
      height: 44px;
      object-fit: cover;
      background: #ddd;
      cursor: pointer;
      border: 2px solid transparent;
      flex-shrink: 0;
    }
    .cd-thumb.active { border-color: #2f6db5; }

    /* Info panel */
    .cd-info {}
    .cd-model-name {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 10px;
      line-height: 1.3;
    }
    .cd-desc {
      font-size: 13px;
      color: #444;
      line-height: 1.6;
      margin-bottom: 18px;
    }
    .cd-specs {
      border-top: 1px solid #e0e0e0;
      padding-top: 12px;
    }
    .cd-spec-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      padding: 5px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .cd-spec-label { color: #666; }
    .cd-spec-value { font-weight: 600; }

    .cd-book-btn {
      margin-top: 18px;
      background: #2f6db5;
      color: white;
      border: none;
      padding: 10px 22px;
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 14px;
      cursor: pointer;
      width: 100%;
      transition: background 0.25s;
    }
    .cd-book-btn:hover { background: #1a4d8a; }

    /* ── Finance section ── */
    .cd-finance {
      border-top: 2px solid #e0e0e0;
      padding-top: 22px;
    }
    .cd-finance-title {
      font-size: 15px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 14px;
      letter-spacing: 0.04em;
    }
    .cd-finance-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
    }
    .cd-finance-item {
      background: #f5f5f5;
      padding: 14px;
    }
    .cd-finance-item-label {
      font-size: 11px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .cd-finance-item-value {
      font-size: 17px;
      font-weight: 700;
      color: #111;
    }

    @media (max-width: 620px) {
      .cd-top { grid-template-columns: 1fr; }
      .cd-finance-grid { grid-template-columns: 1fr 1fr; }
      #carDetailModal { padding: 20px; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(overlay);

  // Close on overlay click
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeCarDetail();
  });
  document.getElementById("carDetailClose").addEventListener("click", closeCarDetail);
}

function openCarDetail(carName) {
  const car = carData[carName];
  if (!car) return;

  createCarModal();

  const body = document.getElementById("carDetailBody");
  const f = car.finance;

  body.innerHTML = `
    <div class="cd-top">
      <!-- Gallery -->
      <div class="cd-gallery">
        <img class="cd-main-img" id="cdMainImg" src="${car.images[0]}" alt="${carName}">
        <div class="cd-thumbs">
          ${car.images.map((src, i) => `
            <img class="cd-thumb ${i === 0 ? "active" : ""}"
                 src="${src}" alt="View ${i + 1}"
                 onclick="cdSelectThumb(this, '${src}')">
          `).join("")}
        </div>
      </div>

      <!-- Info -->
      <div class="cd-info">
        <p class="cd-model-name">${carName}</p>
        <p class="cd-desc">${car.description}</p>
        <div class="cd-specs">
          ${car.specs.map(s => `
            <div class="cd-spec-row">
              <span class="cd-spec-label">${s.label}</span>
              <span class="cd-spec-value">${s.value}</span>
            </div>
          `).join("")}
        </div>
        <button class="cd-book-btn" onclick="closeCarDetail(); document.getElementById('test-drive').scrollIntoView({behavior:'smooth'});">
          Book a Test Drive
        </button>
      </div>
    </div>

    <!-- Finance -->
    <div class="cd-finance">
      <p class="cd-finance-title">Finance &amp; Pricing Breakdown</p>
      <div class="cd-finance-grid">
        <div class="cd-finance-item">
          <div class="cd-finance-item-label">OTR Price</div>
          <div class="cd-finance-item-value">${f.price}</div>
        </div>
        <div class="cd-finance-item">
          <div class="cd-finance-item-label">Deposit</div>
          <div class="cd-finance-item-value">${f.deposit}</div>
        </div>
        <div class="cd-finance-item">
          <div class="cd-finance-item-label">Monthly Payment</div>
          <div class="cd-finance-item-value">${f.monthly}</div>
        </div>
        <div class="cd-finance-item">
          <div class="cd-finance-item-label">Term</div>
          <div class="cd-finance-item-value">${f.term}</div>
        </div>
        <div class="cd-finance-item">
          <div class="cd-finance-item-label">APR</div>
          <div class="cd-finance-item-value">${f.apr}</div>
        </div>
        <div class="cd-finance-item">
          <div class="cd-finance-item-label">Optional Final Payment</div>
          <div class="cd-finance-item-value">${f.balloon}</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById("carDetailOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCarDetail() {
  const overlay = document.getElementById("carDetailOverlay");
  if (overlay) overlay.classList.remove("active");
  document.body.style.overflow = "";
}

function cdSelectThumb(el, src) {
  document.getElementById("cdMainImg").src = src;
  document.querySelectorAll(".cd-thumb").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
}

// ── Wire up "Find Out More" buttons ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  // Each card's button sits after an <h3> with the car name
  document.querySelectorAll(".card").forEach(card => {
    const btn = card.querySelector(".btn");
    const name = card.querySelector("h3")?.textContent?.trim();
    if (btn && name) {
      btn.addEventListener("click", () => openCarDetail(name));
    }
  });
});

// ── Existing modal helpers (kept intact) ────────────────────────────────────
function openModal() {
  document.getElementById("modalOverlay").classList.add("active");
}

function closeModal(e) {
  if (!e || e.target === document.getElementById("modalOverlay") || e.currentTarget.id === "closeBtn") {
    document.getElementById("modalOverlay").classList.remove("active");
  }
}

function submitForm(e) {
  e.preventDefault();
  alert("Test drive booked! We will be in touch shortly.");
  closeModal();
}




document.addEventListener("DOMContentLoaded", () => {

    const submitBtn = document.getElementById("submitTestDrive");

    if (submitBtn) {
        submitBtn.addEventListener("click", function () {

            const title = document.getElementById("title").value || "Mr";
            const firstName = document.getElementById("fname").value;
            const surname = document.getElementById("surname").value;
            const email = document.getElementById("email").value;
            const date = document.getElementById("date").value || "Saturday";

            if (!firstName || !surname || !email) {
                alert("Please complete all required fields.");
                return;
            }

            document.body.innerHTML = `
                <div style="
                    max-width:700px;
                    margin:40px auto;
                    font-family:'Source Sans Pro', sans-serif;
                ">

                    <div style="
                        background:#e6e6e6;
                        padding:30px;
                        margin-bottom:15px;
                    ">
                        <p style="font-size:22px;margin-bottom:20px;">
                            Test Drive Request
                        </p>

                        <h2 style="margin-bottom:10px;">
                            Thank you ${title} ${firstName} ${surname}.
                        </h2>

                        <p style="font-size:18px;">
                            Your test drive request was sent to your chosen showroom
                            who will be in touch shortly to discuss your appointment.
                        </p>
                    </div>

                    <div style="
                        background:#e6e6e6;
                        padding:30px;
                        text-align:center;
                        margin-bottom:15px;
                    ">

                        <h2 style="margin-bottom:20px;">
                            ${date}, Evening at Mercedes-Benz of Stockport
                        </h2>

                        <p style="margin-bottom:15px;">
                            📞 +44 161 672 6760
                            &nbsp;&nbsp;&nbsp;
                            ✉ internet.enquiries@Mercedes-Benz.co.uk
                        </p>

                        <img
                            src="AMGGLE53SUV.png"
                            alt="Mercedes"
                            style="
                                width:320px;
                                max-width:100%;
                                margin:20px auto;
                                display:block;
                            "
                        >

                        <p style="font-size:18px;">
                            Mercedes-AMG GLE 53 SUV
                        </p>

                    </div>

                    <div style="
                        background:#e6e6e6;
                        padding:20px;
                        text-align:center;
                        font-weight:bold;
                    ">
                        You'll need your driving licence for your appointment.
                    </div>

                </div>
            `;
        });
    }

});
