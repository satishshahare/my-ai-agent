const Anthropic = require("@anthropic-ai/sdk");
const express = require("express");

const app = express();
app.use(express.json());

const anthropic = new Anthropic({
  apiKey: "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", // paste your real API key here
});

app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Sakshi</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5; }
    h1 { color: #333; }

    #chat-toggle {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 50px;
      padding: 14px 22px;
      cursor: pointer;
      font-size: 16px;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }

    #chat-box {
      position: fixed;
      bottom: 80px;
      right: 20px;
      width: 320px;
      background: white;
      border: 1px solid #ddd;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      padding: 16px;
      z-index: 9999;
      display: none;
    }

    #messages {
      height: 250px;
      overflow-y: auto;
      margin-bottom: 10px;
      border: 1px solid #eee;
      padding: 8px;
      border-radius: 8px;
    }

    .user-msg { text-align: right; color: #007bff; margin: 6px 0; }
    .ai-msg { text-align: left; color: #28a745; margin: 6px 0; }

    #chat-input {
      width: 68%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 6px;
    }

    #chat-send {
      width: 25%;
      padding: 8px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
  </style>
</head>
<body>

  <h1>Welcome to My Website 🤖</h1>
  <p>Click the chat button to talk to our Sakshi Assistant!</p>

  <button id="chat-toggle" onclick="toggleChat()">💬 Chat</button>

  <div id="chat-box">
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <h3 style="margin:0;">💬 Sakshi Assistant</h3>
      <span onclick="toggleChat()" style="cursor:pointer; font-size:18px;">✖</span>
    </div>
    <br/>
    <div id="messages">
      <div class="ai-msg">Sakshi: Hello! How can I help you today? 😊</div>
    </div>
    <input type="text" id="chat-input" placeholder="Type your message..." />
    <button id="chat-send" onclick="sendMessage()">Send</button>
  </div>

  <script>
    function toggleChat() {
      const box = document.getElementById("chat-box");
      const btn = document.getElementById("chat-toggle");
      if (box.style.display === "none" || box.style.display === "") {
        box.style.display = "block";
        btn.style.display = "none";
      } else {
        box.style.display = "none";
        btn.style.display = "block";
      }
    }

    async function sendMessage() {
      const input = document.getElementById("chat-input");
      const messages = document.getElementById("messages");
      const userMessage = input.value.trim();
      if (!userMessage) return;

      messages.innerHTML += '<div class="user-msg">You: ' + userMessage + '</div>';
      input.value = "";
      messages.innerHTML += '<div class="ai-msg" id="typing">Sakshi: typing...</div>';
      messages.scrollTop = messages.scrollHeight;

      try {
        const res = await fetch("/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage }),
        });

        const data = await res.json();
        document.getElementById("typing").remove();
        messages.innerHTML += '<div class="ai-msg">Sakshi: ' + data.reply + '</div>';
      } catch (error) {
        document.getElementById("typing").remove();
        messages.innerHTML += '<div class="ai-msg">Sakshi: Sorry, something went wrong!</div>';
      }

      messages.scrollTop = messages.scrollHeight;
    }

    document.getElementById("chat-input").addEventListener("keypress", function(e) {
      if (e.key === "Enter") sendMessage();
    });
  </script>

