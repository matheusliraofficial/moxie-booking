import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ConfirmationStep } from "./ConfirmationStep";
import { goldSpa } from "@/lib/mockBusiness";

const meta: Meta<typeof ConfirmationStep> = {
  component: ConfirmationStep,
  title: "Booking/ConfirmationStep",
  parameters: { layout: "padded", backgrounds: { default: "page" } },
};

export default meta;
type Story = StoryObj<typeof ConfirmationStep>;

export const Booked: Story = {
  args: { business: goldSpa },
};
