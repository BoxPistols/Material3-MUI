import {
    themeFromSourceColor,
    argbFromHex,
    hexFromArgb,
} from '@material/material-color-utilities';

const testColor = '#091449';
console.log(`\n=== Testing color: ${testColor} ===`);

try {
    const materialTheme = themeFromSourceColor(argbFromHex(testColor));
    console.log('Input color:', testColor);
    console.log('Primary tone 40 (light):', hexFromArgb(materialTheme.palettes.primary.tone(40)));
    console.log('Primary tone 80 (dark):', hexFromArgb(materialTheme.palettes.primary.tone(80)));
    console.log('Secondary tone 40:', hexFromArgb(materialTheme.palettes.secondary.tone(40)));
    console.log('Tertiary tone 40:', hexFromArgb(materialTheme.palettes.tertiary.tone(40)));
    
    // 他のトーンも確認
    console.log('\nPrimary palette tones:');
    for (let tone = 0; tone <= 100; tone += 10) {
        console.log(`Tone ${tone}:`, hexFromArgb(materialTheme.palettes.primary.tone(tone)));
    }
} catch (error) {
    console.error('Error:', error.message);
} 