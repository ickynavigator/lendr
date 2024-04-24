import {
  Button,
  Center,
  Container,
  Divider,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { redirect } from "next/navigation";

import {
  FacebookButton,
  GithubButton,
  GoogleButton,
} from "~/app/login/_components/AuthButton";
import { auth } from "~/server/auth";

export default async function Page() {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <Center h="100%">
      <Container w="100%">
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" fw={500}>
            Hi there! Please sign in to continue.
          </Text>

          <form>
            <Group grow mb="md" mt="md" visibleFrom="sm">
              <GithubButton />
              <GoogleButton />
              <FacebookButton />
            </Group>
            <Stack mb="md" mt="md" hiddenFrom="sm">
              <GithubButton />
              <GoogleButton />
              <FacebookButton />
            </Stack>
            <Divider
              label="Or continue with email"
              labelPosition="center"
              my="lg"
            />
            <Stack>
              <TextInput
                required
                disabled
                label="Email"
                placeholder="john@doe.com"
                radius="md"
              />
              <PasswordInput
                required
                disabled
                label="Password"
                placeholder="Your password"
                radius="md"
              />
            </Stack>
            <Group justify="space-between" mt="xl">
              <Button disabled type="submit" radius="md">
                Login
              </Button>
            </Group>
          </form>
        </Paper>
      </Container>
    </Center>
  );
}
