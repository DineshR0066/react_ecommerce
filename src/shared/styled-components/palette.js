export const palette = (mode) => ({
  mode,

  primary: {
    main: mode === 'light' ? '#761fc2' : '#8146bcff',
  },

  secondary: {
    main: '#902ee1',
  },

  background: {
    default: mode === 'light' ? '#f4f5f7' : '#0f0f14',
    paper: mode === 'light' ? '#ffffff' : '#1c1c25',
  },

  text: {
    primary: mode === 'light' ? '#111' : '#fff',
    secondary: mode === 'light' ? '#555' : '#aaa',
  },
});
