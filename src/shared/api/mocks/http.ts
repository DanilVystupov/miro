import { createOpenApiHttp } from "openapi-msw"
import { CONFIG } from "@/shared/model/config.ts"
import type { paths } from "@/shared/api/schema/generated.ts"

export const http = createOpenApiHttp<paths>({
  baseUrl: CONFIG.API_BASE_URL,
})
