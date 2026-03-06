import { COLORS } from "../../../constants/theme";

export const CATEGORIES = {
  Personal: { icon: "person-outline", color: COLORS.personal },
  Work: { icon: "briefcase-outline", color: COLORS.work },
  Shopping: { icon: "cart-outline", color: COLORS.shopping },
  Fitness: { icon: "fitness-outline", color: COLORS.fitness },
} as const;

export type CategoryType = keyof typeof CATEGORIES;
