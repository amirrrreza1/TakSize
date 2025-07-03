export default function manifest() {
  return {
    name: "TakSize Clothing Store",
    short_name: "TakSize",
    description:
      "TakSize is a clothing store that offers a wide range of clothing items at affordable prices.",
    start_url: "/1",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ED2646",
    icons: [
      {
        src: "/taksize-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/taksize-384.png",
        sizes: "384*384",
        type: "image/png",
      },
      {
        src: "/taksize-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
