import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Image,
  List,
  ListItem,
  rem,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCheck, IconHourglass } from "@tabler/icons-react";
import Link from "next/link";

import ColorSchemeToggle from "~/app/_components/colorSchemeToggle";
import classes from "~/app/page.module.css";

const iconProps = {
  style: { width: rem(15), height: rem(15) },
  stroke: 2,
};

function CheckIcon() {
  return (
    <ThemeIcon size="sm" radius="xl" color="green">
      <IconHourglass {...iconProps} />
    </ThemeIcon>
  );
}

function OngoingIcon() {
  return (
    <ThemeIcon size="sm" radius="xl" color="yellow">
      <IconCheck {...iconProps} />
    </ThemeIcon>
  );
}

export default function Page() {
  return (
    <Center h="100%">
      <Container size="md">
        <Group>
          <Box maw={rem(480)}>
            <Title className={classes.title} fw={900} lh={1.2}>
              A <span className={classes.highlight}>modern</span> finance
              tracker
            </Title>

            <Text c="dimmed" mt="md">
              Tracks debtors. Built with Next.js and Mantine.
            </Text>

            <List mt={30} spacing="sm" size="sm" icon={<CheckIcon />}>
              <ListItem>
                <b>Debt Tracker</b> - create, edit, delete, and close debts
              </ListItem>

              <ListItem icon={<OngoingIcon />}>
                <b>Item Tracker</b> - store items you lent out or borrowed
              </ListItem>
            </List>

            <Group mt={30}>
              <Button
                component={Link}
                href="/login"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Get started
              </Button>

              <Button
                component={Link}
                href="https://github.com/ickynavigator/lendr"
                target="_blank"
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Source code
              </Button>

              <ColorSchemeToggle />
            </Group>
          </Box>

          <Image
            src="/header-1.svg"
            className={classes.image}
            alt="Header 1"
            w={rem(376)}
            h={rem(356)}
          />
        </Group>
      </Container>
    </Center>
  );
}
