import type { Meta, StoryObj } from '@storybook/react';

import { Breadcrumbs } from '.';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: 'de',
    label: '',
  },
};
