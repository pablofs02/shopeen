import { useEffect } from 'react';
import { useFilterContext } from '../context/FilterContext';
import '../styles/helpStyle.css'

function Help() {

    const {handleClearCategory, handleClearRange} = useFilterContext();
    
    useEffect(() => {
        handleClearRange();
        handleClearCategory();
    }, []);
    
    return (
        <section tabIndex={0} className="help-section">
            <h2 className='help'>Help Section</h2>

            <h3 className='help'>Home</h3>
            <p className='help'>The home page is the first page you will see when you enter the application. In it you can find a selection recommended products, a list of the most popular products and a list of products on stock. You can click on one of them and it will take you to the store page with the corresponding filter applied.
            </p>

            <h3 className='help'>Store</h3>
            <p className='help'>The store page is the main page of the application. It contains a list of products that can be filtered by price and category. You can see the price of the product, it's name and a image. You can click on the show more button to see more information about the product, including the avaliable stock.
            </p>

            <h3 className='help'>Filter</h3>
            <p className='help'>On the store page, at the top, you can find a button labeled "Filter Options". Clicking on it will open a
                dropdown menu consisting of two parts: price range and category. In the price range section, you can set a
                minimum and maximum price range using the provided numeric input fields. In the category section, you can
                select one or more categories that interest you by checking the corresponding boxes.
                There are also "Clear" buttons to remove applied filters. The "Filter" button is used to apply the selected
                filters and update the search results on the main page.
            </p>

            <h3 className='help'>Search Bar</h3>
            <p className='help'>The search bar can be found at the top of Shopeen at all times. To use it, simply type what you want to find in the text box. The search results will be displayed on the store page. You can click on the "x" button to clear the search bar.
            </p>

            <h3 className='help'>Managing the Shopping Cart</h3>
            <p className='help'>Under each product, there is a blue button that allows us to add any product to the cart. Once a product has been added to the cart, it can be removed from the cart by clicking on the red button in the same place. If there is no stock, a message will appear warning you of this.
            </p>

            <p className='help'>In addition, the shopping cart button is located at the top right. Clicking on it opens a dropdown menu with
                the contents of the cart. Under each product that we have added, there is an option to increase the quantity
                with the "+" button, decrease the quantity with the "-" button, and directly delete the product from the
                cart with the "x" button.
            </p>

            <p className='help'>You can also use the clean cart button to remove all the products from the cart. It will ask for a confirmation, so that you do not accidentally remove all the products.
            </p>

            <h3 className='help'>Purchase</h3>
            <p className='help'>To make a purchase, you must first add the products you want to the cart. Once you have done this, you can click on the "Proceed to checkout" button of the cart. This will take you to the purchase page, where you can see the products you have added to the cart. There you can see the total price of the purchase and the total price of the products. To complete the purchase, you must click on the "Finish purchase" button.
            </p>
        </section>
    )

}

export default Help