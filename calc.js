
//Prompt for Node.js

const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//This is for taking answer from cli

rl.question('Your operation here: ', function (opp) {

    //This is our operation object. This is for storing all needed values under a thing

    let oppObj = {

        //Where operations stored
        operation:{
            //"raw" is our operation string
            raw:opp,
            //"usable" is our operation array that we will use for solving them. It splits the operation string as operators, divisions, multiplations, etc.
            usable: 
            //For checking if there is invalid value
            "0123456789+-".indexOf(opp[0]) !== -1 ? (

                //For concating operations and operators as [operator,operation,operator,operation,...]
                concatOneByOne(
                    
                    //I take the array of values that are neither "+" nor "-"; I take the array of values that are either multiplation or division;
                    opp
                    .split(/[^(+\-\)]/)
                    .filter(val => val != ""),

                    //I take the array of values that are either "+" or "-"; I take the array of values that are neither multiplation nor division;
                    opp
                    .split(/[+\-\"]/)

                )

                //For removing "" strings in the array. Sometimes, they are there
                .filter(val => val != ""))

                //For turning multiplations and divisions into paranthesis operation;
                .map(
                    
                    //Because of, I used "Array.prototype.map()". I should check if I am on right value (array) 
                    val => val == "-" || val == "+" ?
                    
                    //If it is not array, I pass it
                    val : 
                    
                    //If it is, It means it is a paranthesis/multipliation/division operation. Therefore, I turn it to a paranthesis operation
                    concatOneByOne(
                        
                        val
                        .split(/[^(*\x\:\÷\/\)"]/)
                        .filter(val => val != ""),
                        
                        val
                        .split(/[*\x\:\÷\/\"]/)
                        .map(val => Number(val))
                        
                    )
                    
                )
                
                : 
                
                "Please, enter a valid value..."
        },

        //Memory for operations. For holding the total value
        memory:{
            //Memory for division/multiplation operations. 
            //It holds the total of serial multiplation/division processings. 
            //It is reset per a paranthesis operation
            dm:1,

            //Memory for addition/subtraction operation
            //It holds the total of every operation
            //It never resets till the end of the operation
            pm:0
        },

        //For showing the final total
        total:0
    };

    //I used "realOpp" for "oppObj.operation.usable" for making coding process faster for me
    let realOpp = oppObj.operation.usable;

    //I check if the first value is not a minus one. If it is, this does anything but, If it isn't ,this adds a "+" to start of the array for making the process easier
    realOpp[0] == "-" || realOpp[0] == "+" ? true : realOpp.unshift("+")

    //Paranthesis solver "for" loop
    for(let i = 0;i<realOpp.length;i+=2){

        if(realOpp[i] == "+"){

            //If there is not paranthesis, this adds the num directly
            if(realOpp[i+1].length <= 1){

                oppObj.memory.pm += realOpp[i+1][0];

            }

            //If there is a paranthesis, this solves the paranthesis first and adds it to addition/subtraction operation memory (oppObj.memory.pm)
            else{

                //Equalizng first element of array to division/multiplation operations memory (oppObj.memory.dm)
                //It is for making the operations easier and less complicated
                oppObj.memory.dm = realOpp[i+1][0];

                //"for...in" loop for paranthesis
                //I used "for...in" because, I make the operations with index numbers
                for(let ii in realOpp[i+1]){

                    //I check the operation here. If it is a division or multiplation
                    //Every operation is applied to division/multiplation operations memory (oppObj.memory.dm)
                    switch(realOpp[i+1][ii]){

                        //For multiplation
                        case "*":
                        case "x":{

                            oppObj.memory.dm *= realOpp[i+1][Number(ii)+1];
                            break;

                        };

                        //For division
                        case "/":
                        case ":":
                        case "÷":{

                            oppObj.memory.dm /= realOpp[i+1][Number(ii)+1];
                            break;

                        };

                    };

                    
                    
                };

                //Adds total value of paranthesis to addition/subtraction operation memory (oppObj.memory.pm)
                oppObj.memory.pm += oppObj.memory.dm;

            };

        };

        //Subtraction is same with addition, too. However, except the addition operations, there are subtraction operations
        if(realOpp[i] == "-"){

            if(realOpp[i+1].length <= 1){

                oppObj.memory.pm -= realOpp[i+1][0];

            }
            else{

                oppObj.memory.dm = realOpp[i+1][0];

                for(let ii in realOpp[i+1]){

                    switch(realOpp[i+1][ii]){

                        case "*":
                        case "x":{

                            oppObj.memory.dm *= realOpp[i+1][Number(ii)+1];
                            // oppObj.test.push([ii,realOpp[i+1][Number(ii)+1]]);
                            break;

                        };

                        case "/":
                        case ":":
                        case "÷":{

                            oppObj.memory.dm /= realOpp[i+1][Number(ii)+1];
                            // oppObj.test.push([ii+1,realOpp[i+1][ii+1]]);
                            break;

                        };

                    };

                    
                    
                };

                oppObj.memory.pm -= oppObj.memory.dm;

            };

        };

        //I add every final addition/subtraction operation memory (oppObj.memory.pm) value to operation total before reset
        oppObj.total += oppObj.memory.pm;

        //I reset the memory for a new operation
        oppObj.memory.pm = 0;
    };

    //When the operation finishes, I print it out on console
    console.log(oppObj.total);
    
    //This closes cli for new entries
    rl.close();
});

//I used this function for concating various arrays into an operation array

//This concates arrays in [a,b,a,b,a,b,...] order except what clasic concat function does ([a,a,a,b,b,b,...])
const concatOneByOne = (arr1,arr2) => {

    let returnArr = [];
    for(let i = 0;i<arr1.length+arr2.length;i++) i % 2 == 0 ? returnArr[i] = arr2[parseInt(i/2)] : returnArr[i] = arr1[parseInt(i/2)];
    return returnArr;

};