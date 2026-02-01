
/**
 * Displays a Pokemon types with its color bg
 * add all of Pokemon existing types and not only ones from PDF layout with corresponding color text
 * Uses inline styles for background and text colors because Tailwind CSS
 * cannot statically analyze dynamic class names at build time.This ensures 
 * all 18+ types are correctly colored without bloating the CSS bundle 
 * with unused class variations.
 */


interface BadgeTypeProps {
  type: string;
}

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  grass: { bg: '#9bcc50', text: '#000000' },
  poison: { bg: '#b97fc9', text: '#ffffff' },
  fire: { bg: '#fd7d24', text: '#ffffff' },
  water: { bg: '#4592c4', text: '#ffffff' },
  flying: { bg: '#3dc7ef', text: '#000000' },
  normal: { bg: '#a8a878', text: '#000000' },
  fighting: { bg: '#c03028', text: '#ffffff' },
  bug: { bg: '#a8b820', text: '#000000' },
  ghost: { bg: '#705898', text: '#ffffff' },
  steel: { bg: '#b8b8d0', text: '#000000' },
  electric: { bg: '#f8d030', text: '#000000' },
  psychic: { bg: '#f85888', text: '#ffffff' },
  ice: { bg: '#98d8d8', text: '#000000' },
  dragon: { bg: '#7038f8', text: '#ffffff' },
  dark: { bg: '#705848', text: '#ffffff' },
  fairy: { bg: '#ee99ac', text: '#000000' },
  rock: { bg: '#b8a038', text: '#000000' },
  ground: { bg: '#e0c068', text: '#000000' },
};

export function BadgeType({ type }: BadgeTypeProps) {

  const colors = TYPE_COLORS[type] || { bg: '#a8a878', text: '#000000' };

  return (
    <div
       style={{ backgroundColor: colors.bg, color: colors.text }}
      className={`inline-flex items-center justify-center rounded-md text-caption contrast-125 font-medium leading-caption capitalize px-3 py-1`}
      aria-label={`Type: ${type}`}
    >
      {type}
    </div>
  );
}