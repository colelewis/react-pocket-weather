export function parseUnits(units) {
    switch (units) {
        case 'metric':
            return '\u2103';
        case 'imperial':
            return '\u2109';
        case 'standard':
            return '\u212A';
    }
}