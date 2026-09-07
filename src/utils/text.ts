export function filledText(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
}

export function filledTextOr(value: string | undefined, fallback: string): string {
  return filledText(value) ?? fallback;
}

export function givenInitial(name?: string): string | undefined {
  const filled = filledText(name);
  if (!filled) {
    return undefined;
  }

  const parts = filled.split(/\s+/).filter((part) => part.length > 0);
  const given = parts[parts.length - 1] ?? filled;
  const first = [...given][0];

  return first?.toLocaleUpperCase("vi-VN");
}
