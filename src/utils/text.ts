export function filledText(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

export function filledTextOr(value: string | undefined, fallback: string): string {
  return filledText(value) ?? fallback;
}
