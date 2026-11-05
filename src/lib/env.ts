/**
 * Startup environment validation.
 * Secrets must NOT use NEXT_PUBLIC_ prefix. Validated at cold start.
 */
const required = [
  'DATABASE_URL',
  'PAYLOAD_SECRET',
  'NEXT_PUBLIC_SERVER_URL',
]

const optional = [
  'CLOUDFLARE_R2_BUCKET',
  'CLOUDFLARE_R2_ACCESS_KEY_ID',
  'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
  'RESEND_API_KEY',
  'RESEND_FROM_EMAIL',
]

export function validateEnv() {
  const missing = required.filter((key) => !process.env[key])
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}. ` +
        'See .env.example for required values. Do not commit real secrets.',
    )
  }
  optional.forEach((key) => {
    if (!process.env[key]) {
      console.warn(
        `[VHIS env] Optional variable not set: ${key}. Some features may be degraded.`,
      )
    }
  })
}

export const env = {
  databaseUrl: process.env.DATABASE_URL!,
  payloadSecret: process.env.PAYLOAD_SECRET!,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL!,
  r2Bucket: process.env.CLOUDFLARE_R2_BUCKET,
  r2AccessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
  r2SecretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFromEmail: process.env.RESEND_FROM_EMAIL,
}
