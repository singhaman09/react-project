import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const products = [
    { name: "Product 1", price: "$10", image: "https://via.placeholder.com/150" },
    { name: "Product 2", price: "$15", image: "https://via.placeholder.com/150" },
    { name: "Product 3", price: "$20", image: "https://via.placeholder.com/150" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <div key={i} className="border p-4 text-center">
              <img src={p.image} alt={p.name} className="mx-auto mb-2" />
              <h3>{p.name}</h3>
              <p>{p.price}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
