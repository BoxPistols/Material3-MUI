import React from "react";
import {Box, Typography, Grid, Paper} from "@mui/material";
import {materialColors} from "../theme";

interface ColorSwatchProps {
  color: string;
  name: string;
  value: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({color, name, value}) => (
  <Paper
    elevation={1}
    sx={{
      display: "flex",
      flexDirection: "column",
      p: 2,
      height: "100%",
      borderRadius: 2,
      overflow: "hidden",
    }}
  >
    <Box
      sx={{
        backgroundColor: color,
        width: "100%",
        height: 100,
        borderRadius: 1,
        mb: 1,
      }}
    />
    <Typography variant="subtitle1" fontWeight="bold">
      {name}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {value}
    </Typography>
  </Paper>
);

export const ColorSchemeDisplay: React.FC<{
  title: string;
  colors: Record<string, string>;
}> = ({title, colors}) => (
  <Box sx={{mb: 6}}>
    <Typography variant="h4" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {Object.entries(colors).map(([name, value]) => (
        <Grid>
          <ColorSwatch color={value} name={name} value={value} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export const TonalPaletteDisplay: React.FC<{
  title: string;
  palette: Record<string, string>;
}> = ({title, palette}) => (
  <Box sx={{mb: 4}}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
      {Object.entries(palette)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([tone, color]) => (
          <Box
            key={tone}
            sx={{
              backgroundColor: color,
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 1,
              color: Number(tone) > 50 ? "#000" : "#fff",
              fontSize: "0.75rem",
              fontWeight: "bold",
            }}
          >
            {tone}
          </Box>
        ))}
    </Box>
  </Box>
);

export const ColorPalette: React.FC = () => {
  return (
    <Box sx={{p: 4}}>
      <Typography variant="h2" gutterBottom>
        Material Design 3 カラーパレット
      </Typography>

      <Box sx={{mb: 6}}>
        <Typography variant="h3" gutterBottom>
          ライトテーマ
        </Typography>
        <ColorSchemeDisplay
          title="カラースキーム"
          colors={materialColors.light}
        />
      </Box>

      <Box sx={{mb: 6}}>
        <Typography variant="h3" gutterBottom>
          ダークテーマ
        </Typography>
        <ColorSchemeDisplay
          title="カラースキーム"
          colors={materialColors.dark}
        />
      </Box>

      <Box sx={{mb: 6}}>
        <Typography variant="h3" gutterBottom>
          トーンパレット
        </Typography>
        {Object.entries(materialColors.palettes).map(([name, palette]) => (
          <TonalPaletteDisplay key={name} title={name} palette={palette} />
        ))}
      </Box>
    </Box>
  );
};
