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
    switch (now) {
        case 0:
        case 1:
        case 2:
            return '#1e2b58';

        case 3:
        case 4:
        case 5:
            return '#213166';

        case 6:
        case 7:
        case 8:
            return '#fffcb1';

        case 9:
        case 10:
        case 11:
            return '#f2e198';

        case 12:
        case 13:
        case 14:
            return '#e7cb23';

        case 15:
        case 16:
        case 17:
            return '#ffcb2a';

        case 18:
        case 19:
        case 20:
            return '#e7a165';

        case 21:
        case 22:
        case 23:
            return '#513869';
    }
}