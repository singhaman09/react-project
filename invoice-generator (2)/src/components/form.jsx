import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setInvoiceData,
  addItem,
  removeItem,
  updateItem,
  setLogo,
  setSignature,
} from '../redux/slices/invoice';

import SignaturePad from 'react-signature-canvas';
import { useRef } from 'react'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const InvoiceForm = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoice);
  const [showPreview, setShowPreview] = useState(false);
  const [errors, setErrors] = useState({});
  const previewRef = useRef();

  const handleInputChange = (section, field, value) => {
    dispatch(setInvoiceData({ [section]: { ...invoice[section], [field]: value } }));
  };

  const handleExportPDF = () => {
    const input = document.getElementById('invoice-preview'); 
    if (!input) {
      alert('Invoice preview not found!');
      return;
    }

    html2canvas(input)
      .then((canvas) => {
        console.log("No....")
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4',
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('invoice.pdf');
      })
      .catch((err) => {
        console.error('Error generating PDF', err);
        alert('Failed to export PDF. Please try again.');
      });
  };

  const handleTopLevelChange = (field, value) => {
    dispatch(setInvoiceData({ [field]: value }));
  };

  const handleItemChange = (index, field, value) => {
    dispatch(updateItem({ index, field, value }));
  };

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'logo') dispatch(setLogo(reader.result));
      else if (type === 'signature') dispatch(setSignature(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!invoice.invoiceNo || !/^\d{3,10}$/.test(invoice.invoiceNo)) newErrors.invoiceNo = 'Invoice number is required';
    if (!invoice.invoiceDate) newErrors.invoiceDate = 'Invoice date is required';
    if (!invoice.dueDate) newErrors.dueDate = 'Due date is required';

    Object.entries(invoice.billedBy).forEach(([key, value]) => {
      if (!value) newErrors[`billedBy_${key}`] = `${key} is required`;
    });
    Object.entries(invoice.billedTo).forEach(([key, value]) => {
      if (!value) newErrors[`billedTo_${key}`] = `${key} is required`;
    });
    invoice.items.forEach((item, index) => {
      if (!item.name) newErrors[`item_${index}_name`] = 'Name required';
      if (isNaN(item.qty) || item.qty === '') newErrors[`item_${index}_qty`] = 'Invalid quantity';
      if (isNaN(item.rate) || item.rate === '') newErrors[`item_${index}_rate`] = 'Invalid rate';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const sigPadRef = useRef();

  const clearSignature = () => {
    sigPadRef.current.clear();
    dispatch(setSignature(null));
  };

  const saveSignature = () => {
    if (!sigPadRef.current.isEmpty()) {
      const dataURL = sigPadRef.current.getCanvas().toDataURL('image/png');
      console.log("sign...")
      dispatch(setSignature(dataURL));
    }
  };


  const totalAmount = invoice.items.reduce((sum, item) => {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    const gst = parseFloat(item.gst) || 0;
    return sum + qty * rate + (gst / 100);
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Invoice Form</h2>

      {/* Invoice Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block font-medium">Invoice No</label>
          <input
            className="w-full border rounded px-2 py-1"
            value={invoice.invoiceNo}
            onChange={(e) => handleTopLevelChange('invoiceNo', e.target.value)}
          />
          {errors.invoiceNo && <p className="text-red-500 text-sm">{errors.invoiceNo}</p>}
        </div>
        <div>
          <label className="block font-medium">Invoice Date</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={invoice.invoiceDate}
            onChange={(e) => handleTopLevelChange('invoiceDate', e.target.value)}
          />
          {errors.invoiceDate && <p className="text-red-500 text-sm">{errors.invoiceDate}</p>}
        </div>
        <div>
          <label className="block font-medium">Due Date</label>
          <input
            type="date"
            className="w-full border rounded px-2 py-1"
            value={invoice.dueDate}
            onChange={(e) => handleTopLevelChange('dueDate', e.target.value)}
          />
          {errors.dueDate && <p className="text-red-500 text-sm">{errors.dueDate}</p>}
        </div>
      </div>

      {/* Billed By */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Billed By</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(invoice.billedBy).map(([key, value]) => (
          <div key={key}>
            <label className="block font-medium capitalize">{key}</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={value}
              onChange={(e) => handleInputChange('billedBy', key, e.target.value)}
            />
            {errors[`billedBy_${key}`] && (
              <p className="text-red-500 text-sm">{errors[`billedBy_${key}`]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Billed To */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Billed To</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(invoice.billedTo).map(([key, value]) => (
          <div key={key}>
            <label className="block font-medium capitalize">{key}</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={value}
              onChange={(e) => handleInputChange('billedTo', key, e.target.value)}
            />
            {errors[`billedTo_${key}`] && (
              <p className="text-red-500 text-sm">{errors[`billedTo_${key}`]}</p>
            )}
          </div>
        ))}
      </div>

      {/* Items */}
      <h3 className="text-lg font-semibold mt-6 mb-2">Items</h3>
      {invoice.items.map((item, index) => (
        <div key={index} className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-3 items-center">
          <input
            className="border rounded px-2 py-1"
            placeholder="Name"
            value={item.name}
            onChange={(e) => handleItemChange(index, 'name', e.target.value)}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="GST"
            value={item.gst}
            onChange={(e) => handleItemChange(index, 'gst', e.target.value)}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Qty"
            value={item.qty}
            onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Rate"
            value={item.rate}
            onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
          />
          <button
            className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
            onClick={() => dispatch(removeItem(index))}
          >
            Remove
          </button>
          <div className="col-span-full text-sm text-red-500">
            {errors[`item_${index}_name`] || errors[`item_${index}_qty`] || errors[`item_${index}_rate`]}
          </div>
        </div>
      ))}
      <button
        className="mt-2 mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => dispatch(addItem({ name: '', gst: '', qty: '', rate: '' }))}
      >
        Add Item
      </button>

      {/* File Uploads */}
      <div className="mt-4">
        <label className="block font-medium">Upload Logo:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleFileUpload(e, 'logo')}
          className="mb-2"
        />
        {invoice.logo && <img src={invoice.logo} alt="Logo" className="h-12 mb-2" />}
      </div>


      {/* Signature Pad */}
      <div className="mt-4">
        <label className="block font-medium mb-1">Draw Signature:</label>
        <SignaturePad
          ref={sigPadRef}
          canvasProps={{ width: 400, height: 150, className: "border border-gray-300 rounded" }}
        />
        <div className="mt-2 flex gap-2">
          <button
            onClick={clearSignature}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Clear
          </button>
          <button
            onClick={saveSignature}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
        {invoice.signature && (
          <div className="mt-2">
            <p className="font-medium">Saved Signature Preview:</p>
            <img src={invoice.signature} alt="Signature" className="h-12 border rounded mt-1" />
          </div>
        )}
      </div>


      {/* Summary */}
      <h3 className="text-xl font-semibold mt-6">Total Amount: ₹{totalAmount.toFixed(2)}</h3>

      {/* Preview */}
      <button
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        onClick={() => {
          if (validateForm()) setShowPreview(true);
        }}
      >
        Preview Invoice
      </button>
      <button
        className="mt-2 ml-2 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
        onClick={handleExportPDF}
      >
        Export as PDF
      </button>

      {showPreview && (
        <div
          id="invoice-preview"
          ref={previewRef}
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.25rem',
            backgroundColor: '#f9fafb',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', textAlign: 'center' }}>
            Invoice Preview
          </h2>

          {invoice.logo && (
            <img src={invoice.logo} alt="Logo" style={{ height: '5rem', width: '8rem', marginTop: '0.5rem' }} />
          )}

          <p><strong>Invoice No:</strong> {invoice.invoiceNo}</p>
          <p><strong>Invoice Date:</strong> {invoice.invoiceDate}</p>
          <p><strong>Due Date:</strong> {invoice.dueDate}</p>

          <h4 style={{ fontWeight: '600', marginTop: '0.5rem' }}>Billed By</h4>
          <pre>{JSON.stringify(invoice.billedBy, null, 2)}</pre>

          <h4 style={{ fontWeight: '600' }}>Billed To</h4>
          <pre>{JSON.stringify(invoice.billedTo, null, 2)}</pre>

          <h4 style={{ fontWeight: '600', marginTop: '1rem', marginBottom: '0.5rem' }}>Items</h4>

          <table style={{ width: '100%', fontSize: '0.875rem', border: '1px solid #d1d5db', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f3f4f6' }}>
              <tr>
                <th style={{ border: '1px solid #d1d5db', padding: '0.25rem 0.5rem' }}>Name</th>
                <th style={{ border: '1px solid #d1d5db', padding: '0.25rem 0.5rem' }}>GST (%)</th>
                <th style={{ border: '1px solid #d1d5db', padding: '0.25rem 0.5rem' }}>Quantity</th>
                <th style={{ border: '1px solid #d1d5db', padding: '0.25rem 0.5rem' }}>Rate</th>
                <th style={{ border: '1px solid #d1d5db', padding: '0.25rem 0.5rem' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => {
                const qty = parseFloat(item.qty) || 0;
                const rate = parseFloat(item.rate) || 0;
                const gst = parseFloat(item.gst) || 0;
                const total = qty * rate + (gst / 100);
                return (
                  <tr key={index} style={{ textAlign: 'center' }}>
                    <td style={{ border: '1px solid #d1d5db', padding: '0.25rem 0.5rem' }}>{item.name}</td>
                    <td style={{ border: '1px solid #d1d5db', padding: '0.25rem 0.5rem' }}>{item.gst}%</td>
                    <td style={{ border: '1px solid #d1d5db', padding: '0.25rem 0.5rem' }}>{qty}</td>
                    <td style={{ border: '1px solid #d1d5db', padding: '0.25rem 0.5rem' }}>₹{rate.toFixed(2)}</td>
                    <td style={{ border: '1px solid #d1d5db', padding: '0.25rem 0.5rem' }}>₹{total.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <p><strong>Total:</strong> ₹{totalAmount.toFixed(2)}</p>

          {invoice.signature && (
            <div>
              <p >Authorized Signature:</p>
              <img
                src={invoice.signature}
                alt="Signature"
              />
            </div>
          )}
        </div>

      )}
    </div>
  );
};

export default InvoiceForm;
