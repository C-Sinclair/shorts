import { createContextInner } from "../context";
import { appRouter } from "./_app";
import { inferMutationInput } from "~/utils/trpc";

test("add and get short", async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const input: inferMutationInput<"short.add"> = {
    title: "hello test",
    description: "hello test",
  };
  const short = await caller.mutation("short.add", input);
  const byId = await caller.query("short.byId", {
    id: short.id,
  });

  expect(byId).toMatchObject(input);

  const all = await caller.query("short.all");
  expect(all).toContain(input);
});
