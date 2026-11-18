import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PaymentStep } from "./PaymentStep";

const meta: Meta<typeof PaymentStep> = {
  component: PaymentStep,
  title: "Booking/PaymentStep",
  parameters: { layout: "padded", backgrounds: { default: "card" } },
  args: {
    formId: "payment",
    defaultValues: {},
    onSubmit: (v) => console.log("submit", v),
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] rounded-[12px] border border-border bg-card p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PaymentStep>;

export const Empty: Story = {};
