import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-zod";
import { ZodSchema } from "zod";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      form: any;
    }
  }
}

type Opts = Parameters<typeof createForm>[0];

export const createZodForm = (schema: ZodSchema, opts: Opts) => {
  return createForm({
    extend: [validator({ schema })],
    ...opts,
  });
};
