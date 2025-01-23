import "dotenv/config"

/* Sidebars */
export const SIDEBAR_COOKIE_NAME = "sidebar:state"
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
export const SIDEBAR_WIDTH = "16rem"
export const SIDEBAR_WIDTH_MOBILE = "18rem"
export const SIDEBAR_WIDTH_ICON = "3rem"
export const SIDEBAR_KEYBOARD_SHORTCUT = "b"

/* Themes */
export const THEMES = { light: "", dark: ".dark" } as const

/** GitHub Link */
export const GITHUB_REPO_ISSUES = "https://github.com/aelluminate/app.sencept.io/issues"

/** Flask API */
export const FLASK_API_URL = process.env.NEXT_PUBLIC_FLASK_API_URL