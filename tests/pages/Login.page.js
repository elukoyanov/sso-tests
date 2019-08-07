class LoginPage {
  async open() {
    await browser.reloadSession();
    await browser.url("");
    await this.waitLoad();
  }

  async waitLoad() {
    await this.inputPhone.then(el => el.waitForEnabled(30000));
  }

  // phone input form
  get introPassword() {
    return $("#login-phone-form .intro-text");
  }

  get inputPhone() {
    return $("#login-phone-form #phone-input").then(el => el.shadow$("input"));
  }

  get buttonPhoneAccept() {
    return $("#login-phone-form mts-button");
  }
  async fillPhone(phone) {
    const res = await this.inputPhone;
    return res.setValue(phone);
  }

  async acceptPhone() {
    const res = await this.buttonPhoneAccept;
    return res.click();
  }

  // password input form
  get introPassword() {
    return $("#enter-password-form .intro-text");
  }

  get inputPassword() {
    return $("#enter-password-form #password-input").then(el =>
      el.shadow$("input")
    );
  }

  get buttonPasswordAccept() {
    return $("#enter-password-form mts-button");
  }

  get inputPasswordHelp() {
    return $("#enter-password-form mts-password-field").then(el =>
      el.shadow$(".field-help")
    );
  }

  get inputPasswordHelpText() {
    return this.inputPasswordHelp.then(el => el.getText());
  }

  async fillPassword(password) {
    const res = await this.inputPassword;
    return res.setValue(password);
  }

  async acceptPassword() {
    const res = await this.buttonPasswordAccept;
    return res.click();
  }

  // account blocked form
  // .intro-text Учетная запись заблокирована в связи с превышением попыток ввода пароля
  // .info-text Доступ будет автоматически восстановлен 05.08.2019 в 22:13 (время московское).
  // .proposal-text Для немедленного восстановления доступа получите новый пароль
  get accountBlockedIntro() {
    return $("form.account-is-blocked .intro-text");
  }

  get accountBlockedIntroText() {
    return this.accountBlockedIntro.then(el => el.getText());
  }

  async login(user) {
    await this.fillPhone(user.phone);
    await this.acceptPhone();
    await this.fillPassword(user.password);
    await this.acceptPassword();
  }
}

const loginPage = new LoginPage();
module.exports = loginPage;
