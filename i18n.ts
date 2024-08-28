import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"
import { Locale, i18n } from "./i18n.config"

export default getRequestConfig(async ({ locale }) => {
  if (!i18n.locales.includes(locale as Locale)) notFound()

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
