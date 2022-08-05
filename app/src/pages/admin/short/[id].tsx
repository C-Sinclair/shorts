import { AdminOnly } from "~/components/AdminOnly";
import { trpc } from "~/utils/trpc";
import { z } from "zod";
import toast from "solid-toast";
import { useNavigate, useParams } from "@solidjs/router";
import { createResource, Show } from "solid-js";
import { createZodForm } from "~/utils/form";
import { ShortWithViews } from "~/server/routers/short";

const edit = trpc.short.admin.edit.mutate;

export default function EditShort() {
  const params = useParams();
  const [short] = createResource(
    () => params.id,
    (id) => trpc.short.byId.query({ id }),
  );

  return (
    <AdminOnly>
      <Show when={short()}>
        <EditShortForm short={short()!} />
      </Show>
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

function EditShortForm(props: { short: ShortWithViews }) {
  const navigate = useNavigate();

  const { form, errors, isValid } = createZodForm(editShortSchema, {
    initialValues: props.short,
    async onSubmit(e) {
      e.preventDefault();
      await toast.promise(
        edit({
          id: props.short.id as string,
          data: e.data,
        }),
        {
          loading: "Updating...",
          success: `Updated short! ID: ${props.short.id}`,
          error: "Error updating short!",
        },
      );
      navigate("/admin");
    },
  });

  return (
    <div class="flex flex-col items-center w-full mt-10">
      <h1 class="text-white text-3xl">Edit short</h1>
      <form class="flex flex-col p-20 bg-black max-w-md" use:form={form}>
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
        <div class="mb-4 w-full">
          <label for="thumbnailTime" class="text-white">
            Thumbnail Time (s)
          </label>
          <input
            name="thumbnailTime"
            id="thumbnailTime"
            class="w-full"
            type="number"
            aria-invalid={Boolean(errors.thumbnailTime())}
          />
          <p class="text-red-50">{errors.thumbnailTime()?.message}</p>
        </div>
        <div class="mb-4 w-full">
          <label for="previewGifStartTime" class="text-white">
            Preview Gif Start Time (s)
          </label>
          <input
            name="previewGifStartTime"
            id="previewGifStartTime"
            class="w-full"
            type="number"
            aria-invalid={Boolean(errors.previewGifStartTime())}
          />
          <p class="text-red-50">{errors.previewGifStartTime()?.message}</p>
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
