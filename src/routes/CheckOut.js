import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { list, total } from "cart-localstorage";
import axios from "axios";

export default function CheckOut() {
  //   const [params, setParams] = useState(null);
  const Razorpay = useRazorpay();

  const verifyPayment = async (payment_id, payment_signature) => {
    const response = await axios.post(
      "http://localhost:5000/api/payment/verify",
      {
        payment_id: payment_id,
        payment_signature: payment_signature,
      }
    );
    return response.data;
  };

  const createOrder = async (orderData) => {
    const order_id = await axios
      .post("https://localmart-api.herokuapp.com/api/payment", orderData)
      .then((res) => {
        return res.data.id;
      });
    return order_id;
  };

  const handlePayment = async () => {
    const amount = total();
    const items = list().map((item, key) => {
      return item.id;
    });
    const storeID = localStorage.getItem("buyStoreID");

    const orderData = {
      amount: amount,
      items: items,
      store_id: storeID,
    };

    const order_id = await createOrder(orderData); //  Create order on your backend

    const options = {
      key: "rzp_test_exJ9gstv3NbI4x", // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Sayam's Company",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
        console.log(response);
      },
      prefill: {
        name: "Sayam Samal",
        email: "samal.sayam@gmail.com",
        contact: "7978455517",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  return (
    <div className="container">
      {list().map((product) => {
        return (
          <div key={product.id}>
            <div className="row mt-5">
              <div className="col-5">{product.name}</div>
              <div className="col-2">{product.quantity}</div>
              <div className="col-2">{product.price / 100}</div>
              <div className="col-3">
                {(product.price / 100) * product.quantity}
              </div>
            </div>
          </div>
        );
      })}
      <div className="row mt-5">
        <div className="col-5">Total</div>
        <div className="col-5">{total()}</div>
        <div className="col-2">
          <button className="btn btn-primary w-100" onClick={handlePayment}>
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}
