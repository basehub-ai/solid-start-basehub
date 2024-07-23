import { createEffect, createSignal, For } from "solid-js";
import { children } from "solid-js";

export default function PageTransitionHolder(props: { children: any }) {
  const resolvedChildren1 = children(() => props.children);
  const [previousChildren, setPreviousChildren] = createSignal(null);

  createEffect(() => {
    const current = props.children;
    setPreviousChildren(() => current);
  });

  return <>{props.children}</>;
}
