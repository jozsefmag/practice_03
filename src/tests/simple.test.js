import { expect,assert, should } from 'chai';
should()

describe("Sauce Demo E2E Test", () => {
    before(async () => {
        await browser.url('https://www.saucedemo.com/');
    });

    it('Check page title', async () => {
        const title = await browser.getTitle()
        // Assertion 1: Using assert
        assert.include(title, 'Swag Labs');
    })

    it('Login to website', async () => {
        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()
    })

    it('Add item to cart and checkout', async () => {
        expect(await $('.inventory_item_price').getText()).to.equal('$29.99')
        await $('#add-to-cart-sauce-labs-backpack').click()
        await $('.shopping_cart_link').click()
        await $('#checkout').click()


        await $('#first-name').setValue("John");
        await $('#last-name').setValue("Doe");
        await $('#postal-code').setValue("4444");
        await $('#continue').click()

        const itemName = await $('.inventory_item_name').getText();
        assert.equal(itemName, "Sauce Labs Backpack", "Item name should match the expected value");;
        const totalPrice = await $('.summary_total_label').getText();
        totalPrice.should.include('$32.39', 'Total price should include $32.39')
    })

    it("Finish shopping", async () => {
        await $('#finish').click()
        await $('#back-to-products').click()
        expect(await $('.app_logo').getText()).to.equal("Swag Labs")
    })
});
