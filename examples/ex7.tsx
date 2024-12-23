import { createElement } from "@reface/jsx";
import { styled } from "@reface/styled";
import { island } from "@reface/partials";
import { clean, Reface } from "@reface/core";

const Container = styled.div`
  padding: 1rem;
`;

// Обычный компонент с пропсами
function Greeting({ x }: { x: number }) {
  return <Container>Hello, {x} World!</Container>;
}

// Простой компонент без пропсов
function SimpleGreeting() {
  return <Container>Hello, World!</Container>;
}

// Island с REST
const JokeIsland = island(
  async () => {
    const text = await (await fetch(
      "https://icanhazdadjoke.com/",
      { headers: { "Accept": "text/plain" } },
    )).text();

    return <Container>{text}</Container>;
  },
  "joke-island",
);

// Главная страница
function Home() {
  return (
    <div>
      <Greeting x={10} />
      <SimpleGreeting />
      <JokeIsland />
    </div>
  );
}
