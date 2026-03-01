import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';

/** Hash a password with bcrypt (cost factor 12) */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/** Verify a password against a hash */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/** Generate a secure random token */
export function generateToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/** Hash a token for database storage (SHA-256) */
export function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/** Create an email verification token (24h expiry) */
export async function createVerificationToken(email: string): Promise<string> {
  const token = generateToken();
  const hashedToken = hashToken(token);
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await db.verificationToken.deleteMany({
    where: { identifier: email, type: 'email' },
  });

  await db.verificationToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires,
      type: 'email',
    },
  });

  return token;
}

/** Verify an email verification token */
export async function verifyEmailToken(email: string, token: string): Promise<boolean> {
  const hashedToken = hashToken(token);

  const record = await db.verificationToken.findFirst({
    where: {
      identifier: email,
      token: hashedToken,
      type: 'email',
      expires: { gt: new Date() },
    },
  });

  if (!record) return false;

  await db.user.update({
    where: { email },
    data: { emailVerified: true, emailVerifiedAt: new Date() },
  });

  await db.verificationToken.delete({
    where: {
      identifier_token: { identifier: email, token: hashedToken },
    },
  });

  return true;
}

/** Create a password reset token (1h expiry) */
export async function createPasswordResetToken(email: string): Promise<string | null> {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) return null;

  const token = generateToken();
  const hashedToken = hashToken(token);
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  await db.verificationToken.deleteMany({
    where: { identifier: email, type: 'password_reset' },
  });

  await db.verificationToken.create({
    data: {
      identifier: email,
      token: hashedToken,
      expires,
      type: 'password_reset',
    },
  });

  return token;
}

/** Reset password using a valid token */
export async function resetPasswordWithToken(
  email: string,
  token: string,
  newPassword: string
): Promise<boolean> {
  const hashedToken = hashToken(token);

  const record = await db.verificationToken.findFirst({
    where: {
      identifier: email,
      token: hashedToken,
      type: 'password_reset',
      expires: { gt: new Date() },
    },
  });

  if (!record) return false;

  const passwordHash = await hashPassword(newPassword);

  await db.user.update({
    where: { email },
    data: { passwordHash, failedLoginAttempts: 0, lockedUntil: null },
  });

  await db.verificationToken.delete({
    where: {
      identifier_token: { identifier: email, token: hashedToken },
    },
  });

  return true;
}

/** Validate password strength */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  errors: string[];
  score: number;
} {
  const errors: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score++;
  } else {
    errors.push('At least 8 characters');
  }
  if (/[A-Z]/.test(password)) {
    score++;
  } else {
    errors.push('One uppercase letter');
  }
  if (/[a-z]/.test(password)) {
    score++;
  } else {
    errors.push('One lowercase letter');
  }
  if (/[0-9]/.test(password)) {
    score++;
  } else {
    errors.push('One number');
  }
  if (/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) {
    score++;
  } else {
    errors.push('One special character');
  }

  return { isValid: errors.length === 0, errors, score };
}
