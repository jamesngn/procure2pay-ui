import { Avatar, Group, Text, UnstyledButton } from '@mantine/core'; // Adjust imports based on your UI library
import { IconChevronRight } from '@tabler/icons-react';
import React, { forwardRef } from 'react';

interface UserButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode; // Assuming `icon` can be any React node
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(function UserButton(
  { image, name, email, icon, ...others }: UserButtonProps,
  ref
) {
  return (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-xs)',
        color: 'var(--mantine-color-gray-1)',
        borderRadius: 'var(--mantine-radius-sm)'
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} alt={name} radius="xl" />
        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>
          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>
        {icon || <IconChevronRight size="1rem" />}
      </Group>
    </UnstyledButton>
  );
});

export default UserButton; // Make sure to export it if used in multiple places
