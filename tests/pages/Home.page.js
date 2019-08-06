class HomePage {
  get accountMenuButton() {
    return $(".mts16-other-sites__link.js-mts16-lk-opener.gtm-menu");
  }

  get accountMenuList() {
    return $(
      ".mts16-other-sites__item.mts16-other-sites__item_lk > .mts16-lk-drop.js-mts16-lk-drop"
    );
  }

  get accountMenuLogout() {
    return $(".qa-pointer.js-logout.mts16-lk-drop__link.gtm-menu-element");
  }

  get accountPhone() {
    return $("#headerWithMenu .mts16-other-sites .mts16-other-sites__phone");
  }

  get accountPhoneText() {
    return this.accountPhone.then(el => el.getText());
  }

  async toggleAccountMenu() {
    const res = await this.accountMenuButton;
    return res.click();
  }

  async logout() {
    await this.toggleAccountMenu();
    return (await this.accountMenuLogout).click();
  }

  async waitLoad() {
    await this.accountPhone.then(el => el.waitForExist());
    await browser.waitUntil(
      () => {
        return this.accountPhone.then(el => el.getText()) !== "";
      },
      10000,
      "expected phone to appear in 10s"
    );
  }
}

const homePage = new HomePage();
module.exports = homePage;
