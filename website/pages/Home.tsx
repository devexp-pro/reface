import { createElement, Fragment } from "@reface/jsx";
import type { Template } from "@reface/types";
import type { PageProps } from "@reface/types";
import { Hero } from "../components/Hero.tsx";

export function Home(props: PageProps): Template {
  return (
    <div class="container d-flex justify-content-center align-items-center">
      <Hero />
    </div>
  );
} 