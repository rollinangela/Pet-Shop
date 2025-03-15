export interface Pet {
  id: number;
  name: string;
  type: string; // "dog", "cat", "small"
  breed: string;
  age: number; // age in months
  gender: string; // "male", "female"
  size: string; // "small", "medium", "large"
  personality: string;
  status: string; // "available", "adopted", "pending"
  description: string;
  imageUrl: string;
}

export const formatAge = (ageInMonths: number): string => {
  if (ageInMonths < 12) {
    return `${ageInMonths} month${ageInMonths === 1 ? '' : 's'}`;
  } else {
    const years = Math.floor(ageInMonths / 12);
    const months = ageInMonths % 12;
    
    if (months === 0) {
      return `${years} year${years === 1 ? '' : 's'}`;
    } else {
      return `${years} year${years === 1 ? '' : 's'}, ${months} month${months === 1 ? '' : 's'}`;
    }
  }
};
