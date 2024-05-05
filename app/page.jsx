'use client'
import Header from "./components/Header";
import Content from "./components/Content";

export default function Home() {
  return (
    <div className="w-full mx-auto h-full grid grid-rows-[30%_75%] ">
      {/* herder */}
      <Header />
      {/* content */}
      <Content />
    </div>
  );
}
