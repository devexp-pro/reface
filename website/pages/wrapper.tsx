import { createElement, Fragment } from "@reface/jsx";
import type { Template } from "@reface/types";
import type { PageProps } from "@reface/types";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";

export function wrapper(Page: (props: PageProps) => Template) {
  return function Wrapped(props: PageProps): Template {
    return (
      <div class="container" style="max-width: 40rem;">
        <Header />
        <Page {...props} />
        <Footer />
      </div>
    );
  };
} 