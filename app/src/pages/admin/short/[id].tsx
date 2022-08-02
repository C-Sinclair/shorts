import { useRouter } from "next/router";
import { useZorm } from "react-zorm";
import { AdminOnly } from "~/components/AdminOnly";
import { trpc } from "~/utils/trpc";
import { z } from "zod";
import { useQueryClient } from "react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";

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
  thumbnailTime: z.string().optional(),
  previewGifStartTime: z.string().optional(),
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
      await toast.promise(
        m.mutateAsync({
          id,
          data: e.data,
        }),
        {
          loading: "Updating...",
          success: (data) => `Updated short! ID: ${data.id}`,
          error: "Error updating short!",
        },
      );
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
    <div className="flex flex-col items-center w-full mt-10">
      <h1 className="text-white text-3xl">Edit short</h1>
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
        <div className="mb-4 w-full">
          <label htmlFor="thumbnailTime" className="text-white">
            Thumbnail Time (s)
          </label>
          <input
            name={zo.fields.thumbnailTime()}
            id="thumbnailTime"
            className="w-full"
            type="number"
            aria-invalid={Boolean(zo.errors.thumbnailTime())}
          />
          <p className="text-red-50">{zo.errors.thumbnailTime()?.message}</p>
        </div>
        <div className="mb-4 w-full">
          <label htmlFor="previewGifStartTime" className="text-white">
            Preview Gif Start Time (s)
          </label>
          <input
            name={zo.fields.previewGifStartTime()}
            id="previewGifStartTime"
            className="w-full"
            type="number"
            aria-invalid={Boolean(zo.errors.previewGifStartTime())}
          />
          <p className="text-red-50">
            {zo.errors.previewGifStartTime()?.message}
          </p>
        </div>
        <button
          type="submit"
          className="self-end mt-4 text-white"
          disabled={t.isLoading || zo.validation?.success === true}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
