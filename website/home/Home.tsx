import { Header } from "./Header.tsx";
import { Hero } from "./sections/Hero.tsx";
import { Problems } from "./sections/Problems.tsx";
import { Solution } from "./sections/Solution.tsx";
import { Ecosystem } from "./sections/Ecosystem.tsx";
import { GetStarted } from "./sections/GetStarted.tsx";
// import "./sections.css" with { type: "module" };

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Problems />
      <Solution />
      <Ecosystem />
      <GetStarted />
    </>
  );
}

export default Home;
