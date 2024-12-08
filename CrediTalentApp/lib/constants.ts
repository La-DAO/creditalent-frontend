export const NETWORK_CONFIG = {
  BASE_SEPOLIA: {
    chainId: 84532,
    name: 'Base Sepolia'
  }
};

export const ASSET_TYPES = {
  XOC: 'xoc',
  USDC: 'usdc',
  TALENT: 'talent'
} as const;

export type AssetType = (typeof ASSET_TYPES)[keyof typeof ASSET_TYPES];

export const CREDIT_ALLOWANCE_BY_SCORE = {
  0: 0,
  10: 100, // TODO: CRIS
  25: 500,
  50: 1000,
  75: 1500,
}

export const CREDIT_STATUS_LABEL = {
  'REJECTED': "Denied",
  'APPROVED': "Approved",
  'PENDING': "Waiting for approval",
}

export const DEFAULT_CREDIT_STATUS_LABEL = "Haven't started"