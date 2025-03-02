
import React from 'react';

export const ThemeToggle = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <label id="theme-toggle-button">
      <input type="checkbox" id="toggle" onChange={onToggle} />
      <svg width="7em" viewBox="0 0 47.5 27.5" preserveAspectRatio="xMinYMin meet">
        <defs>
          <linearGradient id="gradient-1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="24" gradientTransform="matrix(0.987, 0, 0, 0.987, 0.8, 0.177)">
            <stop stopColor="#d4e4aa" />
            <stop offset="0.5" stopColor="#abcc7c" />
            <stop offset="1" stopColor="#81b35d" />
          </linearGradient>
        </defs>
        <rect id="container" width="47.5" height="27.5" rx="13.75" fill="#2b4360" />
        <g id="button">
          <rect width="21" height="21" rx="10.5" x="4.75" y="3.75" fill="url('#gradient-1')" />
          <g id="cloud">
            <ellipse cx="11.75" cy="14.75" rx="4" ry="4" fill="#e8f3fc" />
            <ellipse cx="16.25" cy="15.25" rx="3.5" ry="3.5" fill="#e8f3fc" />
            <ellipse cx="5.75" cy="15.75" rx="2" ry="2" fill="#e8f3fc" />
            <ellipse cx="11.25" cy="16.75" rx="4.5" ry="4.5" fill="#e8f3fc" />
          </g>
          <circle id="sun" cx="15.25" cy="14.75" r="3" fill="#ffef6b" />
          <g id="moon">
            <circle cx="15.25" cy="14.75" r="3" fill="#ffef6b" />
            <ellipse cx="13.25" cy="13.75" rx="3" ry="3" fill="#2b4360" />
          </g>
        </g>
        <g id="stars">
          <polygon fill="#e8f3fc" points="41.5 10.8 40 10.5 39.5 9 39 10.5 37.5 10.8 38.5 11.8 38.3 13.3 39.5 12.5 40.7 13.3 40.5 11.8 41.5 10.8" />
          <polygon fill="#e8f3fc" points="36.5 16.8 35 16.5 34.5 15 34 16.5 32.5 16.8 33.5 17.8 33.3 19.3 34.5 18.5 35.7 19.3 35.5 17.8 36.5 16.8" />
          <polygon fill="#e8f3fc" points="40.5 3.8 39 3.5 38.5 2 38 3.5 36.5 3.8 37.5 4.8 37.3 6.3 38.5 5.5 39.7 6.3 39.5 4.8 40.5 3.8" />
          <polygon fill="#e8f3fc" points="39.5 22.8 38 22.5 37.5 21 37 22.5 35.5 22.8 36.5 23.8 36.3 25.3 37.5 24.5 38.7 25.3 38.5 23.8 39.5 22.8" />
          <polygon fill="#e8f3fc" points="45.5 15.8 44 15.5 43.5 14 43 15.5 41.5 15.8 42.5 16.8 42.3 18.3 43.5 17.5 44.7 18.3 44.5 16.8 45.5 15.8" />
          <polygon fill="#e8f3fc" points="44.5 8.8 43 8.5 42.5 7 42 8.5 40.5 8.8 41.5 9.8 41.3 11.3 42.5 10.5 43.7 11.3 43.5 9.8 44.5 8.8" />
        </g>
      </svg>
    </label>
  );
};
