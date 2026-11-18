import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Checkbox } from "./Checkbox";
import type { CheckboxProps } from "./Checkbox.types";

const InteractiveCheckbox = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      {...args}
      id="interactive"
      name="interactive"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    >
      We ask that you please reschedule or cancel at least 24 hours before the beginning of your
      appointment or you may be charged a cancellation fee of $50.
    </Checkbox>
  );
};

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: "UI/Checkbox",
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="max-w-[480px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Unchecked: Story = {
  args: { id: "a", name: "a", children: "I agree to the cancellation policy", onChange: () => {} },
};

export const Checked: Story = {
  args: {
    id: "b",
    name: "b",
    checked: true,
    children: "I agree to the cancellation policy",
    onChange: () => {},
  },
};

export const Interactive: Story = {
  render: (args) => <InteractiveCheckbox {...args} />,
};
