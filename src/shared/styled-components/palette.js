export const palette = (mode) => ({
  mode,
 
  primary: {
    lighter:      '#D4EFF3',           
    light:        '#8DCCD4',           
    main:         mode === 'light' ? '#B8E3E9' : '#4F7C82',
    dark:         '#35555A',           
    darker:       '#1E3A3E',           
    contrastText: mode === 'light' ? '#0D2B2E' : '#FFFFFF',
  },
 
  secondary: {
    light:        '#7EC8D0',
    main:         '#2A7F8A',
    dark:         '#1A5460',
    contrastText: '#FFFFFF',
  },

  success: {
    main: mode === 'light' ? '#2E7D32' : '#69F0AE',
    light: mode === 'light' ? '#cef4d1ff' : '#1B5E20',
    dark: mode === 'light' ? '#1B5E20' : '#cef4d1ff',
    contrastText: mode === 'light' ? '#FFFFFF' : '#2E7D32',
  },

  error: {
    main: mode === 'light' ? '#D32F2F' : '#e36f65ff',
    light: mode === 'light' ? '#EF5350' : '#FF8A80',
    dark: mode === 'light' ? '#C62828' : '#D32F2F',
    contrastText: mode === 'light' ? '#FFFFFF' : '#473b3bff',
  },
 
  background: {
    default: mode === 'light' ? '#F4F5F7' : '#0F0F14',
    paper:   mode === 'light' ? '#FFFFFF'  : '#1C1C25',
    neutral: mode === 'light' ? '#F4F6F8'  : '#212B36',
  },
 
  text: {
    primary:   mode === 'light' ? '#212B36' : '#FFFFFF',
    secondary: mode === 'light' ? '#637381' : '#919EAB',
    disabled:  mode === 'light' ? '#919EAB' : '#637381',
  },
});