function sortWorkshopsByDateAndTime(workshopList) {
    workshopList.sort(function (w1, w2) {
        if (w1.fecha === w2.fecha) {
            if (w1.hora_inicio === w2.hora_inicio) {
                let timeFinal1 = new Date();
                timeFinal1.setHours(extractHourFromTimeString(w1.hora_fin), extractMinutesFromTimeString(w1.hora_fin), 0, 0);
                let timeFinal2 = new Date();
                timeFinal2.setHours(extractHourFromTimeString(w2.hora_fin), extractMinutesFromTimeString(w2.hora_fin), 0, 0);
                return Math.abs(timeFinal1) - Math.abs(timeFinal2);
            }
            let timeInitial1 = new Date();
            timeInitial1.setHours(extractHourFromTimeString(w1.hora_inicio), extractMinutesFromTimeString(w1.hora_inicio), 0, 0);
            let timeInitial2 = new Date();
            timeInitial2.setHours(extractHourFromTimeString(w2.hora_inicio), extractMinutesFromTimeString(w2.hora_inicio), 0, 0);
            return Math.abs(timeInitial1) - Math.abs(timeInitial2);
        }
        let date1 = new Date().setHours(0, 0, 0, 0) - new Date(w1.fecha);
        let date2 = new Date().setHours(0, 0, 0, 0) - new Date(w2.fecha);
        return Math.abs(date1) - Math.abs(date2);
    });
    return workshopList;
}

function extractHourFromTimeString(time) {
    return parseInt(time.split(":")[0]);
}

function extractMinutesFromTimeString(time) {
    return parseInt(time.split(":")[1]);
}

export { sortWorkshopsByDateAndTime };