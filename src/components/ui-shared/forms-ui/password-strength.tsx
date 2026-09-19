"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  evaluatePasswordStrength,
  type PasswordStrengthLevel,
} from "@/lib/password/evaluate-password-strength";

interface PasswordStrengthProps {
  password: string;
}

const SEGMENT_DURATION = 400;

const strengthColourClasses: Record<PasswordStrengthLevel, string> = {
  0: "bg-border-subtle",
  1: "bg-red-600",
  2: "bg-orange-500",
  3: "bg-amber-500",
  4: "bg-emerald-600",
};

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = evaluatePasswordStrength(password);

  const [displayedLevel, setDisplayedLevel] =
    useState<PasswordStrengthLevel>(0);

  const displayedLevelRef = useRef<PasswordStrengthLevel>(0);

  const targetLevelRef = useRef<PasswordStrengthLevel>(strength.level);

  const timerRef = useRef<number | null>(null);

  const moveOneSection = useCallback(function moveOneSection() {
    timerRef.current = null;

    const currentLevel = displayedLevelRef.current;
    const targetLevel = targetLevelRef.current;

    if (currentLevel === targetLevel) {
      return;
    }

    const nextLevel = (
      currentLevel < targetLevel ? currentLevel + 1 : currentLevel - 1
    ) as PasswordStrengthLevel;

    displayedLevelRef.current = nextLevel;
    setDisplayedLevel(nextLevel);

    timerRef.current = window.setTimeout(moveOneSection, SEGMENT_DURATION);
  }, []);

  useEffect(() => {
    targetLevelRef.current = strength.level;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }

      displayedLevelRef.current = strength.level;
      setDisplayedLevel(strength.level);

      return;
    }

    if (timerRef.current === null) {
      timerRef.current = window.setTimeout(moveOneSection, 0);
    }
  }, [strength.level, moveOneSection]);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      role="meter"
      aria-label="Password strength"
      aria-valuemin={0}
      aria-valuemax={4}
      aria-valuenow={strength.level}
      aria-valuetext={strength.label}
      className="space-y-2"
    >
      <div aria-hidden="true" className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((segment) => {
          const isActive = segment <= displayedLevel;

          return (
            <div
              key={segment}
              className={[
                "h-1.5 overflow-hidden rounded-full",
                "bg-border-subtle",
              ].join(" ")}
            >
              <div
                className={[
                  "password-strength-fill",
                  "h-full w-full rounded-full",
                  strengthColourClasses[strength.level],
                ].join(" ")}
                style={{
                  transform: isActive ? "scaleX(1)" : "scaleX(0)",
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4 text-xs">
        <span className="font-semibold text-foreground">Password strength</span>

        <span aria-hidden="true" className="text-text-muted">
          {strength.label}
        </span>
      </div>
    </div>
  );
}
