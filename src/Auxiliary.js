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

export function parseSpeed(units) {
    switch (units) {
        case 'metric':
            return 'meters/sec';
        case 'imperial':
            return 'miles/hour';
        case 'standard':
            return 'meters/sec';
    }
}

export function convertUnix(utime) {
    return new Date(utime * 1000).toLocaleTimeString();
}

export function sunlightColorTransition(now) {

}