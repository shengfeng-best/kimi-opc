declare const wx: any;

type FeatureFlagKey =
  | 'feature.paymentV1'
  | 'feature.refundFlowV1'
  | 'feature.riskRuleV1'
  | 'feature.newBentoLayout';

type FeatureFlags = Record<FeatureFlagKey, boolean>;

const DEFAULT_FLAGS: FeatureFlags = {
  'feature.paymentV1': true,
  'feature.refundFlowV1': true,
  'feature.riskRuleV1': true,
  'feature.newBentoLayout': true,
};

function readLocalFlagOverrides(): Partial<FeatureFlags> {
  try {
    const raw = wx.getStorageSync('feature_flags');
    if (!raw || typeof raw !== 'object') return {};
    return raw as Partial<FeatureFlags>;
  } catch {
    return {};
  }
}

export function getFeatureFlags(): FeatureFlags {
  return { ...DEFAULT_FLAGS, ...readLocalFlagOverrides() };
}

export function isFeatureEnabled(key: FeatureFlagKey): boolean {
  return Boolean(getFeatureFlags()[key]);
}

export function setLocalFeatureFlag(key: FeatureFlagKey, value: boolean): void {
  const current = readLocalFlagOverrides();
  wx.setStorageSync('feature_flags', { ...current, [key]: value });
}

export type { FeatureFlagKey, FeatureFlags };
