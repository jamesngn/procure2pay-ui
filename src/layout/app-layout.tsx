import {
  AppShell,
  Box,
  Group,
  Menu,
  Portal,
  rem,
  Stack,
  Text,
  Title,
  Tooltip,
  UnstyledButton
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconGauge,
  IconLogout,
  IconPackage,
  IconSettings2,
  IconShoppingCartDollar
} from '@tabler/icons-react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { QIcon } from '@/components/icon';
import UserButton from '@/components/user-button';
import { useAuthContext } from '@/contexts/AuthContext';

type SidebarLinkProps = {
  iconName: any;
  label: string;
  pathname?: string;
  defaultTabName?: string;
};

type HeaderTitleProps = {
  children: React.ReactNode;
};

type LayoutProps = {
  children: React.ReactNode;
};

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const HEADER_HEIGHT = 60;
const SIDEBAR_WIDTH = 60;
const FOOTER_HEIGHT = 50;

const HEADER_TITLE_ID = 'header-title';
const FOOTER_TITLE_ID = 'footer-title';

const sideBarLinkData: SidebarLinkProps[] = [
  {
    iconName: <IconGauge />,
    label: 'Dashboard',
    pathname: '/'
  },
  {
    iconName: <IconShoppingCartDollar />,
    label: 'Requisition',
    pathname: '/requisition'
  },
  {
    iconName: <IconPackage />,
    label: 'Supplier',
    pathname: '/supplier'
  }
];

const SidebarLink: React.FC<SidebarLinkProps> = props => {
  const location = useLocation();
  const basePathname = '/' + location.pathname.split('/')[1];
  const active = props.pathname === basePathname;

  const activeStyle = {
    background: 'var(--mantine-primary-color-7)'
  };

  const buttonStyle = active ? activeStyle : {};
  const iconFillColor = active ? 'white' : 'var(--mantine-primary-color-7)';

  const navLinkPathname =
    props.defaultTabName === undefined
      ? props.pathname
      : props.pathname + '/' + props.defaultTabName;

  const iconElement = React.isValidElement(props.iconName)
    ? React.cloneElement(props.iconName as React.ReactElement<any>, { color: iconFillColor })
    : props.iconName;

  return (
    <Tooltip label={props.label} position="right" transitionProps={{ duration: 0 }}>
      <NavLink to={navLinkPathname} className={({ isActive }) => (isActive ? 'active' : '')}>
        <UnstyledButton p={4} style={{ ...buttonStyle, height: 32, width: 32, borderRadius: 4 }}>
          {iconElement}
        </UnstyledButton>
      </NavLink>
    </Tooltip>
  );
};

const LayoutSidebar: React.FC = () => {
  return (
    <AppShell.Navbar px={12} py={24}>
      <Stack align="center" justify="center" gap={16}>
        {sideBarLinkData.map((link, index) => (
          <SidebarLink
            key={index}
            label={link.label}
            iconName={link.iconName}
            pathname={link.pathname}
            defaultTabName={link.defaultTabName}
          />
        ))}
      </Stack>
    </AppShell.Navbar>
  );
};

export const LayoutHeader: React.FC = () => {
  const { user, logout } = useAuthContext();

  return (
    <AppShell.Header h={HEADER_HEIGHT} withBorder={false}>
      <Group
        style={{ backgroundColor: 'var(--mantine-primary-color-9)' }}
        justify="space-between"
        align="center"
        h={'100%'}
        px={10}
      >
        <Title order={2}>
          <Box style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
            <QIcon name="icLogoPath" size={50} fill="white" />
            <Text
              size="2xl"
              ml={8}
              style={{ display: 'flex', alignItems: 'center', fontWeight: '500', color: 'white' }}
            >
              procure
              <span style={{ fontWeight: 700 }}>2</span>
              pay
            </Text>
          </Box>
        </Title>
        <Menu width={200} shadow="lg">
          <Menu.Target>
            <UserButton
              image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              name={user?.firstName + ' ' + user?.lastName}
              email={user?.email}
            />
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconSettings2 style={{ width: rem(14), height: rem(14) }} />}
              component="a"
              href="https://mantine.dev"
            >
              Settings
            </Menu.Item>
            <Menu.Item
              leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
              component="button"
              onClick={logout}
            >
              Sign Off
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </AppShell.Header>
  );
};

const LayoutFooter: React.FC = () => {
  return (
    <AppShell.Footer
      id={FOOTER_TITLE_ID}
      h={FOOTER_HEIGHT}
      bg={'var(--mantine-primary-color-9)'}
      withBorder={false}
      px={16}
      zIndex={1000}
    />
  );
};

export const HeaderTitle: React.FC<HeaderTitleProps> = props => {
  return <Portal target={`#${HEADER_TITLE_ID}`}>{props.children}</Portal>;
};

export const AppLayout: React.FC<LayoutProps> = props => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: HEADER_HEIGHT }}
      navbar={{ width: SIDEBAR_WIDTH, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <LayoutHeader />
      <LayoutSidebar />

      <AppShell.Main pt={HEADER_HEIGHT + 16} pb={FOOTER_HEIGHT + 16} h="100dvh">
        <Title id={HEADER_TITLE_ID} order={2} />
        {props.children}
      </AppShell.Main>

      <LayoutFooter />
    </AppShell>
  );
};
