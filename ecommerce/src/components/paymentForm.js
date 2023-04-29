import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";

const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        const result = await stripe.confirmPayment({
            elements, //`Elements` instance that was used to create the Payment Element
            confirmParams: {  //This is the part where we should direct the customer to when the payment is complete
                return_url: "https://example.com/order/123/complete",
            },
        })
        if (result.error) {
            console.log("There is an error with a payment");
        }
    }

    return (
        <div>
            <div class="col-lg-5">
                <div class="card bg-primary text-white rounded-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <h5 class="mb-0">Card details</h5>
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                class="img-fluid rounded-3" style={{ width: 45 }} alt="Avatar" />
                        </div>

                        <p class="small mb-2">Card type</p>
                        <a href="#!" type="submit" class="text-white"><i
                            class="fab fa-cc-mastercard fa-2x me-2"></i></a>
                        <a href="#!" type="submit" class="text-white"><i
                            class="fab fa-cc-visa fa-2x me-2"></i></a>
                        <a href="#!" type="submit" class="text-white"><i
                            class="fab fa-cc-amex fa-2x me-2"></i></a>
                        <a href="#!" type="submit" class="text-white"><i class="fab fa-cc-paypal fa-2x"></i></a>

                        <form class="mt-4">
                            <div class="form-outline form-white mb-4">
                                <input type="text" id="typeName" class="form-control form-control-lg text-base lg:text-lg" siez="17"
                                    placeholder="Cardholder's Name" />
                                <label class="form-label text-sm lg:text-lg" for="typeName">Cardholder's Name</label>
                            </div>

                            <div class="form-outline form-white mb-4">
                                <input type="text" id="typeText" class="form-control form-control-lg text-base lg:text-lg" siez="17"
                                    placeholder="1234 5678 9012 3457" minlength="19" maxlength="19" />
                                <label class="form-label text-sm lg:text-lg" for="typeText">Card Number</label>
                            </div>

                            <div class="row mb-4">
                                <div class="col-md-6">
                                    <div class="form-outline form-white">
                                        <input type="text" id="typeExp" class="form-control form-control-lg text-base lg:text-lg"
                                            placeholder="MM/YYYY" size="7" minlength="7" maxlength="7" />
                                        <label class="form-label text-sm lg:text-lg" for="typeExp">Expiration</label>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-outline form-white">
                                        <input type="password" id="typeText" class="form-control form-control-lg text-base lg:text-lg"
                                            placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3" />
                                        <label class="form-label text-sm lg:text-lg" for="typeText">Cvv</label>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <hr class="my-4" />
                        <div class="d-flex justify-content-between">
                            <p class="mb-2">Subtotal</p>
                            <p class="mb-2">$4798.00</p>
                        </div>

                        <div class="d-flex justify-content-between">
                            <p class="mb-2">Shipping</p>
                            <p class="mb-2">$20.00</p>
                        </div>

                        <div class="d-flex justify-content-between mb-4">
                            <p class="mb-2">Total(Incl. taxes)</p>
                            <p class="mb-2">$4818.00</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <PaymentElement />
                            <button disabled={!stripe} type="button" class="btn btn-info btn-block btn-lg">
                                <div class="d-flex justify-content-between">
                                    <span>$4818.00</span>
                                    <span>Checkout <i class="fas fa-long-arrow-alt-right ms-2"></i></span>
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default PaymentForm;