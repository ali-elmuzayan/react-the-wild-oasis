// Global CSS styles using styled-components
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
/* CSS Custom Properties (CSS Variables) for consistent theming */
:root {
  /* Brand Colors - Indigo palette for primary brand elements */
  --color-brand-50: #eef2ff;   /* Lightest indigo */
  --color-brand-100: #e0e7ff;  /* Very light indigo */
  --color-brand-200: #c7d2fe;  /* Light indigo */
  --color-brand-500: #6366f1;  /* Medium indigo */
  --color-brand-600: #4f46e5;  /* Primary brand color */
  --color-brand-700: #4338ca;  /* Dark indigo */
  --color-brand-800: #3730a3;  /* Very dark indigo */
  --color-brand-900: #312e81;  /* Darkest indigo */

  /* Neutral Colors - Grey palette for text, backgrounds, and borders */
  --color-grey-0: #fff;        /* Pure white */
  --color-grey-50: #f9fafb;    /* Very light grey */
  --color-grey-100: #f3f4f6;   /* Light grey */
  --color-grey-200: #e5e7eb;   /* Medium light grey */
  --color-grey-300: #d1d5db;   /* Medium grey */
  --color-grey-400: #9ca3af;   /* Medium dark grey */
  --color-grey-500: #6b7280;   /* Dark grey */
  --color-grey-600: #4b5563;   /* Very dark grey */
  --color-grey-700: #374151;   /* Almost black */
  --color-grey-800: #1f2937;   /* Very dark */
  --color-grey-900: #111827;   /* Almost pure black */

  /* Semantic Colors - For specific UI states and meanings */
  --color-blue-100: #e0f2fe;   /* Light blue */
  --color-blue-700: #0369a1;   /* Dark blue */
  --color-green-100: #dcfce7;  /* Light green */
  --color-green-700: #15803d;  /* Dark green */
  --color-yellow-100: #fef9c3; /* Light yellow */
  --color-yellow-700: #a16207; /* Dark yellow */
  --color-silver-100: #e5e7eb; /* Light silver */
  --color-silver-700: #374151; /* Dark silver */
  --color-indigo-100: #e0e7ff; /* Light indigo */
  --color-indigo-700: #4338ca; /* Dark indigo */

  /* Error Colors - Red palette for errors and warnings */
  --color-red-100: #fee2e2;    /* Light red */
  --color-red-700: #b91c1c;    /* Dark red */
  --color-red-800: #991b1b;    /* Very dark red */

  /* Utility Colors */
  --backdrop-color: rgba(255, 255, 255, 0.1); /* Semi-transparent backdrop */

  /* Shadow System - Consistent elevation levels */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);   /* Small shadow */
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06); /* Medium shadow */
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);  /* Large shadow */

  /* Border Radius System - Consistent corner rounding */
  --border-radius-tiny: 3px;   /* Very small radius */
  --border-radius-sm: 5px;     /* Small radius */
  --border-radius-md: 7px;     /* Medium radius */
  --border-radius-lg: 9px;     /* Large radius */

  /* Dark Mode Variables - For future dark mode implementation */
  --image-grayscale: 0;        /* Image grayscale filter */
  --image-opacity: 100%;       /* Image opacity filter */
}

/* Global Reset - Remove default browser styles */
*,
*::before,
*::after {
  box-sizing: border-box;      /* Include padding and border in element's total width and height */
  padding: 0;                  /* Remove default padding */
  margin: 0;                   /* Remove default margin */

  /* Smooth transitions for dark mode theme switching */
  transition: background-color 0.3s, border 0.3s;
}

/* Base HTML element */
html {
  font-size: 62.5%;            /* 1rem = 10px (for easier calculations) */
}

/* Base body styles */
body {
  font-family: "Poppins", sans-serif; /* Primary font family */
  color: var(--color-grey-700);       /* Default text color */

  transition: color 0.3s, background-color 0.3s; /* Smooth theme transitions */
  min-height: 100vh;                   /* Full viewport height */
  line-height: 1.5;                    /* Comfortable line spacing */
  font-size: 1.6rem;                   /* Base font size (16px) */
}

/* Form elements - Inherit font and color from parent */
input,
button,
textarea,
select {
  font: inherit;               /* Inherit font family and size */
  color: inherit;              /* Inherit text color */
}

/* Button cursor */
button {
  cursor: pointer;             /* Hand cursor for buttons */
}

/* Disabled state styling */
*:disabled {
  cursor: not-allowed;         /* Not-allowed cursor for disabled elements */
}

/* Disabled form elements */
select:disabled,
input:disabled {
  background-color: var(--color-grey-200); /* Light grey background */
  color: var(--color-grey-500);            /* Muted text color */
}

/* Focus states for accessibility */
input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600); /* Brand color outline */
  outline-offset: -1px;                       /* Slight inset outline */
}

/* Button with SVG icon alignment */
button:has(svg) {
  line-height: 0;              /* Remove line height for better icon alignment */
}

/* Link styling */
a {
  color: inherit;              /* Inherit text color */
  text-decoration: none;       /* Remove default underline */
}

/* List styling */
ul {
  list-style: none;            /* Remove default list bullets */
}

/* Typography - Text wrapping and hyphenation */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;   /* Break long words to prevent overflow */
  hyphens: auto;               /* Automatic hyphenation */
}

/* Image styling */
img {
  max-width: 100%;             /* Prevent images from overflowing containers */

  /* Dark mode image filters */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
`;

export default GlobalStyles;
