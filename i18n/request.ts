import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  return {
    // Set the time zone to UTC for all locales
    timeZone: "UTC",

    // ... other configuration options ...
  };
});
