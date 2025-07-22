import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addMessage } from "../redux/contactSlice";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.contact);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addMessage(form));
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6">
      <h2 className="text-center font-bold text-xl mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
        <input className="w-full border p-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border p-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <textarea className="w-full border p-2" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <button className="bg-green-600 text-white py-2 px-4 rounded">Submit</button>
      </form>

      {messages.length > 0 && (
        <div className="mt-8 max-w-3xl mx-auto">
          <h3 className="font-bold text-lg mb-2">Submitted Messages</h3>
          <table className="w-full border">
            <thead><tr><th>Name</th><th>Email</th><th>Message</th></tr></thead>
            <tbody>
              {messages.map((m, i) => (
                <tr key={i}>
                  <td>{m.name}</td>
                  <td>{m.email}</td>
                  <td>{m.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
