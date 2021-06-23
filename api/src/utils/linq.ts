const groupBy = <T, K extends keyof any> (list: T[], getKey: (item: T) => K) =>
                    list.reduce((previous, currentItem) => {
                        const group = getKey(currentItem);
                        if (!previous[group]) 
                            previous[group] = [];
                        previous[group].push(currentItem);
                        return previous;
                    }, {} as Record<K, T[]>);

const checkDateInRange = (from : string,to : string,check : string) : boolean => {
    const D_1 = from.split("/");
    const D_2 = to.split("/");
    const D_3 = check.split("/");
      
    var d1 = new Date(parseInt(D_1[2]), parseInt(D_1[0])-1, parseInt(D_1[1])+1);
    var d2 = new Date(parseInt(D_2[2]), parseInt(D_2[0])-1 , parseInt(D_2[1])+1);
    var d3 = new Date(parseInt(D_3[2]), parseInt(D_3[0])-1 , parseInt(D_3[1])+1);
    // console.log({
    //     d1,d2,d3
    // });
    // console.log({
    //     from,to ,check
    // })
    if (d3 >= d1 && d3 <= d2) {
        // console.log(true);
        return true;
    } 
    // console.log(false);

    return false;
                   
}      

const getDateShortString = (date : string) : string =>  new Date(parseInt(date)).toLocaleString().split(',')[0];

const flattArr =  (arr : any[]) : [] => arr.reduce((acc : any, cur : []) => acc.concat(Array.isArray(cur) ? flattArr(cur) : cur), [])


export { groupBy,getDateShortString,checkDateInRange,flattArr };

