import { createTheme } from "@mantine/core";

import { bricolageGrotesque } from "~/theme/font";

const theme = createTheme({
  fontFamily: `${bricolageGrotesque.style.fontFamily}, sans-serif`,
});

export default theme;
