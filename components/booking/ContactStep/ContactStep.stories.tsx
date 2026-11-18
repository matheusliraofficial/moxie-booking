import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ContactStep } from "./ContactStep";

const meta: Meta<typeof ContactStep> = {
  component: ContactStep,
  title: "Booking/ContactStep",
  parameters: { layout: "padded", backgrounds: { default: "card" } },
  args: {
    formId: "contact",
    defaultValues: {},
    onSubmit: (v) => console.log("submit", v),
  },
  decorators: [
    (Story) => (
      <div className="border-border bg-card w-[600px] rounded-[12px] border p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContactStep>;

export const Empty: Story = {};

export const Prefilled: Story = {
  args: {
    defaultValues: {
      fullName: "Jane Doe",
      email: "jane@example.com",
      phone: "(555) 123-4567",
      visitReason: "Botox consultation",
    },
  },
};
