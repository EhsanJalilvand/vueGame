export function calculateGameScore(startTime,cardCount) {
            if (!startTime) return '';
            const now = new Date();
            const diff = Math.floor((now - startTime) / 1000); 
            return Math.floor((Math.pow(cardCount,3)/diff)*1000);
}
