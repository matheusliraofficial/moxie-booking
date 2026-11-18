import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "UI/Button",
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "ghost"] },
    size: { control: "inline-radio", options: ["md", "lg"] },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Continue", variant: "primary", size: "lg" },
};

export const Ghost: Story = {
  args: { children: "Back", variant: "ghost" },
};

export const FullWidth: Story = {
  args: { children: "Book appointment", fullWidth: true, size: "lg" },
  parameters: { layout: "padded" },
};

export const Disabled: Story = {
  args: { children: "Continue", disabled: true },
};
