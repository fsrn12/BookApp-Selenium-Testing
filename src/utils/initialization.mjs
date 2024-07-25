import { configDotenv } from "dotenv";
import { Browser, Builder, By, Key, until } from "selenium-webdriver";
import { expect } from "vitest";
configDotenv("../.env");

const randNum = (n) => Math.ceil(Math.random() * n);
const genISBN = () => `0${randNum(10000)}${randNum(10000)}${randNum(10)}`;
const randomId = () => Math.floor(Math.random() * 100000).toString(36);
const genEmail = () => `fsr-${randomId()}@home.com`;
let uid = randomId();
let email = genEmail();
let password = "Standard@42";
let ISBN = genISBN();
let driver, firstName;

export const init = async function () {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
  driver.manage().window().maximize();
  return driver;
};

export const getUrl = async function () {
  await driver.get(process.env.FRONTEND_URL);
};

export const quit = async function () {
  await driver.quit();
};

export const setDelay = async function () {
  await driver.sleep(2000);
};

export const testTitle = async function (theTitle) {
  let title = await driver.getTitle();
  expect(title).toEqual(theTitle);
};

export const testMsg = async function (msg, selector = "message") {
  let message = await driver.findElement(By.name(selector)).getText();
  expect(message).toEqual(msg);
};

/**
 * Asserts the Title of a Page
 * @param {string} title
 *  @returns {Promise<void>}
 */
export const isCorrectPage = async function (title) {
  await driver.wait(until.titleContains(title), 2000);
  await testTitle(title);
};

/**
 * Finds a DOM Element and performs a Mouse Click Event on the Element
 * @param {string} selector
 * @param {string} method?
 * @returns {Promise<void>}
 */
export const getElementAndClick = async function (selector, method = "name") {
  let element = await driver.findElement(By[method](selector));
  await element.click();
};

/**
 * @param {string} selector
 * @param {string|number} value
 * @param {string} method?
 * @param {string} key?
 *  @returns {Promise<void>}
 */
export const getElementAndSendKeys = async function (
  selector,
  value,
  method = "name",
  key = "TAB"
) {
  let element = await driver.findElement(By[method](selector));
  await element.clear();
  await element.sendKeys(value, Key[key]);
};

export const getPageAndTitle = async function (
  selector,
  title,
  method = "name"
) {
  await getElementAndClick(selector, method);
  await isCorrectPage(title);
  await setDelay();
};

export const signupUser = async function () {
  firstName = "Merlin";
  await getElementAndSendKeys("firstName", firstName);
  await getElementAndSendKeys("lastName", "Snow");
  await getElementAndSendKeys("address", "123 Park Lane");
  await getElementAndSendKeys("city", "London");
  await getElementAndSendKeys("postcode", "SW20 2BE");
  await getElementAndSendKeys("email", email);
  await getElementAndSendKeys("password", password);
  await getElementAndSendKeys("confirmPassword", password);
  await getElementAndClick("signup-btn");
  return firstName;
};

export const loginUser = async function () {
  await getElementAndSendKeys("email", email);
  await getElementAndSendKeys("password", password);
  await getElementAndClick("login-btn");
};

export const logoutUser = async function () {
  await getElementAndClick("logout");
};

export const addBook = async function () {
  await getElementAndSendKeys("title", `Test Book-${uid}`);
  await getElementAndSendKeys("author", `Test Author-${uid}`, "id");
  await getElementAndSendKeys("ISBN", ISBN);
  await getElementAndSendKeys("publisher", "Test Publisher");
  await getElementAndSendKeys("yearPublished", "20-12-2007");
  await getElementAndSendKeys("numberOfPages", 72);
  await getElementAndSendKeys("price", 9.99);
  await getElementAndClick("addBook-btn");
};

export const editBook = async function () {
  await getElementAndSendKeys("price", 16.99);
  await getElementAndClick("editBook-btn");
};

export const addAuthor = async function () {
  await getElementAndSendKeys("name", `Test Author-${uid}`);
  await getElementAndSendKeys("publisher", `Test Publisher-${uid}`);
  await getElementAndSendKeys("website", "www.authorweb.com");
  await getElementAndSendKeys("twitter", "@twitter");
  await getElementAndSendKeys("about", "A very good author");
  await getElementAndClick("addAuthor-btn");
};

export const editAuthor = async function () {
  await isCorrectPage("Edit Author");
  await getElementAndSendKeys("name", `Test Author-${uid}-updated`);
  await getElementAndSendKeys("publisher", `Test Publisher-${uid}-updated`);
  await getElementAndSendKeys("website", "www.authorweb2.com");
  await getElementAndSendKeys("twitter", "@twitter2");
  await getElementAndSendKeys(
    "about",
    "Writing was my passion from a very early age."
  );
  await getElementAndClick("editAuthor-btn");
};
