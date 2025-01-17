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

export const CONTRACT_ADDRESSES = {
  MORPHO: "0x64c7f3c2C19B41a6aD67bb5f4edc8EdbB3284F34",
  CREDIT_POINTS: "0x3adE9C2638e407D4CCB5Ee09Fb052092FCaF6421",
  IRM: "0x46415998764C29aB2a25CbeA6254146D50D22687",
  CREDIT_TALENT_CENTER: {
    [ASSET_TYPES.XOC]: "0xBD03d38828Bf0D56f1d325F96d4d48d4a2fa3549",
    [ASSET_TYPES.USDC]: "0x9A41029a07Ca57873CAd637384671349Fc9e8D9C",
    [ASSET_TYPES.TALENT]: "0x465d5decA1A8d4c93e7D6a97018F0EFfCe56D247"
  }
} as const;
