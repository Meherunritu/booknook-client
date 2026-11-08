// Uploads a cover image to imgbb and returns its public URL.
export async function uploadImage(file) {
  const key = process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!key) throw new Error("Image upload is not set up: add NEXT_PUBLIC_IMGBB_KEY.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Please choose an image smaller than 5 MB.");

  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${key}`, { method: "POST", body: form });
  const json = await res.json().catch(() => ({}));
  if (!json.success) throw new Error("The cover image could not be uploaded. Try another image.");
  return json.data.display_url;
}
