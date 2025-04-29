const componentsOverrides = (theme: any) => ({
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          padding: theme.spacing(1, 2),
        },
        containedPrimary: {
          backgroundColor: theme.palette.primary.main,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            color: '#fff'
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: theme.spacing(2),
        },
      },
    }
  });
  
  export default componentsOverrides;
  