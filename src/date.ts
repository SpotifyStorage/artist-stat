export class CustomDate extends Date {
    getNormalizedDate() {
        /** Puisque les statistiques d'un artiste au jour x sont publiés par spotify à partir de 20h00 (UTC) la journée meme,
         * cette est méthode est nécessaire pour mapper correctement la date des statistiques reçues et à ajouter à la table. */
        let normalizedDate: Date
    
        if (this.getHours() <= 20) {
            normalizedDate = new Date(this.valueOf() - 86400000)
        } else {
            normalizedDate = this
        }
    
        return `${normalizedDate.getFullYear()}-${normalizedDate.getMonth()+1}-${normalizedDate.getDate()}`
    }
}