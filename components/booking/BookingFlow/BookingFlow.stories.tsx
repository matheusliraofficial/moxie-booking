import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BookingFlow } from "./BookingFlow";

const meta: Meta<typeof BookingFlow> = {
  component: BookingFlow,
  title: "Booking/BookingFlow",
  parameters: { layout: "fullscreen", backgrounds: { default: "page" } },
};

export default meta;
type Story = StoryObj<typeof BookingFlow>;

export const Flow: Story = {};
