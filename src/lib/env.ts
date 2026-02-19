// ============================================================================
// RoboNorth.ca — Environment Configuration with Validation
// ============================================================================

type Environment = 'development' | 'staging' | 'production';

interface EnvConfig {
  NODE_ENV: Environment;
  DATABASE_URL: string;
  SITE_URL: string;
  GA_MEASUREMENT_ID: string;
  SMTP_FROM: string;
  SMTP_HOST: string;
  SMTP_PORT: number;
  SMTP_USER: string;
  SMTP_PASS: string;
}

const defaults: Record<Environment, Partial<EnvConfig>> = {
  development: {
    SITE_URL: 'http://localhost:3000',
    DATABASE_URL: 'file:./prisma/dev.db',
    GA_MEASUREMENT_ID: '',
    SMTP_FROM: 'noreply@localhost',
    SMTP_HOST: '',
    SMTP_PORT: 587,
    SMTP_USER: '',
    SMTP_PASS: '',
  },
  staging: {
    SITE_URL: 'https://staging.robonorth.ca',
    GA_MEASUREMENT_ID: '',
  },
  production: {
    SITE_URL: 'https://robonorth.ca',
  },
};

function getEnv(): EnvConfig {
  const nodeEnv = (process.env.NODE_ENV || 'development') as Environment;
  const envDefaults = defaults[nodeEnv] || defaults.development;

  return {
    NODE_ENV: nodeEnv,
    DATABASE_URL: process.env.DATABASE_URL || envDefaults.DATABASE_URL || 'file:./prisma/dev.db',
    SITE_URL: process.env.SITE_URL || envDefaults.SITE_URL || 'http://localhost:3000',
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID || envDefaults.GA_MEASUREMENT_ID || '',
    SMTP_FROM: process.env.SMTP_FROM || envDefaults.SMTP_FROM || '',
    SMTP_HOST: process.env.SMTP_HOST || envDefaults.SMTP_HOST || '',
    SMTP_PORT: parseInt(process.env.SMTP_PORT || String(envDefaults.SMTP_PORT || 587)),
    SMTP_USER: process.env.SMTP_USER || envDefaults.SMTP_USER || '',
    SMTP_PASS: process.env.SMTP_PASS || envDefaults.SMTP_PASS || '',
  };
}

export const env = getEnv();

export function validateEnv(): string[] {
  const errors: string[] = [];

  if (!env.DATABASE_URL) {
    errors.push('DATABASE_URL is required');
  }

  if (env.NODE_ENV === 'production') {
    if (!env.GA_MEASUREMENT_ID) {
      errors.push('GA_MEASUREMENT_ID is recommended for production');
    }
    if (env.SITE_URL === 'http://localhost:3000') {
      errors.push('SITE_URL should not be localhost in production');
    }
  }

  return errors;
}

export default env;