</body>
</html>
  `);
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: "You are a helpful AI assistant for Sakshi Chem Sciences Pvt Ltd.
        COMPANY PROFILE
------------------------------------------------------------------------
Name: Sakshi Chem Sciences Pvt Ltd
Company Type: Construction chemicals Manufacturer and supplier
GST No.: 27AARCS2821H1Z4
Address: 2nd Floor, Vishal Furniture House, Opposite Police Station, Sitabuldi, Nagpur, Maharashtra 440012
Phones: +91 9422802615, +91 7122980028, +91 9422146423
Director: Sandip Madanlalji Agrawal
Business Email: enquiry@sakshichemsciences.com
Website: https://www.sakshichemsciences.com/

CATALOG OVERVIEW — DECLARED PRODUCTS
------------------------------------------------------------------------
  - RD Powder
  - Shuttering Oil
  - Tile Adhesives
  - Curing Compound
  - Foaming Agent
  - Admixtures
  - Wall Putty
  - Polycarboxylate Ether
  - Concrete Admixture
  - Aac Block
  - Methyl Hydroxyethyl Cellulose
  - Bonding Agents
  - Masonry Mortar
  - Sulfonated Melamine Formaldehyde
  - Super Con
  - Industrial Grease
  - Polyvinyl Alcohol
  - Construction Admixtures
  - Cellulose Fibers
  - Methyl Hydroxyethyl Cellulose Mhec
  - PQC-Road Repair Solutions
  - Waterproofing Chemicals
  - Grout
  - Hardner
  - Floor Hardener
  - Agro Products
  - Epoxy
  - Paver Block Hardener
  - Calcium Formate
  - Paver Block
  - Mould Release Agent
  - Silica Powder
  - Hydroxyethyl Cellulose
  - Corrosion Inhibitor
  - Polysulphide Sealant
  - Fireproof Paints
  - Foam Generator
  - Floor Hardener for Concrete
  - Silicone Emulsion
  - Cement Plaster
  - Shuttering Grease
  - Epoxy Flooring Services
  - Starch
  - Cementitious Grout
  - Superplasticizer Admixture
  - Elastomeric Coatings
  - Hydroxypropyl Methylcellulose
  - Corrosion Resistant Coating

TDS PRODUCTS (Normalized)
------------------------------------------------------------------------
1. Product Name: ADDAGE Admix-100
   Also Known As: Expanding Grout Admixture
   Category: Grout Admixture
   Summary: Powder admixture combining plasticizer + gaseous expansion to compensate plastic shrinkage; improves fluidity and durability; typical unrestrained expansion up to ~4%.
   Key Specs:
     - dosage_examples:
         • 200 g per 50 kg OPC cement (20–22 L water) ≈ 35–36 L yield
         • 200 g per 50 kg OPC cement + 50 kg sand (22–24 L water) ≈ 57–58 L yield
     - chloride_content: Nil
     - time_for_expansion: 15 min to 2 hr (≥20°C)

2. Product Name: ADDAGE Plast Densifier
   Also Known As: Concrete Densifier, Surface Hardener
   Category: Densifier
   Summary: Liquid surface hardener; reacts with free lime to form dense C-S-H gel; improves abrasion/chemical resistance and reduces dusting.
   Key Specs:
     - application: Apply ≥25 days after concrete laid; brush/roller/spray

3. Product Name: ADDAGE Pumping Aid
   Also Known As: Concrete Pump Primer
   Category: Pumping Aid
   Summary: Water-soluble powder for priming pump/booms; improves pumpability; reduces pressure and wear; replaces cement slurries.
   Key Specs:
     - dosage: 200 g in 25 L water primes ~100 ft of 5" line

4. Product Name: ADDAGE VMA (P)
   Also Known As: Viscosity Modifying Admixture (Powder)
   Category: Admixture
   Summary: Water-soluble polymer powder to enhance viscosity, stability and reduce segregation; useful for SCC, underwater concrete, precast.
   Key Specs:
     - dosage: 0.1–0.4% bwoc
     - appearance: White to off-white powder

5. Product Name: ADDAGE CLC-FA Foaming Agent
   Also Known As: Foaming Agent (Synthetic)
   Category: Foaming Agent
   Summary: Concentrated foaming agent for lightweight foamed concrete; stable bubbles; low usage; good thermal/strength profile.
   Key Specs:
     - dosage: ≈0.8–1 L per m³; dilute 1:30–1:40 for foam generation

6. Product Name: Addage Floor Hardtop
   Also Known As: Non-metallic Surface Floor Hardener
   Category: Floor Hardener
   Summary: Dry-shake quartz aggregate hardener; monolithic bond; boosts abrasion resistance; suited for industrial floors.
   Key Specs:
     - coverage: 3–7 kg/m² depending on duty
     - compressive_strength: 50–60 N/mm² (as per IS:516)

7. Product Name: ADDAGE PLAST AP 430
   Also Known As: SNF-based Superplasticizer
   Category: Superplasticizer
   Summary: Sulphonated naphthalene-based water reducer; up to ~25% water reduction; IS:9103 compliant; improves strength/durability.
   Key Specs:
     - dosage: 0.6–1.5% bwoc
     - chloride: Nil

8. Product Name: ADDAGE PLAST AP 30B
   Also Known As: SNF-based Plasticizer
   Category: Plasticizer
   Summary: Water reducer for pumpable concrete; increases workability and cohesion; reduces bleeding/segregation.
   Key Specs:
     - dosage: As per trials; typical ~0.6–1.5% bwoc
     - chloride: Nil

9. Product Name: ADDAGE PLAST AP 501
   Also Known As: Lignosulphonate Plasticizer
   Category: Plasticizer
   Summary: Water-reducing plasticizer improving workability and strength; chloride-free; IS:9103 compliant.
   Key Specs:
     - dosage: 0.6–1.5% bwoc

10. Product Name: ADDAGE PLAST AP-600 AEA
   Also Known As: Air Entraining Agent
   Category: Admixture
   Summary: Air-entraining plasticizer to enhance workability and freeze–thaw/salt resistance; improves cohesion and reduces permeability.
   Key Specs:
     - dosage: 0.10–0.20 L per 50 kg cement for ~5% air
     - pH: 8–9

11. Product Name: ADDAGE AKULPOL 700 P
   Also Known As: SNF Powder
   Category: Admixture (Powder)
   Summary: Sulphonated naphthalene formaldehyde powder; high-range water reducer for early/high strength concrete; 98% solids.
   Key Specs:
     - dosage: 0.5–1.5% bwoc
     - bulk_density: 600–800 g/L

12. Product Name: ADDAGE AKULPOL-F1020
   Also Known As: SMF Powder
   Category: Superplasticizer (Powder)
   Summary: Melamine resin-based superplasticizer; high water reduction; high early/final strengths; reduces porosity/bleeding.
   Key Specs:
     - notes: ≈+1% air entrainment; faster demoulding for PSC/precast

13. Product Name: Addage Block Hardener
   Also Known As: AAC Block Hardener
   Category: Specialty Admixture
   Summary: Liquid setting hardener for AAC; early strength, faster demoulding; reduces breakage.
   Key Specs:
     - dosage: ≈1 kg per m³ (optimize via trials)

14. Product Name: Addage Bond It
   Also Known As: No Hacking Aid, Concrete Bonding Primer
   Category: Bonding Agent / Primer
   Summary: Single-coat, green-tinted primer for gypsum plaster on RCC/concrete; strong chemical/mechanical bond; no curing needed.
   Key Specs:
     - coverage: ≈5 m²/kg
     - dry_time: ≈24 hours

15. Product Name: ADDAGE BONDCOTE CCAARB
   Also Known As: Curing Compound (Aluminized Acrylic Resin Base)
   Category: Curing Compound
   Summary: Water-based acrylic emulsion forming a white film to retain moisture; reduces cracking/shrinkage; ASTM C156/C309 compliant.
   Key Specs:
     - coverage: 3.5–5 m²/L
     - drying_time: ≈2 hours @30°C

16. Product Name: Addage Tile Adhesive (Tile on Tile)
   Also Known As: Polymer-modified Tile Adhesive
   Category: Tile Adhesive
   Summary: Cementitious, polymer-modified adhesive for internal walls/floors, external floors, tile-on-tile, and pools; low shrinkage; no curing.
   Key Specs:
     - mix_ratio: Powder:Water = 3:1 (vol.)
     - open_time: 10–15 min @30°C
     - trafficable: 24 hrs


DOCUMENTS
------------------------------------------------------------------------
• Title: Sakshi Chem Sciences - Technical Data Sheets (Compilation)
  Type: TDS Bundle
  Source File: /mnt/data/ilovepdf_merged.pdf
  Products Included: ADDAGE Admix-100, ADDAGE Plast Densifier, ADDAGE Pumping Aid, ADDAGE VMA (P), ADDAGE CLC-FA Foaming Agent, Addage Floor Hardtop, ADDAGE PLAST AP 430, ADDAGE PLAST AP 30B, ADDAGE PLAST AP 501, ADDAGE PLAST AP-600 AEA, ADDAGE AKULPOL 700 P, ADDAGE AKULPOL-F1020, Addage Block Hardener, Addage Bond It, ADDAGE BONDCOTE CCAARB, Addage Tile Adhesive (Tile on Tile)
  Notes: Multiple product TDS merged in one PDF; use product sections for chunking.


SEED FAQS
------------------------------------------------------------------------
Q: What is the recommended dosage for ADDAGE PLAST AP 430?
A: Typically 0.6–1.5% by weight of cement. Optimize with site trials.

Q: Can Addage Tile Adhesive be used for swimming pools?
A: Yes, it is suitable for swimming pool tiling applications. Ensure proper cure times and grouting next day.

Q: Is ADDAGE BONDCOTE CCAARB compliant with standards?
A: Yes, it conforms to ASTM C156 and ASTM C309-07 Type 2.


USAGE NOTES FOR AI AGENTS (RAG)
------------------------------------------------------------------------
• Index the TDS product entries (name, aka, category, summary, key specs).
• Embed text using a high-quality embedding model (e.g., text-embedding-3-large).
• Store in a vector DB with metadata: product_name, category, doc_title, doc_type.
• Retrieve with hybrid search (filters + semantic similarity, top_k≈5) and re-rank.
• Ground answers with exact dosages/specs and mention related standards where applicable.
• For safety/storage/compliance questions, search the TDS first before generalizing. ",
      messages: [{ role: "user", content: userMessage }],
    });

    res.json({ reply: response.content[0].text });
  } catch (error) {
    console.error(error);
    res.json({ reply: "Sorry, something went wrong. Please try again." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("AI Agent running on port " + PORT);
});


