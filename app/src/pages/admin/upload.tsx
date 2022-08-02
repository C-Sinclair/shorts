import { useZorm } from "react-zorm";
import { z } from "zod";
import { AdminOnly } from "~/components/AdminOnly";
import { trpc } from "~/utils/trpc";

export default function Upload() {
  return (
    <AdminOnly>
      <UploadForm />
    </AdminOnly>
  );
}

export const uploadSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(32),
  description: z.string().min(1).max(256),
  path: z.string().min(3),
  playbackId: z.string(),
});

function UploadForm() {
  const t = trpc.useMutation(["short.admin.add"]);
  const zo = useZorm("upload", uploadSchema, {
    async onValidSubmit(e) {
      e.preventDefault();
      await t.mutateAsync(e.data);
    },
  });
  return (
    <div className="mt-10 flex flex-col items-center w-full text-white">
      <h1 className="text-3xl font-bold text-left">Upload a short</h1>
      <form className="flex flex-col p-20 bg-black h-fit" ref={zo.ref}>
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
    </div>
  );
}
