import { createTheme, Theme } from "@mui/material/styles";
import { darken, lighten } from "polished";

export const DrawerWidth: number = 250;

interface ColorsType {
    [key: string]: string;
    primary: string;
    secondary: string;
    success: string;
    info: string;
    danger: string;
    warning: string;
    dark: string;
    light: string;
    muted: string;
    border: string;
    inverse: string;
    shaft: string;
    dim_grey: string;
    dove_gray: string;
    body_bg: string;
    light_gray: string;
    white: string;
    black: string;
}

export const Colors: ColorsType = {
    primary: "#1508bd",
    secondary: "#9bbfe3",
    success: "#4CAF50",
    info: "#00a2ff",
    danger: "#0e1b20",
    warning: "#FFC107",
    dark: "#0e1b20",
    light: "#aaa",
    muted: "#abafb3",
    border: "#DDDFE1",
    inverse: "#2F3D4A",
    shaft: "#333",
    dim_grey: "#696969",
    dove_gray: "#d5d5d5",
    body_bg: "#f3f6f9",
    light_gray: "rgb(230,230,230)",
    white: "#fff",
    black: "#000",
};

declare module "@mui/material/styles" {
    interface MyShopButtonProps {
        color?: "primary" | "secondary";
        variant?: "contained" | "outlined" | "text";
    }

    interface Components {
        MyShopButton?: {
            defaultProps?: {
                color?: "primary" | "secondary";
                variant?: "contained" | "outlined" | "text";
            };
            styleOverrides?: {
                root?: {
                    color?: string;
                };
                primary?: MyShopButtonStyleOverrides;
                secondary?: MyShopButtonStyleOverrides;
            };
        };
    }
}

type MyShopButtonStyleOverrides = {
    background: string;
    "&:hover": {
        background: string;
    };
};

declare module "@mui/material/styles" {
    interface MyShopButtonProps {
        color?: "primary" | "secondary";
        variant?: "contained" | "outlined" | "text";
    }
}

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary,
        },
        secondary: {
            main: Colors.secondary,
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            },
        },
        MuiTooltip: {
            defaultProps: {
                arrow: true,
            },
            styleOverrides: {
                tooltip: {
                    background: Colors.primary,
                },
                arrow: {
                    color: Colors.primary,
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: DrawerWidth,
                    background: Colors.primary,
                    color: Colors.secondary,
                    borderRadius: "0px 100px 0px 0px",
                    borderRight: `1px solid ${Colors.primary}`,
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: lighten(0.2, Colors.primary),
                },
            },
        },
        MyShopButton: {
            defaultProps: {
                color: "primary",
                variant: "contained",
            },
            styleOverrides: {
                root: {
                    color: Colors.white,
                },
                primary: {
                    background: Colors.primary,
                    "&:hover": {
                        background: lighten(0.05, Colors.primary),
                    },
                },
                secondary: {
                    background: `${Colors.secondary}`,
                    "&:hover": {
                        background: lighten(0.05, Colors.primary),
                    },
                },
            },
        },
    },
});