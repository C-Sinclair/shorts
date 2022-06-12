import { useRouter } from "next/router";
import { useZorm } from "react-zorm";
import { AdminOnly } from "~/components/AdminOnly";
import { trpc } from "~/utils/trpc";
import { z } from "zod";
import { useQueryClient } from "react-query";
import { useEffect } from "react";

export default function EditShort() {
  return (
    <AdminOnly>
      <EditShortForm />
    </AdminOnly>
  );
}

export const editShortSchema = z.object({
  title: z.string().min(1).max(32).optional(),
  description: z.string().min(1).max(256).optional(),
  path: z.string().min(3),
  playbackId: z.string(),
});

function EditShortForm() {
  const router = useRouter();
  const id = router.query.id as string;

  const queryClient = useQueryClient();

  const t = trpc.useQuery(["short.byId", { id }]);
  const m = trpc.useMutation(["short.admin.edit"]);

  const zo = useZorm("edit", editShortSchema, {
    async onValidSubmit(e) {
      e.preventDefault();
      await m.mutateAsync({
        id,
        data: e.data,
      });
      await Promise.all([
        queryClient.invalidateQueries(["short.all"]),
        queryClient.invalidateQueries(["short.byId", { id }]),
      ]);
      router.push("/admin");
    },
  });

  useEffect(
    function updateFieldsOnDataChange() {
      if (t.data) {
        Object.keys(editShortSchema.shape).forEach((field) => {
          const elem = zo.ref.current?.elements.namedItem(
            field,
          ) as HTMLInputElement;
          if (elem) {
            elem.value = t.data[field];
          }
        });
      }
    },
    [t.data],
  );

  return (
    <>
      <h1>Edit short</h1>
      <form className="flex flex-col p-20 bg-black max-w-md" ref={zo.ref}>
        <div className="mb-4 w-full">
          <label htmlFor="title" className="text-white">
            Title
          </label>
          <input
            name={zo.fields.title()}
            id="title"
            className="w-full"
            aria-invalid={Boolean(zo.errors.title())}
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="description" className="text-white">
            Description
          </label>
          <textarea
            name={zo.fields.description()}
            id="description"
            className="w-full"
            aria-invalid={Boolean(zo.errors.description())}
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="path" className="text-white">
            Path
          </label>
          <input
            name={zo.fields.path()}
            id="path"
            className="w-full"
            aria-invalid={Boolean(zo.errors.path())}
          />
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="playbackId" className="text-white">
            Playback ID
          </label>
          <input
            name={zo.fields.playbackId()}
            id="playbackId"
            className="w-full"
            aria-invalid={Boolean(zo.errors.playbackId())}
          />
        </div>
        <button
          type="submit"
          className="self-end mt-4 text-white"
          disabled={t.isLoading || zo.validation?.success === true}
        >
          Submit
        </button>
      </form>
    </>
  );
}
