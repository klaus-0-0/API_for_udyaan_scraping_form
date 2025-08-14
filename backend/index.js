// fetchAndPush.js
import axios from "axios";
import cheerio from "cheerio";

const URL = "https://udyamregistration.gov.in/UdyamRegistration.aspx";
const API_ENDPOINT = "https://your-api-endpoint.com/saveFields"; 

async function fetchAndPush() {
  try {
    const response = await axios.get(URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.188 Safari/537.36",
      },
    });

    const $ = cheerio.load(response.data);
    const inputs = [];

    $("input").each((_, el) => {
      inputs.push({
        id: $(el).attr("id") || "",
        name: $(el).attr("name") || "",
        type: $(el).attr("type") || "",
        maxlength: $(el).attr("maxlength") || "",
        placeholder: $(el).attr("placeholder") || "",
      });
    });

    // Send to your API / database
    const res = await axios.post(API_ENDPOINT, { inputFields: inputs });
    console.log("Data saved:", res.data);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Run the function
fetchAndPush();
