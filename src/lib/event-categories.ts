export const eventCategories = [
  { label: "Food Distribution", value: "food-distribution" },
  { label: "Poor & Needy Support", value: "poor-needy-support" },
  { label: "Zakat & Sadaqah", value: "zakat-sadaqah" },
  { label: "Islamic Education", value: "islamic-education" },
  { label: "Orphan Support", value: "orphan-support" },
  { label: "Medical & Healthcare Aid", value: "medical-healthcare-aid" },
  { label: "Ramadan & Iftar Distribution", value: "ramadan-iftar" },
  { label: "Winter Clothing Distribution", value: "winter-clothing" },
  { label: "Qurbani Meat Distribution", value: "qurbani-meat-distribution" },
  { label: "Mosque & Madrasa Support", value: "mosque-madrasa-support" },
  { label: "Islamic Awareness Programs", value: "islamic-awareness" },
  { label: "Community Welfare", value: "community-welfare" },
  { label: "Emergency Relief", value: "emergency-relief" },
  { label: "Marriage & Family Support", value: "marriage-family-support" },
  { label: "Fundraising & Donations", value: "fundraising-donations" },
  { label: "Other", value: "other" },
];

export function getEventCategoryLabel(value?: string | null) {
  if (!value) return "Community Event";

  const match = eventCategories.find((category) => category.value === value);
  if (match) return match.label;

  return value
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
