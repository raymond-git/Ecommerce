import { useSelector } from "react-redux"

const CheckoutForm = () => {

  const viewCart = useSelector(state => state.cart.products);

  const handleCheckout = (event) => {
    event.preventDefault();
    fetch("/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({
        items: viewCart,
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(({ url }) => window.location = url)
      .catch(console.error);
  }

  return (
    <div>
      <button onClick={handleCheckout} className="btn btn-primary btn-lg btn-block font-sans h-10 flex items-center justify-center lg:h-14 lg:btn-lg">Go to checkout</button>
    </div>
  )
}

export default CheckoutForm;