import { Flex, Input, ScrollArea, Stack, Title } from '@mantine/core';
import React from 'react';

type VcFormWrapperProps = {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const VcFormWrapper: React.FC<VcFormWrapperProps> = ({ children, onSubmit }) => {
  return (
    <form
      className="vc-form-wrapper"
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

interface VcTwoColumnFormWrapperProps {
  leftContent: React.ReactNode; // Content for the left column
  rightContent: React.ReactNode; // Content for the right column
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; // Form submission handler
  leftTitle?: string; // Optional title for the left column
  rightTitle?: string; // Optional title for the right column
}

// The component definition
export const VcTwoColumnFormWrapper: React.FC<VcTwoColumnFormWrapperProps> = ({
  leftContent,
  rightContent,
  onSubmit,
  leftTitle = 'Title 1', // Default title if not provided
  rightTitle = 'Title 2' // Default title if not provided
}) => {
  return (
    <form
      className="vc-form-wrapper"
      style={{
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: '20px'
      }}
      onSubmit={onSubmit}
    >
      <div style={{ position: 'relative' }}>
        <Title order={3} style={{ marginBottom: 16 }}>
          {leftTitle}
        </Title>
        {leftContent}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '1px', // Thin line
            backgroundColor: '#ccc' // Light grey line
          }}
        ></div>
      </div>

      <div>
        <Title order={3} style={{ marginBottom: 16 }}>
          {rightTitle}
        </Title>
        {rightContent}
      </div>
    </form>
  );
};

export const VcFormInputs: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ScrollArea
      className="vc-form-inputs"
      display="flex"
      mih={0}
      style={{
        flex: 1
      }}
    >
      <Stack gap={12} p={24}>
        {children}
      </Stack>
    </ScrollArea>
  );
};

export const VcFormAction: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Flex justify="flex-end" className="vc-form-action" p={20} gap={16}>
      {children}
    </Flex>
  );
};

type TInputWrapper = {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
};

const VcInputWrapper: React.FC<TInputWrapper> = props => {
  const { label, required, error, children } = props;

  return (
    <Input.Wrapper display="flex">
      <Flex display="flex" align="center" w={210} h={36} pr={8}>
        <Input.Label required={required}>{label}</Input.Label>
      </Flex>
      <Stack gap={4} miw={0} style={{ flex: 1 }}>
        {children}

        <Input.Error>{error}</Input.Error>
      </Stack>
    </Input.Wrapper>
  );
};

export default VcInputWrapper;
