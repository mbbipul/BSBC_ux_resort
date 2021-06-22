const groupBy = <T, K extends keyof any> (list: T[], getKey: (item: T) => K) =>
                    list.reduce((previous, currentItem) => {
                        const group = getKey(currentItem);
                        if (!previous[group]) 
                            previous[group] = [];
                        previous[group].push(currentItem);
                        return previous;
                    }, {} as Record<K, T[]>);

const checkDateInRange = (from : string,to : string,check : string) : boolean => {
    var fDate,lDate,cDate;
    fDate = Date.parse(from);
    lDate = Date.parse(to);
    cDate = Date.parse(check);

    if((cDate <= lDate && cDate >= fDate)) {
        return true;
    }
    return false;
                   
}      

const getDateShortString = (date : string) : string =>  new Date(parseInt(date)).toLocaleString().split(',')[0];

export { groupBy,getDateShortString,checkDateInRange };

