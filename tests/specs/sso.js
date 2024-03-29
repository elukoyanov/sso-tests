const assert = require("assert");

const loginPage = require("../pages/Login.page");
const homePage = require("../pages/Home.page");
const logins = require("../data/logins");
const { formatPhone } = require("../utils");

describe("Authentication page.", () => {
  beforeEach(async () => {
    await loginPage.open();
  });

  // нормальный вход
  it("User log in successfully with correct credentials.", async () => {
    await loginPage.login(logins.userCorrect);
    await homePage.waitLoad();

    const phoneText = await homePage.accountPhoneText;
    assert.equal(phoneText, formatPhone(logins.userCorrect.phone));
  });

  // неправильный пароль - успешный логин - неправильный пароль - счётчик работает заного
  it("False password counts resets after login.", async () => {
    await loginPage.login(logins.userWithWrongPass);

    const helpText = await loginPage.inputPasswordHelpText;
    assert(helpText.includes("Осталось попыток 2 из 3"));

    await loginPage.fillPassword(logins.userCorrect.password);
    await loginPage.acceptPassword();

    await homePage.waitLoad();
    const phoneText = await homePage.accountPhoneText;
    assert.equal(phoneText, formatPhone(logins.userCorrect.phone));

    await homePage.logout();
    await loginPage.open();

    await loginPage.login(logins.userWithWrongPass);

    const helpTextAfter = await loginPage.inputPasswordHelpText;
    assert(helpTextAfter.includes("Вы ввели неверный пароль"));
    assert(helpTextAfter.includes("Осталось попыток 2 из 3"));
  });

  // неправильный пароль - неправильный - неправильный - блок аккаунта
  it("Account is blocked after 3 wrong passwords", async () => {
  // неправильный пароль - неправильный - неправильный - капча
  // it("Captcha appears after 3 password errors", async () => {
    await loginPage.login(logins.userWithWrongPass);

    const helpText = await loginPage.inputPasswordHelpText;
    assert(helpText.includes("Осталось попыток 2 из 3"));

    await loginPage.fillPassword(logins.userWithWrongPass.password);
    await loginPage.acceptPassword();

    const helpText2 = await loginPage.inputPasswordHelpText;
    assert(helpText2.includes("Осталось попыток 1 из 3"));

    await loginPage.fillPassword(logins.userWithWrongPass.password);
    await loginPage.acceptPassword();

    const text = await loginPage.accountBlockedIntroText;
    assert.equal(text, "Учетная запись заблокирована в связи с превышением попыток ввода пароля");
  });
});