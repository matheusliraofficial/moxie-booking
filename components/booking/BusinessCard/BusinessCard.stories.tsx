import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BusinessCard } from "./BusinessCard";
import { goldSpa } from "@/lib/mockBusiness";

const meta: Meta<typeof BusinessCard> = {
  component: BusinessCard,
  title: "Booking/BusinessCard",
  parameters: { layout: "padded", backgrounds: { default: "page" } },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BusinessCard>;

export const GoldSpa: Story = {
  args: { business: goldSpa },
};

export const WithoutAddressLine2: Story = {
  args: {
    business: {
      ...goldSpa,
      address: { ...goldSpa.address, line2: undefined },
    },
  },
};
