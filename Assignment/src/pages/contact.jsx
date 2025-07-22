import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../redux/slices/contact";
import { toast } from "react-toastify";


export default function ContactUs() {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact);
  const [form, setForm] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    if (form.username && form.email && form.message) {
      if (!form.email.includes("@")) {
        toast.error("Enter a valid email!",{
          toastId: 'success1',
        });
        return;
      }
      else{
        dispatch(addContact(form));
      toast.success("Message sent successfully!",{
        toastId: 'success1',
      });
      setForm({ username: "", email: "", message: "" });}
    } else {
      toast.error("Please fill in all fields.",{
        toastId: 'success1',
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-300 py-10">
      {/* Contact Form */}
      <div className="flex flex-col border-2 p-10 space-y-4 w-full max-w-md shadow-md rounded-lg ">
        <h1 className="text-center text-2xl font-bold mb-4">Contact Us</h1>
        <input
          className="border border-purple-900 p-3 rounded focus:outline-none"
          type="text"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="border border-purple-900 p-3 rounded focus:outline-none"
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="border border-purple-900 p-3 rounded focus:outline-none"
          type="text"
          placeholder="Message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <button
          className="bg-purple-700 text-white p-3 rounded hover:bg-purple-800 cursor-pointer"
          onClick={handleSubmit}
        >
          Send
        </button>
      </div>

      {/* Display Table */}
      {contacts.length > 0 && (
        <div className="mt-10 w-full max-w-4xl p-6 rounded-lg shadow border">
          <h2 className="text-xl font-bold mb-4">Submitted Contacts</h2>
          <table className="w-full border border-black rounded-lg shadow">
            <thead className="bg-purple-700 text-black border">
              <tr>
                <th className="py-2 px-4 border">Username</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border">{contact.username}</td>
                  <td className="py-2 px-4 border">{contact.email}</td>
                  <td className="py-2 px-4 border">{contact.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
