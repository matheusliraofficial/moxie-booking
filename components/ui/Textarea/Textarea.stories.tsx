import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: "UI/Textarea",
  parameters: { layout: "padded" },
  args: { name: "visitReason", placeholder: "Input text", rows: 4 },
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { label: "Visit reason" },
};

export const WithError: Story = {
  args: {
    label: "Visit reason",
    defaultValue: "No",
    error: "Tell us a little about your visit",
  },
};
