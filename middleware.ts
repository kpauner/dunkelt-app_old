import createMiddleware from "next-intl/middleware"
import { i18n } from "./i18n.config"

export default createMiddleware({
  // Imported from config/i18n.config
  locales: i18n.locales,

  // Used when no locale matches
  defaultLocale: "en",
})

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(en|da)/:path*"],
}
