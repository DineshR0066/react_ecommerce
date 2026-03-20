export const palette = (mode) => ({
  mode,

  primary: {
    lighter: '#E9D1FB',
    light: '#B88FF6',
    main: mode === 'light' ? '#4f7c82' : '#B8e3e9',
    dark: '#4C0E96',
    darker: '#29056B',
    contrastText: '#ffffff',
  },

  secondary: {
    main: '#902ee1',
  },

  background: {
    default: mode === 'light' ? '#f4f5f7' : '#0f0f14',
    paper: mode === 'light' ? '#ffffff' : '#1c1c25',
    neutral: mode === 'light' ? '#F4F6F8' : '#212B36',
  },

  text: {
    primary: mode === 'light' ? '#212B36' : '#FFFFFF',
    secondary: mode === 'light' ? '#637381' : '#919EAB',
    disabled: mode === 'light' ? '#919EAB' : '#637381',
  },
});
