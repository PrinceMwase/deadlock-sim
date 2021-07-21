let all = [2,4,1,4,4]
let available = [0,1,0,2,1]
let processNames = ["p1","p2","p3","p4"];
let finished = []; //array for completed resources
let object = {
    p1 : [0,1,1,1,2],
    p2 : [0,1,0,1,0],
    p3 : [0,0,0,0,1],
    p4 : [2,1,0,0,0]
}
let requests = {
    p1: [1,1,0,2,1],
    p2: [0,1,0,2,1],
    p3: [0,2,0,3,1],
    p4: [0,2,1,1,0]
};
let count = 2;

//verify the parity of the resources
for (let i = 0; i < all.length; i++) {
    const allvariable = all[i]; //getting the available number of resources
    const availableVariable = available[i];
    let sum = availableVariable;

    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            const objectElement = object[key];
           
            if(objectElement[i] !== undefined)
             sum += objectElement[i];
            
        }
    }

    
    console.log(`${i} + ${sum} `)

    if (all[i] !== sum ) {
        console.error("resources didnt pair. EXIT");
        break;
        
    }
   
    
}
console.log("VERIFIED RESOURCES");

// now request a resource, verify if they can all be taken
mainEmgine();

function mainEmgine() {
    processNames.forEach((element, index) => {

        

        let takenResource = 0;

        if (finished.toString().search(element) < 0)
            console.log("process : " + element + " requesting : " + requests[element]);
            requests[element].forEach((x, i) => {

                if (x <= available[i]) {
                    takenResource++;
                };
                //  check if its finished thenadd resources to the available array
                if (takenResource === 5) {
                    console.log(`${element} finished succeffully`);

                    //adding back the values
                    object[element].forEach((v, i) => {


                        available[i] += v;


                    });
                    console.log(`available resources are now ${available.toString()}`);
                    processNames[index].replace(element, 'complete');
                    finished.push(processNames[index]);
                             object[element] = [];
                    requests[element] = [];

                }
            });
    });
    if(count > 0 && finished.length < processNames. length){  
        
        count --;
        return mainEmgine();
    }else{
        console.log(`only ${finished.toString()} are the only processes finished`)
    }
}
