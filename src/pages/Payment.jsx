function Payment() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Payment Page</h2>

      <div style={{ marginTop: "25px", width: "320px" }}>
        <label>Enter Amount:</label>
        <input type="number" placeholder="₹ Amount" />

        <label style={{ marginTop: "20px", display: "block" }}>Payment Method:</label>
        <select>
          <option>UPI</option>
          <option>PhonePe</option>
          <option>Google Pay</option>
          <option>Paytm</option>
        </select>

        <button style={{ marginTop: "25px" }}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;
