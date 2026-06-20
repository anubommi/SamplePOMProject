import {Page, Locator } from "@playwright/test";
export class LoginPage{

    readonly page: Page;
    readonly loginLink: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    constructor (Page: Page)
    {
        this.page = Page;
        this.loginLink = Page.locator("a#login2");
        this.username = Page.locator("#loginusername");
        this.password = Page.locator("#loginpassword");
        this.loginButton = Page.locator("button[onclick='logIn()']");
    }
    async gotologinPage()
    {
        await this.page.goto("https://www.demoblaze.com/");
    }
    async login(username: string, password: string)
    {
        await this.loginLink.click();
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

}