import Header from "../components/layout/header";
import Footer from "../components/layout/footer";
import img1 from '../assets/headphone.jpg';
import img2 from '../assets/watch.jpg';
import img3 from '../assets/speaker.jpg';
import img4 from '../assets/stand.jpg';
import img5 from '../assets/discount.jpg'
import img6 from '../assets/a.svg'
import img7 from '../assets/blinkit.webp'
import img8 from '../assets/zepto.webp'
import img9 from '../assets/flipkart.svg'
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$99.99",
    image: img1,
  },
  {
    id: 2,
    name: "Smartwatch",
    price: "$149.99",
    image: img2,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: "$79.99",
    image: img3,
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: "$29.99",
    image: img4,
  }


];
const delivery = [
  {
    id: 1,
    name: "Amazon",
    image: img6,
  },
  {
    id: 2,
    name: "Blinkit",
    image: img7,
  },
  {
    id: 3,
    name: "Zepto",
    image: img8,
  },
  {
    id: 4,
    name: "Flipkart",
    image: img9,
  }


];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-purple-400">
      <Header />
      <div className="flex flex-col md:flex-row justify-between items-stretch my-8 bg-purple-800 mx-4 rounded-2xl px-6 py-10 shadow-lg space-y-6 md:space-y-0 md:space-x-6">

        {/* Left Div */}
        <div className="w-full md:w-1/2 h-full bg-purple-700 p-6 rounded-xl border border-purple-600 shadow-md flex items-center justify-between">
          <img
            src={img5}
            alt="discount"
            className="rounded-xl w-90 h-50 object-cover shadow-sm"
          />
          <p className="text-3xl font-semibold text-zinc-200 text-center">
            UPTO <span className="text-yellow-300">66% OFF</span>
            <br />
            <span className="text-lg font-medium text-zinc-300">Shop Now!</span>
          </p>
        </div>

        {/* Right Div */}
        <div className="w-full md:w-1/2 bg-purple-700 p-6 rounded-xl border border-purple-600 shadow-md flex justify-center items-center">
          <div className="flex flex-col items-center text-center">
            <p className="text-3xl font-semibold text-zinc-200 leading-tight">
              NO FAKE, NO FRAUD, NO DOUBTS.
              <br />
              <span className="text-lg font-bold text-zinc-300">Grab it!</span>
            </p>
            <button className=" mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-purple-900 rounded-lg cursor-pointer font-bold">
              Explore Deals
            </button>
          </div>
        </div>

      </div>
      <h1 className="text-3xl font-bold text-center mb-8">Products</h1>
      <main className="my-8 bg-purple-800 mx-4 rounded-2xl px-6 py-10 shadow-lg mt-3">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-44 object-cover mb-4 rounded-lg px-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rounded-3xl"
              />
              <h2 className="text-lg font-semibold mb-2 text-center">{product.name}</h2>
              <p className="font-bold text-center">{product.price}</p>
            </div>
          ))}
        </div>
      </main>
      <h1 className="text-3xl font-bold text-center mb-8">Our Delivery Partners</h1>
      <main className="my-8 bg-purple-800 mx-4 rounded-2xl px-6 py-10 shadow-lg mt-3">
      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {delivery.map((delivery) => (
            <div key={delivery.id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
              <img
                src={delivery.image}
                alt={delivery.name}
                className="w-full h-44 object-contain mb-4 rounded-lg px-5 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110 hover:rounded-3xl"
              />
              <h2 className="text-lg font-semibold mb-2 text-center">{delivery.name}</h2>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}