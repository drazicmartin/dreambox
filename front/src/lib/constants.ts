import { PUBLIC_BACKEND_IP, PUBLIC_BACKEND_PORT } from "$env/static/public";

export const BACKEND_URL: string = `http://${process.env['PUBLIC_BACKEND_IP'] ?? PUBLIC_BACKEND_IP}:${process.env['PUBLIC_BACKEND_PORT'] ?? PUBLIC_BACKEND_PORT}/api/`;

export const BACKEND_ROOT_URL: string = `http://${process.env['PUBLIC_BACKEND_IP'] ?? PUBLIC_BACKEND_IP}:${process.env['PUBLIC_BACKEND_PORT'] ?? PUBLIC_BACKEND_PORT}`;