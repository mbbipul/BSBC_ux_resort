real_accoms = [{"_id":"60d1bdde515304202c70711e","title":"Forest Villa","description":"Our exceptional forest villas are Paradise Island Resort’s ultimate accommodation.","singleRoom":20,"doubleRoom":5,"famillyRoom":5,"__v":0},{"_id":"60d1bfb7515304202c70711f","title":"Sunset beach Villa","description":"Our exceptional sunset villas are Paradise Island Resort’s ultimate accommodation.","singleRoom":25,"doubleRoom":10,"famillyRoom":5,"__v":0},{"_id":"60d1bfcc515304202c707120","title":"Water Vill","description":"Our exceptional water villas are Paradise Island Resort’s ultimate accommodation.","singleRoom":20,"doubleRoom":5,"famillyRoom":5,"__v":0}]
data = [{"_id":"60d1c0bf515304202c707123","status":"Pending","rooms":[{"_id":"60d1c0be515304202c707121","accommodation":"60d1bdde515304202c70711e","singleRoom":4,"doubleRoom":3,"famillyRoom":1,"__v":0},{"_id":"60d1c0be515304202c707122","accommodation":"60d1bfb7515304202c70711f","singleRoom":1,"doubleRoom":3,"famillyRoom":1,"__v":0}],"name":"Bipul Mandol","phone":"33444","email":"mbb@gmail.com","address":"Barishal","checkInTime":"1624307893002","checkOutTime":"1624471200000","__v":0},{"_id":"60d2c35f05c18b2fcc0b3b74","status":"Pending","rooms":[{"_id":"60d2c35f05c18b2fcc0b3b72","accommodation":"60d1bdde515304202c70711e","singleRoom":4,"doubleRoom":3,"famillyRoom":1,"__v":0},{"_id":"60d2c35f05c18b2fcc0b3b73","accommodation":"60d1bfb7515304202c70711f","singleRoom":1,"doubleRoom":3,"famillyRoom":1,"__v":0}],"name":"Bipul Mandol","phone":"33444","email":"mbb@gmail.com","address":"Barishal","checkInTime":"1624307893002","checkOutTime":"1624471200000","__v":0}]
rooms = data.map(({ rooms }) => rooms)

function flatten(arr)
{
	return arr.reduce((acc, cur) => acc.concat(Array.isArray(cur) ? flatten(cur) : cur), []);
};

roomIds = flatten(rooms)

accoommodations = roomIds.map(({accommodation}) => accommodation)
accoommodations = [...new Set(accoommodations)]



real_accoms.map((acc_real) => {
    res = roomIds.filter(({accommodation}) => accommodation === acc_real._id);

    accos = {
        singleRoom : res.reduce((acc,cur)=>acc+cur.singleRoom,0),
        doubleRoom : res.reduce((acc,cur)=>acc+cur.doubleRoom,0),
        famillyRoom : res.reduce((acc,cur)=>acc+cur.famillyRoom,0)
    };


    acc_real.singleRoom = acc_real.singleRoom - accos.singleRoom;
    acc_real.doubleRoom = acc_real.doubleRoom - accos.doubleRoom;
    acc_real.famillyRoom = acc_real.famillyRoom - accos.famillyRoom;

});

console.log(real_accoms)
