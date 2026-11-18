import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "UI/Input",
  parameters: { layout: "padded" },
  args: { name: "field", placeholder: "Input text" },
  argTypes: {
    size: { control: "inline-radio", options: ["md", "sm"] },
  },
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const WithLabel: Story = {
  args: { label: "Full Name", name: "fullName" },
};

export const Email: Story = {
  args: { label: "Email", name: "email", type: "email", placeholder: "you@example.com" },
};

export const WithError: Story = {
  args: {
    label: "Email",
    name: "email",
    defaultValue: "not-an-email",
    error: "Enter a valid email address",
  },
};

export const Compact: Story = {
  args: { size: "sm", placeholder: "MM / YY" },
};

export const NoLabel: Story = {
  args: { "aria-label": "Zip", placeholder: "Billing zip code" },
};
