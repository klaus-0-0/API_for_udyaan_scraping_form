const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

const URL = "https://udyamregistration.gov.in/UdyamRegistration.aspx";

// Function to fetch and parse data
async function fetchData() {
  try {
    const response = await axios.get(URL, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
    });
    const html = response.data;
    const $ = cheerio.load(html);

    const inputs = [];
    $('input').each((_, el) => {
      inputs.push({
        name: $(el).attr('name') || '',
        type: $(el).attr('type') || '',
        maxlength: $(el).attr('maxlength') || '',
        id: $(el).attr('id') || '',
        placeholder: $(el).attr('placeholder') || ''
      });
    });

    return inputs;
  } catch (err) {
    console.error("Error fetching data:", err);
    return [];
  }
}

// Express API route
app.get("/api/scrape-udyam-data-123", async (req, res) => {
  const data = await fetchData();
  res.json({ input: data }); // sends JSON data to frontend
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
