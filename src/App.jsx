import React, { useState } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    customerName: 'Guest Customer',
    productName: 'Service Package',
    totalAmount: '0.00',
    imageLink: 'https://cdn-icons-png.flaticon.com/512/6073/6073874.png'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amount = formData.get('totalAmount');

    // Validation for numeric amount
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid numeric amount.");
      return;
    }

    setInvoiceData({
      customerName: formData.get('customerName'),
      productName: formData.get('productName'),
      totalAmount: parseFloat(amount).toFixed(2),
      imageLink: formData.get('imageLink') || invoiceData.imageLink
    });

    e.target.reset(); // Clear inputs after update
    setShowForm(false);
  };

  return (
    <div className='fullpart'>
      <div className="backgroundpart">
        <div className="contentcard">
          <h2 className="congratshead">Invoice Card</h2>
          <div className="profile">
            <img src={invoiceData.imageLink} alt="Icon" className="profile-pic" />
            <h4 className="name">{invoiceData.customerName}</h4>
            <p className="item-text">Product: <span>{invoiceData.productName}</span></p>
            <p className="amount-text">Total Amount: <span>₹{invoiceData.totalAmount}</span></p>
          </div>
        </div>

        <div className="buttonpart">
          <button onClick={() => setShowForm(true)} className='profilebutton'>
            Add Invoice Info
          </button>
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className='cancelbuttonarea'>
              <button type="button" className='close-x' onClick={() => setShowForm(false)}>×</button>
            </div>
            <h3 className='textclr'>Billing Details</h3>
            <form onSubmit={handleSubmit}>
              <label>Customer Name</label>
              <input type="text" name="customerName" placeholder="Name" required />
              
              <label>Product Name</label>
              <input type="text" name="productName" placeholder="Product" required />
              
              <label>Total Amount</label>
              <input type="number" step="0.01" name="totalAmount" placeholder="0.00" required />
              
              <label>Image Link (URL)</label>
              <input type="url" name="imageLink" placeholder="https://..." />
              
              <button type="submit" className='submitbtn'>Update Invoice</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;