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

    if (all[i] !== sum ) {
        console.error("resources didnt pair. EXIT");
        break;
    }
}
console.log("VERIFIED RESOURCES");

// now request a resource, verify if they can all be taken
mainEmgine();

function mainEmgine() {
    let completed = true; // flag to check if all processes are completed
    let deadlockDetected = false; // flag to check if deadlock has been detected
    let processesInDeadlock = []; // list of processes involved in deadlock
    while (completed && !deadlockDetected) {
        completed = false; // reset the flag
        for (let i = 0; i < processNames.length; i++) {
            let element = processNames[i];
            if (finished.includes(element)) continue; // skip processes that have already finished

            let takenResource = 0;
            console.log("process : " + element + " requesting : " + requests[element]);
            for (let j = 0; j < requests[element].length; j++) {
                if (requests[element][j] <= available[j]) {
                    takenResource++;
                }
            }

            // check if the process can be granted all of the resources it needs
            if (takenResource === requests[element].length) {
                console.log(`${element} finished successfully`);

                // adding back the values
                object[element].forEach((v, i) => {
                    available[i] += v;
                });
                console.log(`available resources are now ${available.toString()}`);
                finished.push(element);
                object[element] = [];
                requests[element] = [];

                // at least one process was marked as finished, so we need to continue looping
                completed = false;
            } else {
                // process was unable to be granted all its resources
                console.log(`${element} was unable to be granted all its resources`);

                // check if this process is involved in a deadlock
                if (processesInDeadlock.includes(element)) {
                    console.log(`deadlock detected involving ${element}`);
                    deadlockDetected = true;
                } else {
                    processesInDeadlock.push(element);
                    console.log(`delaying ${element}'s request until resources are available`);
                    completed = true;
                }
            }
        }
    }

    if (deadlockDetected) {
        console.log(`deadlock detected involving ${processesInDeadlock.toString()}`);
        // implement deadlock recovery mechanism here (e.g. rolling back the state of the system)
    } else {
        console.log(`only ${finished.toString()} are the only processes finished`)
    }
}



