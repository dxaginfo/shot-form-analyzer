// Theme configuration for styled-components
export const theme = {
  colors: {
    primary: '#F05941', // Basketball orange
    secondary: '#22668D', // Blue
    accent: '#FFCC70', // Light orange/yellow
    success: '#38E54D', // Green
    warning: '#FFD24C', // Yellow
    danger: '#F24C3D', // Red
    background: '#F5F5F5', // Light gray
    cardBackground: '#FFFFFF', // White
    text: '#333333', // Dark gray
    textLight: '#666666', // Medium gray
    border: '#E0E0E0', // Light border
  },
  
  fonts: {
    main: "'Roboto', sans-serif",
    heading: "'Roboto', sans-serif",
  },
  
  fontSizes: {
    small: '0.875rem', // 14px
    medium: '1rem',    // 16px
    large: '1.25rem',  // 20px
    xlarge: '1.5rem',  // 24px
    xxlarge: '2rem',   // 32px
  },
  
  spacing: {
    xs: '0.25rem',     // 4px
    sm: '0.5rem',      // 8px
    md: '1rem',        // 16px
    lg: '1.5rem',      // 24px
    xl: '2rem',        // 32px
    xxl: '3rem',       // 48px
  },
  
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    circle: '50%',
  },
  
  shadows: {
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 8px rgba(0, 0, 0, 0.1)',
    large: '0 8px 16px rgba(0, 0, 0, 0.1)',
  },
  
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px',
  },
  
  transitions: {
    short: '0.2s ease',
    medium: '0.3s ease',
    long: '0.5s ease',
  },
  
  zIndices: {
    base: 0,
    dropdown: 100,
    modal: 200,
    tooltip: 300,
  },
};