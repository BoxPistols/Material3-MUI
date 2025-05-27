import { createTheme, type CSSObject } from '@mui/material/styles';

import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from '@material/material-color-utilities';
import type { ButtonProps } from '@mui/material';

const colorSchemes = themeFromSourceColor(argbFromHex('#65558F')).schemes;

const base = createTheme({
  palette: {
    primary: { main: hexFromArgb(colorSchemes.light.primary) },
    secondary: { main: hexFromArgb(colorSchemes.light.secondary) },
  },
});

// 以下のパスを参考に
// node_modules/@mui/styled-engine/esm/index.d.ts
type Variant<Props> = {
  props:
    | (Props extends {
        ownerState: infer O;
      }
        ? Partial<Omit<Props, 'ownerState'> & O>
        : Partial<Props>)
    | ((
        props: Partial<Props> & {
          ownerState: Partial<Props>;
        }
      ) => boolean);
  style:
    | CSSObject
    | ((
        args: Props extends {
          theme: any;
        }
          ? {
              theme: Props['theme'];
            }
          : any
      ) => CSSObject);
};

type ButtonVariant = Variant<ButtonProps>;

const elevated: ButtonVariant = {
  props: { variant: 'elevated' },
  style: {
    backgroundColor: hexFromArgb(colorSchemes.light.surface),
    color: hexFromArgb(colorSchemes.light.primary),
    borderRadius: 40,
    boxShadow: base.shadows[2],
  },
};

const filled: ButtonVariant = {
  props: { variant: 'filled' },
  style: {
    backgroundColor: hexFromArgb(colorSchemes.light.primary),
    color: hexFromArgb(colorSchemes.light.onPrimary),
    borderRadius: 40,
  },
};

const tonal: ButtonVariant = {
  props: { variant: 'tonal' },
  style: {
    backgroundColor: hexFromArgb(colorSchemes.light.secondaryContainer),
    color: hexFromArgb(colorSchemes.light.onSecondaryContainer),
    borderRadius: 40,
  },
};

const outlined: ButtonVariant = {
  props: { variant: 'outlined' },
  style: {
    borderColor: hexFromArgb(colorSchemes.light.outlineVariant),
    color: hexFromArgb(colorSchemes.light.onSurfaceVariant),
    borderRadius: 40,
  },
};

const text: ButtonVariant = {
  props: { variant: 'text' },
  style: {
    borderRadius: 40,
  },
};

export const theme = createTheme({
  palette: base.palette,
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [elevated, filled, tonal, outlined, text],
        },
      },
    },
  },
});
