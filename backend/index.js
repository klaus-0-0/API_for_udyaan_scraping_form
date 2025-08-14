const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();

const url = "https://udyamregistration.gov.in/UdyamRegistration.aspx";

async function fetchData() {
  try {
    const response = await axios.get(url);
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
    console.error("Error fetching:", err);
    return [];
  }
}

app.get("/api/scrape-udyam-data-123", async (req, res) => {
  const data = await fetchData();
  res.json({ input: data });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
});
