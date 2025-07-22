"use client";
import { useState, useEffect } from "react";
import { getPosts, getUser, mockCarSpecs } from "@/lib/api";
import { Post, User } from "@/types";
import Image from "next/image";
import button from '../assest/Group 8.png';
import r1 from '../assest/c1.png';
import r2 from '../assest/c2.png';
import r3 from '../assest/c3.png';
import r4 from '../assest/c4.png';
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
const newTechImages = [r1, r2, r3, r4];

export default function AllPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
const availableModels = ['SUV', 'Sedan', 'Hatchback'];

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsData, usersData] = await Promise.all([
          getPosts(),
          Promise.all(Array.from({ length: 10 }, (_, i) => getUser(i + 1))),
        ]);

        setPosts(postsData.slice(0, 20));
        setUsers(usersData);
      } catch {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    if (selectedCategory === "All") return matchesSearch;

    const specs = mockCarSpecs(post.id);
    return matchesSearch && specs.category === selectedCategory;
  });

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500 mx-auto mb-4"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
     <section
  className="bg-[#31323C] text-white py-20 relative"
>
   <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
    
      <div className="w-full md:w-1/2 text-center md:text-left">
      <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
        Your Journey<br />
        Your Car<br />
        <span className="text-[#FF5959]">Your Way</span>
      </h1>
      <p className="text-xl mb-8 max-w-lg">
        Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Image src={button} alt="Subscribe" className="inline-block mr-2" />
    </div>
   <div className="w-full md:w-1/2 relative h-[480px] flex justify-center md:justify-end pr-0 md:pr-10">
  <div className="relative w-[600px] h-full">
    <div className="absolute left-0 top-16 z-30">
      <Image
        src={r1}
        alt="Car 1"
        width={220}
        height={360}
        className=" shadow-xl object-cover"
      />
    </div>
    <div className="absolute left-[11rem] top-0 z-20">
      <Image
        src={r2}
        alt="Car 2"
        width={220}
        height={200}
        className="shadow-xl object-cover"
      />
    </div>
    <div className="absolute left-[19.5rem]  top-30 z-10">
      <Image
        src={r3}
        alt="Car 3"
        width={220}
        height={360}
        className="shadow-xl object-cover"
      />
    </div>
    <div className="absolute left-[30rem] top-20 z-40">
  <Image
    src={r4}
    alt="Car 4"
    className="shadow-2xl object-cover h-[320px] w-[320px]"
  />
</div>

  </div>
</div>


  </div>
</section>
      {/* Posts Section */}
   <div className="container mx-auto px-10 py-16 bg-gradient-to-b from-gray-100 to-gray-50 cursor-pointer">
    <SearchBar onSearch={setSearchQuery} />
    {filteredPosts.length > 0 && (
  <CategoryFilter
    categories={availableModels}
    selectedCategory={selectedCategory}
    onCategoryChange={setSelectedCategory}
  />
)}

  <h2 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
    All Posts
  </h2>

  <div className="space-y-10">
    {filteredPosts.map((post, index) => {
      const author = users.find((u) => u.id === post.userId);
      if (!author) return null;

      const imageIndex = index % newTechImages.length;
      const imageSrc = newTechImages[imageIndex];

      return (
        <div
          key={post.id}
          className="flex bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
        >
        
          <Image
            src={imageSrc}
            alt={post.title}
            width={320}
            height={240}
            className="object-cover w-[320px] h-[240px]"
          />
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h3>
              <div className="text-sm text-gray-500 mb-3">
                {author.name} &bull; {new Date().toLocaleDateString()} &bull; 3 min read
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
                {post.description || "Lorem ipsum dolor sit amet consectetur. Consectetur risus..."}
              </p>
            </div>

                 <Link href={`/posts/${post.id}`}>
                  <button className="text-sm font-semibold text-white bg-red-500 px-5 py-2 rounded-md hover:bg-red-600 transition-all duration-200">
                    Read full article...
                  </button>
                </Link>

          </div>
        </div>
      );
    })}
  </div>
</div>
  </div>
  );
}