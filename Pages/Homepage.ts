import { Page, Locator } from "@playwright/test";
export class Homepage {
    readonly page: Page;
    readonly productlist: Locator;
    readonly addToCartbtn: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productlist = page.locator("div#tbodyid>div>div>div>h4>a");
        this.addToCartbtn = page.locator("a.btn-success");
        this.cartLink = page.locator("a#cartur");
    }
    async addproductToCart(productName: string) {
        const productNames = await this.productlist.allTextContents();
        console.log('Product names:', productNames);
        for (let i = 0; i < productNames.length; i++) {
            if (productNames[i].trim().toLowerCase() === productName.toLowerCase()) {
                await this.productlist.nth(i).click();
                break;
            }
        }
        this.page.on('dialog', async dialog => {
            const message = dialog.message();
            console.log('Dialog message:', message);
            if (message.includes('productadded')) {

                await dialog.accept();
            }
        })
       await this.addToCartbtn.click();
    }


async gotocartPage() {
    
        await this.cartLink.click();
        await this.page.waitForTimeout(5000);
    }
}