export type PasswordStrengthLevel = 0 | 1 | 2 | 3 | 4;

export interface PasswordStrengthResult {
  level: PasswordStrengthLevel;
  label: "Min. 8 characters" | "Weak" | "Fair" | "Good" | "Strong";
}

export function evaluatePasswordStrength(
  password: string,
): PasswordStrengthResult {
  if (!password) {
    return { level: 0, label: "Min. 8 characters" };
  }

  if (password.length < 8) {
    return { level: 1, label: "Weak" };
  }

  let score = 1;

  if (password.length >= 12) score += 1;

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 1;
  }

  if (/\d/.test(password)) score += 1;

  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { level: 1, label: "Weak" };
  if (score === 2) return { level: 2, label: "Fair" };
  if (score <= 4) return { level: 3, label: "Good" };

  return { level: 4, label: "Strong" };
}
