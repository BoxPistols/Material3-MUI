import React from "react";
import {Box, Button, Typography, Grid, Paper} from "@mui/material";

export const ButtonsShowcase: React.FC = () => {
  const variants = ["elevated", "filled", "tonal", "outlined", "text"] as const;

  return (
    <Box sx={{p: 4}}>
      <Typography variant="h2" gutterBottom>
        Material Design 3 ボタン
      </Typography>

      <Grid container spacing={4}>
        {variants.map((variant) => (
          <Grid>
            <Paper
              elevation={1}
              sx={{
                p: 3,
                borderRadius: 2,
                height: "100%",
              }}
            >
              <Typography variant="h5" gutterBottom>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}
              </Typography>

              <Box sx={{display: "flex", gap: 2, flexWrap: "wrap", mb: 2}}>
                <Button variant={variant}>デフォルト</Button>
                <Button variant={variant} disabled>
                  無効
                </Button>
              </Box>

              <Box sx={{display: "flex", gap: 2, flexWrap: "wrap"}}>
                <Button variant={variant} size="small">
                  小
                </Button>
                <Button variant={variant} size="medium">
                  中
                </Button>
                <Button variant={variant} size="large">
                  大
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
