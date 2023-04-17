import { useGlobalContext } from "../context/GlobalContext";
import { PurchaseItem } from "../components/PurchaseItem";

function Purchase() {
    const { cartItems } = useGlobalContext()

    return (
        <>
          <section className="cuerpo">
            <div className="bar">
              <h1>Guille fraude</h1>
            </div>
            <div className="row">
              {cartItems.map((item:any) => (
                <div className="col-12 col-md-6 col-lg-4">
                  <PurchaseItem {...item} key={item.id} ></PurchaseItem>
                </div>
              ))}
            </div>
          </section>
        </>
      );
}

export default Purchase;