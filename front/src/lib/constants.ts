import { PUBLIC_BACKEND_IP } from "$env/static/public"
import { PUBLIC_BACKEND_PORT } from "$env/static/public"

export const BACKEND_URL: string = `http://${PUBLIC_BACKEND_IP}:${PUBLIC_BACKEND_PORT}/api/`