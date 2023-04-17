import '../styles/helpStyle.css'

function Help() {

    
    return (
        <section className="help-section">
            <h2 className='help'>Help Section</h2>

            <h3 className='help'>Filter</h3>
            <p className='help'>On the store page, at the top, you can find a button labeled "Filter Options". Clicking on it will open a
                dropdown menu consisting of two parts: price range and category. In the price range section, you can set a
                minimum and maximum price range using the provided numeric input fields. In the category section, you can
                select one or more categories that interest you by checking the corresponding boxes.
                There are also "Clear" buttons to remove applied filters. The "Filter" button is used to apply the selected
                filters and update the search results on the main page.
            </p>

            <h3 className='help'>Search Bar</h3>
            <p className='help'>The search bar can be found at the top of Shopeen at all times. To use it, simply type what you want to find
                in the text box and click on the magnifying glass.
            </p>

            <h3 className='help'>Managing the Shopping Cart</h3>
            <p className='help'>Under each product, there is a blue button that allows us to add any product to the cart. Once a product has
                been added to the cart, it can be removed from the cart by clicking on the red button in the same place. If
                there is no stock, a message will appear warning you of this.
            </p>

            <p className='help'>In addition, the shopping cart button is located at the top right. Clicking on it opens a dropdown menu with
                the contents of the cart. Under each product that we have added, there is an option to increase the quantity
                with the "+" button, decrease the quantity with the "-" button, and directly delete the product from the
                cart with the "x" button.
            </p>
        </section>
    )

}

export default Help