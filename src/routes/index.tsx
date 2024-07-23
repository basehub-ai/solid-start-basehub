import { A, cache, createAsync } from "@solidjs/router";
import { basehub } from "basehub";
import { For } from "solid-js";
import Counter from "~/components/Counter";

const getBlogPosts = cache(async () => {
  "use server";
  const data = await basehub().query({
    blog: {
      posts: {
        items: {
          _id: true,
          _title: true,
        },
      },
    },
  });

  return data.blog;
}, "blog-posts");

export const route = {
  load: () => getBlogPosts(),
};

export default function Home() {
  const blogPosts = createAsync(() => getBlogPosts());

  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">
        Hello world!
      </h1>
      <Counter />
      <p class="mt-8">
        Visit{" "}
        <a
          href="https://solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{" "}
      </p>

      <For each={blogPosts()?.posts.items}>{(item) => <p>{item._id}</p>}</For>
    </main>
  );
}
