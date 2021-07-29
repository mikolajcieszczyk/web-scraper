const puppeteer = require("puppeteer");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { source } = yargs(hideBin(process.argv)).argv
const { baseUrl, selectors, paths } = require(`./${source}.json`);

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

        await page.goto(baseUrl);
        
        for (const [key, selector] of Object.entries(selectors)) {
          await page.waitForSelector(selector);
    
          const element = await page.$(selector);
    
          if (!element) continue;
    
          const value = await page.evaluate(el => el.textContent, element);
    
          console.log(`${key}: ${value}`);

          fs.writeFile(
            "./json_output/scrapped-data.json",
            JSON.stringify(data),
            function (err) {
              if (err) throw err;
              console.log("Saved!");
            }
          );
        }
      
      await browser.close();    
})();