const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const PythURL = "https://pyth.network/developers/price-feed-ids";
const SocketAPI =
  "https://api.socket.tech/v2/token-lists/from-token-list?fromChainId=137";
const apiKey = "72a5b4b0-e727-48be-8aa1-5da9d62fe635";
const outputFilePath = "SupportedTokens.json";
const screenshotPath = "pyth_price_ids_page.png";
async function scrapePythPriceIDs() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  console.log("Opening Pyth PriceIDs Page...");
  await page.goto(PythURL);
  await page.screenshot({ path: screenshotPath });
  await page.waitForSelector("tr.border-t.border-beige-300");

  console.log("Scraping PriceIDs...");
  const content = await page.content();
  const $ = cheerio.load(content);

  const cryptoData = [];

  $("tr.border-t.border-beige-300").each((index, element) => {
    const cryptoTag = $(element).find("td").first().text().trim();
    const id = $(element).find("span.hidden.lg\\:block").text().trim();

    cryptoData.push({ pythSymbol: cryptoTag, id });
  });

  await browser.close();
  console.log("Scraped PriceIDs...");

  return cryptoData;
}

async function fetchSocketTokens() {
  console.log("Fetching Socket Tokens ...");
  try {
    const response = await axios.get(SocketAPI, {
      headers: {
        Accept: "application/json",
        "API-KEY": apiKey,
      },
    });

    return response.data.result;
  } catch (error) {
    console.error("error from socket ", error);
    throw error;
  }
}

function findPythtoSocketToken(cryptoData, apiData) {
  const matchingEntries = [];

  apiData.forEach((token) => {
    cryptoData.forEach((crypto) => {
      const USDTicker = crypto.pythSymbol.split(".");
      if (USDTicker && USDTicker[0] === "Crypto") {
        const symbol = USDTicker[1].split("/");
        if (symbol && symbol[0] && symbol[0] === token.symbol) {
          matchingEntries.push({
            ...crypto,
            symbol: token.symbol,
            name: token.name,
          });
        }
      }
    });
  });

  return matchingEntries;
}

(async () => {
  try {
    const cryptoData = await scrapePythPriceIDs();
    const socketTokens = await fetchSocketTokens();
    const matchingEntries = findPythtoSocketToken(cryptoData, socketTokens);

    fs.writeFileSync(
      outputFilePath,
      JSON.stringify(matchingEntries, null, 2),
      "utf-8",
    );

    console.log(
      `Socket<>Pyth PriceIDs written total tokens: ${matchingEntries.length}`,
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
