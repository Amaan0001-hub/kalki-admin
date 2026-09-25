/**
 * Re-exports the shared auth service for feature-local imports
 * (e.g. `import { authService } from "@/features/auth/services/auth.service"`).
 * Keeping actual implementation in `src/services` avoids duplication since
 * auth is also consumed outside this feature (e.g. middleware-adjacent code).
 */
export { authService } from "@/services/auth.service";
