export const PropertyType = {
  HOUSE: 'house',
  APARTMENT: 'apartment',
  STUDIO: 'studio',
  FURNISHED: 'furnished'
} as const;

export const City = {
  YAOUNDE: 'yaounde',
  DOUALA: 'douala'
} as const;

export const ManagementType = {
  SELF: 'self',
  BAYELE: 'bayele'
} as const;

export const PropertyStatus = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  MAINTENANCE: 'maintenance',
  REJECTED: 'rejected',
  PENDING: 'pending'
} as const;

export type PropertyType = typeof PropertyType[keyof typeof PropertyType];
export type City = typeof City[keyof typeof City];
export type ManagementType = typeof ManagementType[keyof typeof ManagementType];
export type PropertyStatus = typeof PropertyStatus[keyof typeof PropertyStatus];