import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ErrorSummary } from "./ErrorSummary";

const meta: Meta<typeof ErrorSummary> = {
  component: ErrorSummary,
  title: "UI/ErrorSummary",
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="w-[480px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ErrorSummary>;

export const Multiple: Story = {
  args: {
    errors: [
      { fieldId: "fullName", message: "Please enter your full name" },
      { fieldId: "email", message: "Enter a valid email address" },
      { fieldId: "phone", message: "Enter a valid phone number" },
    ],
  },
};

export const Single: Story = {
  args: {
    errors: [{ fieldId: "cardNumber", message: "Card number is invalid" }],
  },
};

export const Empty: Story = {
  args: { errors: [] },
};
