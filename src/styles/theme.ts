/**
 * OPC技能星球小程序 - 设计系统主题
 * 基于 Figma + Frontend Design + Bento 规范
 */

export const colors = {
  primary: '#3B82F6',
  secondary: '#6366F1',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textPlaceholder: '#9CA3AF',
  border: '#E5E7EB',
  divider: '#F3F4F6',
  background: '#F9FAFB',
  card: '#FFFFFF',
  green: '#07c160',
  blue: '#1989fa',
  orange: '#ff976a',
  gray: '#969799',
};

export const typography = {
  fontSize: {
    xs: 10, sm: 12, base: 14, lg: 16, xl: 18, '2xl': 20, '3xl': 24, '4xl': 28, '5xl': 32,
  },
  fontWeight: { normal: 400, medium: 500, semibold: 600, bold: 700 },
  lineHeight: { tight: 1.25, normal: 1.5, relaxed: 1.75 },
};

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, '2xl': 24, '3xl': 30 };

export const borderRadius = { none: 0, sm: 10, md: 14, lg: 18, xl: 22, '2xl': 28, full: 9999 };

export const shadows = { none: 'none', sm: '0 2px 10px rgba(15, 23, 42, 0.04)', default: '0 6px 20px rgba(15, 23, 42, 0.08)', md: '0 10px 30px rgba(15, 23, 42, 0.1)', lg: '0 14px 40px rgba(15, 23, 42, 0.12)' };

export const sizes = {
  avatar: { sm: 32, md: 48, lg: 64, xl: 80 },
  icon: { sm: 16, md: 20, lg: 24, xl: 32 },
  button: { height: 42, heightSm: 36 },
  skillCard: { coverHeight: 120, coverRadius: 8 },
  banner: { height: 160, radius: 12 },
};

export const zIndex = { base: 1, dropdown: 100, sticky: 200, fixed: 300, modal: 400, popup: 500, toast: 600 };

export const transitions = { fast: '0.15s ease', normal: '0.25s ease', slow: '0.35s ease' };

export const cssVariables = `
:root {
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-success: ${colors.success};
  --color-warning: ${colors.warning};
  --color-danger: ${colors.danger};
  --color-text-primary: ${colors.textPrimary};
  --color-text-secondary: ${colors.textSecondary};
  --color-text-placeholder: ${colors.textPlaceholder};
  --color-border: ${colors.border};
  --color-divider: ${colors.divider};
  --color-bg: ${colors.background};
  --color-card: ${colors.card};
  --spacing-xs: ${spacing.xs}px;
  --spacing-sm: ${spacing.sm}px;
  --spacing-md: ${spacing.md}px;
  --spacing-lg: ${spacing.lg}px;
  --radius-sm: ${borderRadius.sm}px;
  --radius-md: ${borderRadius.md}px;
  --radius-lg: ${borderRadius.lg}px;
  --shadow-default: ${shadows.default};
  --font-size-base: ${typography.fontSize.base}px;
}
`;
