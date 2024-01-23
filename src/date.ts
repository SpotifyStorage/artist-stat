export class CustomDate extends Date {
    getNormalizedDate() {
        /** Puisque les statistiques d'un artiste au jour x sont publiés par spotify à partir de 20h00 (UTC) la journée meme,
         * cette est méthode est nécessaire pour mapper correctement la date des statistiques reçues et à ajouter à la table. */
        let normalizedDate: CustomDate
    
        if (this.getHours() <= 20) {
            normalizedDate = new CustomDate(this.valueOf() - 86400000)
        } else {
            normalizedDate = this
        }
    
        return `${normalizedDate.getFullYear()}-${normalizedDate.toStringMonth()}-${normalizedDate.toStringDate()}`
    }

    toStringMonth() {
        const month = this.getMonth() + 1
        if (month < 10) {
            return `0${month}`
        }
        return month.toString()
    }

    toStringDate() {
        const date = this.getDate()
        if (date < 10) {
            return `0${date}`
        }
        return date.toString()
    }
}