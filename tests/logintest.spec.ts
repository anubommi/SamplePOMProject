import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/loginpage';
import { Homepage } from '../Pages/Homepage';
import { CartPage } from '../Pages/cartpage';
import * as testdata from '../testdata/data.json'; 
test('Login Test', async ({ page }) => {

    const loginnpage = new LoginPage(page);
    await loginnpage.gotologinPage();
    await loginnpage.login(testdata.login.username, testdata.login.password);

    const homepage = new Homepage(page);
    await homepage.addproductToCart(testdata.homepage.product);
    await homepage.gotocartPage();

    const cartpage = new CartPage(page);
   const status = await cartpage.checkcartitems(testdata.homepage.product);
   expect(status).toBe(true);
});