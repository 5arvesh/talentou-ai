export const AVATAR_COLORS = [
  'from-primary to-purple-700',
  'from-blue-500 to-blue-700',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
  'from-rose-500 to-red-600',
];

const AVATAR_SOLID_COLORS = [
  'bg-primary',
  'bg-blue-600',
  'bg-emerald-600',
  'bg-amber-600',
  'bg-rose-600',
];

export function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase();
}

export function getAvatarColor(name: string) {
  const idx = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

export function getAvatarSolidColor(name: string) {
  const idx = name.charCodeAt(0) % AVATAR_SOLID_COLORS.length;
  return AVATAR_SOLID_COLORS[idx];
}
