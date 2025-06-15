import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // TODO: fetch user locale from cookies
  const locale = "en";

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
