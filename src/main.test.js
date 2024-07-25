import { afterAll, beforeAll, describe, it } from "vitest";
import {
  addAuthor,
  addBook,
  editAuthor,
  editBook,
  getElementAndClick,
  getPageAndTitle,
  getUrl,
  init,
  isCorrectPage,
  loginUser,
  logoutUser,
  quit,
  setDelay,
  signupUser,
  testMsg,
  testTitle,
} from "./utils/initialization.mjs";

describe("Book App Frontend Testing", () => {
  let driver, firstName;
  beforeAll(async () => {
    driver = await init();
  });

  afterAll(async () => {
    await quit();
  });

  it("Should Open Home Page", async () => {
    await getUrl();
    await testTitle("Home");
    await setDelay();
  });

  it("Should Open SignUp Page", async () => {
    await getPageAndTitle("signup", "SignUp");
  });

  it("Should Perform User SignUp", async () => {
    await isCorrectPage("SignUp");
    firstName = await signupUser();
    await isCorrectPage("Login");
    await testMsg("Registration Successful");
    await setDelay();
  });

  it("Should Perform User Login", async () => {
    await isCorrectPage("Login");
    await loginUser();
    await isCorrectPage("Home");
    await testMsg(`Welcome ${firstName}`);
    await setDelay();
  });

  it("Should Open Books Page", async () => {
    await getPageAndTitle("books", "Books");
  });

  it("Should Open addBook Page", async () => {
    await getPageAndTitle("addBook", "Add a Book");
    await testMsg("Add A Book", "h2-title");
    await setDelay();
  });

  it("Should Fill & Submit addBook Form", async () => {
    await isCorrectPage("Add a Book");
    await addBook();
    await isCorrectPage("Books");
    await testMsg("Books Created - POST Request Success");
    await setDelay();
  });

  it("Should Open editBook Page", async () => {
    await isCorrectPage("Books");
    await getPageAndTitle("editBook", "Edit Book");
    await testMsg("Edit A Book", "h2-title");
    await setDelay();
  });

  it("Should Edit Book Details and Submit", async () => {
    await isCorrectPage("Edit Book");
    await editBook();
    await isCorrectPage("Books");
    await testMsg("Book Updated - PUT Request Success");
    await setDelay();
  });

  it("Should Delete Book", async () => {
    await getPageAndTitle("deleteBook", "Books");
    await testMsg("Book Deleted - DELETE Request Success");
    await setDelay();
  });

  it("Should Open Authors Page", async () => {
    await getPageAndTitle("authors", "Authors", "id");
    await testMsg("Authors Found - GET Request Success");
    await setDelay();
  });

  it("Should Open addAuthor Page", async () => {
    await isCorrectPage("Authors");
    await getElementAndClick("addAuthor");
    await isCorrectPage("Add an Author");
    await testMsg("Add An Author", "h2-title");
    await setDelay();
  });

  it("Should Fill & Submit addAuthor Form", async () => {
    await isCorrectPage("Add an Author");
    await addAuthor();
    await isCorrectPage("Authors");
    await testMsg("Author Created - POST Request Success");
    await setDelay();
  });

  it("Should Open editAuthor Page", async () => {
    await isCorrectPage("Authors");
    await getPageAndTitle("editAuthor", "Edit Author");
    await testMsg("Here You Can Edit The Information About This Author");
    await setDelay();
  });

  it("Should Fill & Submit editAuthor Form", async () => {
    await isCorrectPage("Edit Author");
    await editAuthor();
    await isCorrectPage("Authors");
    await testMsg("Author Updated Successfully");
    await setDelay();
  });

  it("Should Delete Author", async () => {
    await getPageAndTitle("deleteAuthor", "Authors");
    await testMsg("Author Deleted Successfully");
    await setDelay();
  });

  it("Should Open About Page", async () => {
    await getPageAndTitle("about", "About", "id");
  });

  it("Should Logout User", async () => {
    await logoutUser();
    await isCorrectPage("Home");
    await setDelay();
  });
});
