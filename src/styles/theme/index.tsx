import { createTheme, Drawer, NumberInput, rem, Select } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import React from 'react';

import { colors } from './color';

export const theme = createTheme({
  fontFamily: 'Manrope, sans-serif',
  colors,
  primaryShade: 5,
  primaryColor: 'darkBlue',
  white: 'var(--color-white)',
  cursorType: 'pointer',
  black: '#1e1e1e',
  fontSmoothing: true,
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
    '2xl': rem(24),
    '3xl': rem(30),
    '4xl': rem(36)
  },
  components: {
    Drawer: Drawer.extend({
      defaultProps: {
        position: 'right',
        padding: 0,
        overlayProps: { backgroundOpacity: 0.5, blur: 4 }
      }
    }),
    DatePickerInput: DatePickerInput.extend({
      defaultProps: {
        locale: 'vi',
        clearable: true,
        valueFormat: 'DD/MM/YYYY',
        leftSectionPointerEvents: 'none',
        leftSection: <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
      }
    }),
    Select: Select.extend({
      defaultProps: {
        clearable: true,
        searchable: true
      }
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        thousandSeparator: true,
        min: 0
      }
    })
  },
  variantColorResolver: input => {
    if (input.variant === 'danger') {
      return {
        background: 'var(--mantine-color-red-9)',
        hover: 'var(--mantine-color-red-8)',
        color: 'var(--mantine-color-white)',
        border: 'none'
      };
    }
  }
});
