import { Page, Locator } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator("#tbodyid>tr>td:nth-child(2)");
    }
    async checkcartitems(productName: string)
    {
        const items = await this.cartItems.allTextContents();
        console.log('Cart items:', items);

        for(const item of items)
        {
            if(item.trim().toLowerCase()===productName.toLowerCase())
            {
                console.log(`Product "${productName}" is present in the cart.`);
                  return true;
                break;
              
            }
            else
            {
                console.log(`Product "${productName}" is NOT present in the cart.`);
            }
        }
    }
}
