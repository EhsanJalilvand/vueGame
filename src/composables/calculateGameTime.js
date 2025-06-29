export function calculateGameTime(startTime) {
            if (!startTime) return '';
            const now = new Date();
            const diff = Math.floor((now - startTime) / 1000); 
            const minutes = Math.floor(diff / 60);
            const seconds = diff % 60;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
