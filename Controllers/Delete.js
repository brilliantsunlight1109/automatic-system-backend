const fs = require("fs");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");
const express = require("express");
const puppeteer = require("puppeteer-extra");
const app = express();
const moment = require("moment");
const Delete = require("../Models/Delete");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
let counter = 0;
let control = "";

module.exports.Start = async (req, res) => {
  console.log("req.body: ", req.body);
  control = req.body.state;
  console.log("control: ", control);
  await Delete.findOneAndUpdate(req.body)
    .then((data) => res.json({ message: "Delete start", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to add Delete", error: err.message })
    );
  let checkCookiesValidity = async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    // Load cookies from the saved JSON file
    const savedCookies = JSON.parse(fs.readFileSync("cookies.json", "utf8"));
    await page.setCookie(...savedCookies);

    //Navigate to the page to check cookies validity
    await page.goto("https://salonboard.com/CNB/draft/styleList/", {
      timeout: 600000,
    });
    const loginButton = await page.$(
      "div.contents div.section div.bottom_button_area.mod_link_color01 > a"
    );

    console.log("loginButton: ", loginButton);
    if (loginButton) {
      console.log("Cookies are invalid. Rerunning login...");
      await page.browser().close();
      return await loginAndSave();
    } else {
      // If no login button, cookies are still valid
      console.log("Cookies are still valid.");
      return { browser, page };
    }
  };

  let loginAndSave = async () => {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    try {
      await page.goto("https://salonboard.com/login/", { timeout: 600000 });
      await page.type("input.w240", "CD66356");
      await page.type("input.loginPwInput", "bridge123!!!");
      await page.waitForXPath('//*[@id="idPasswordInputForm"]/div/div[2]/a', {
        timeout: 600000,
      });
      const linkElement = await page.$x(
        '//*[@id="idPasswordInputForm"]/div/div[2]/a'
      );
      await linkElement[0].click();
      console.log("login button click ok");
      await new Promise((resolve) => setTimeout(resolve, 10000));
      //   const cookies = await page.cookies();
      //   fs.writeFileSync("cookies.json", JSON.stringify(cookies));
      //   await page.goto("https://salonboard.com/CNB/draft/styleEdit/", {
      //     waitUntil: "networkidle0",
      //   });
      await page.goto("https://salonboard.com/CNB/draft/styleList/", {
        timeout: 600000,
      });
      console.log("top");
      // await browser.close();
      return { browser, page };
      //
    } catch (error) {
      console.error("Error during login:", error.message);
      // Retry login if there's an error
      return await loginAndSave();
    }
  };
  let deleteLoop = async (page) => {
    await page.waitForXPath(
      '//*[@id="sortStyleForm"]/table/tbody/tr[3]/td[6]/p/a/img',
      { timeout: 600000 }
    );
    const deleteButtons = await page.$x(
      '//*[@id="sortStyleForm"]/table/tbody/tr[3]/td[6]/p/a/img'
    );
    if (deleteButtons.length > 0) {
      const deleteButton = deleteButtons[0];
      deleteButton.click();
      await page.evaluate(`window.confirm = () => true`);
      console.log("enter click complete");
      await new Promise((resolve) => setTimeout(resolve, 10000));
    } else {
      console.log("delete button not search");
    }
  };
  let main = async () => {
    if (control == "開始") {
      console.log("delete for start");
      const { browser, page } = await checkCookiesValidity();
      const maxRetries = 3;
      for (let i = 0; i < 10000; i++) {
        let retryCount = 0;
        while (retryCount < maxRetries) {
          try {
            console.log("==============================");
            console.log("Item #" + i);
            if (control == "開始") {
              console.log("delete start");
              counter++;
              console.log("counter: ", counter);
              await deleteLoop(page);
              await new Promise((resolve) => setTimeout(resolve, 100000));
              break;
            } else {
              console.log("delete for stop");
              await page.browser().close();
              console.log("stop counter number: ", counter);
              counter = 0;
              return;
            }
          } catch (error) {
            console.error(`Error processing item #${i}: ${error.message}`);

            //Incerment the retry count
            retryCount++;

            //Retry after a delay (you can adjust the delay as needed)
            console.log(`Retrying in 3 seconds...`);
            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }
        if (retryCount === maxRetries) {
          console.error(
            `Failed to process Item #${i} after ${maxRetries} retries. Skipping to the next item.`
          );
        }
      }
    } else {
      console.log("delete for stop");
      return;
    }
  };
  await main();
};

module.exports.Get = async (req, res) => {
  Delete.find()
    .then((data) => res.json(data))
    .catch((err) =>
      res.status(404).json({ message: "get not", error: err.message })
    );
};
