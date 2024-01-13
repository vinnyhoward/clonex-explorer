export const fetchBase64ForToken = async (tokenId: string) => {
  try {
    const response = await fetch(
      `https://storage.googleapis.com/clone_blur_image/${tokenId}.txt`
    );
    if (!response.ok) throw new Error("Failed to fetch base64 image");
    const text = await response.text();
    const base64Text = `data:image/png;base64,${text}`;
    return base64Text;
  } catch (error) {
    console.error("Error fetching base64 image:", error);
    return "";
  }
};
