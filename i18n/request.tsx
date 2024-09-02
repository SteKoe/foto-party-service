import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import parser from "accept-language-parser";

const ALLOWED_LANGUAGES = ["de", "en"];

export default getRequestConfig(async () => {
  let locale = "de";

  const lang = headers().get("accept-language");
  if (lang) {
    const languages = parser.parse(lang);
    console.log(languages);
    locale = languages[0].code;
  }

  if (ALLOWED_LANGUAGES.indexOf(locale) === -1) {
    locale = "de";
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
