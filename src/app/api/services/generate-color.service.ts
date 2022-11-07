export class GenColorService{
    reminder = ['0', '0', '0', '0', '0', '0'];

    changeBase(x: number, base: number) {
        for (let index = 0; x > 0; index++) {
            let r = Math.floor(x % base);
            x = Math.floor(x / base);

            switch (r) {
                case 15:
                    this.reminder[index] = 'f';
                    break;
                case 14:
                    this.reminder[index] = 'e';
                    break;
                case 13:
                    this.reminder[index] = 'd';
                    break;
                case 12:
                    this.reminder[index] = 'c';
                    break;
                case 11:
                    this.reminder[index] = 'b';
                    break;
                case 10:
                    this.reminder[index] = 'a';
                    break;
                default:
                    this.reminder[index] = r.toString();
                    break;
            }
        }
    }

    displayColorCode(): string {
        let length = this.reminder.length
        let color = '#'
        while (length > 0) {
            color = color + this.reminder[--length];
        }
        this.reminder = ['0', '0', '0', '0', '0', '0'];
        
        return color;
    }
}