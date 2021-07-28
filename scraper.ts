const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const url = "https://pl.wikipedia.org/wiki/ORP_Mewa_(1966)";

const scrapeData = async () => {
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const content = $("#content");
      const data = [];

      content.each(function () {
        const title = $(this).find("h1").text();
        const articleContent = $(this).find(".mw-parser-output > p").text();
        const citation = $(this).find(".citation").text();

        data.push({
          title,
          articleContent,
          citation,
        });
      });

      console.log(data);

      fs.writeFile(
        "./json_output/scrapped-data.json",
        JSON.stringify(data),
        function (err) {
          if (err) throw err;
          console.log("Saved!");
        }
      );
    })
    .catch(console.error);
};

scrapeData();
