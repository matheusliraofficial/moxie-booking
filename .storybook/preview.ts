import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "page",
      values: [
        { name: "page", value: "#f4f4f6" },
        { name: "card", value: "#ffffff" },
      ],
    },
    controls: { expanded: true },
    layout: "centered",
  },
};

export default preview;
