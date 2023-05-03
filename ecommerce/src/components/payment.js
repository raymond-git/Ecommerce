import { useSelector } from "react-redux"

const CheckoutForm = () => {
  const viewCart = useSelector(state => state.cart.products);
  const viewDiscount = useSelector(state => state.cart.discount);
  console.log(viewCart);
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({
        items: viewCart, // Remove the brackets around viewCart
        discount: viewDiscount
      }),
      headers: {
        "Content-Type": "application/json"
      } 
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
      })
      .then(({ url }) => {
        console.log(url);
        window.location = url;
      })
      .catch(e => {
        console.error(e);
        
      });
  }

  return (
    <div>
      <button onClick={handleSubmit} class="btn btn-primary btn-lg btn-block lg:w-full lg:h-full font-sans">Go to checkout</button>
    </div>
  )
}

export default CheckoutForm;