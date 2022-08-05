import toast from "solid-toast";
import { z } from "zod";
import { AdminOnly } from "~/components/AdminOnly";
import { createZodForm } from "~/utils/form";
import { trpc } from "~/utils/trpc";

export default function Upload() {
  return (
    <AdminOnly>
      <UploadForm />
    </AdminOnly>
  );
}

const add = trpc.short.admin.add.mutate;

export const uploadSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1).max(32),
  description: z.string().min(1).max(256),
  path: z.string().min(3),
  playbackId: z.string(),
});

function UploadForm() {
  const { form, errors, isValid } = createZodForm(uploadSchema, {
    async onSubmit(e) {
      e.preventDefault();
      await toast.promise(add(e.data), {
        loading: "Uploading...",
        success: (data) => `Uploaded new short! ID: ${data.id}`,
        error: "Error uploading short!",
      });
    },
  });
  return (
    <div class="mt-10 flex flex-col items-center w-full">
      <h1 class="text-3xl font-bold text-left text-white">Upload a short</h1>
      <form class="flex flex-col p-20 bg-black h-fit" use:form={form}>
        <div class="mb-4 w-full">
          <label for="title" class="text-white">
            Title
          </label>
          <input
            name="title"
            id="title"
            class="w-full"
            aria-invalid={Boolean(errors.title())}
          />
        </div>
        <div class="mb-4 w-full">
          <label for="description" class="text-white">
            Description
          </label>
          <textarea
            name="description"
            id="description"
            class="w-full"
            aria-invalid={Boolean(errors.description())}
          />
        </div>
        <div class="mb-4 w-full">
          <label for="path" class="text-white">
            Path
          </label>
          <input
            name="path"
            id="path"
            class="w-full"
            aria-invalid={Boolean(errors.path())}
          />
        </div>
        <div class="mb-4 w-full">
          <label for="playbackId" class="text-white">
            Playback ID
          </label>
          <input
            name="playbackId"
            id="playbackId"
            class="w-full"
            aria-invalid={Boolean(errors.playbackId())}
          />
        </div>
        <button
          type="submit"
          class="self-end mt-4 text-white"
          disabled={!isValid}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
