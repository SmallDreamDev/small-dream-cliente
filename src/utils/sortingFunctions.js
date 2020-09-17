function sortWorkshopsByDate(workshopList) {
    workshopList.sort(function (w1, w2) {
        return Math.abs(Date.now() - new Date(w1.fecha)) - Math.abs(Date.now() - new Date(w2.fecha));
    });
    return workshopList;
}

export { sortWorkshopsByDate };