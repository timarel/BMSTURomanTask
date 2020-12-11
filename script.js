var romeNum = { I : 1, V : 5, X : 10, L : 50, C : 100, D : 500, M : 1000 }
var arabNum = { 
    1 : "I",
    4 : "VI",
    5 : "V",
    9 : "XI", 
    10 : "X",
    40 : "LX", 
    50 : "L",
    90 : "CX", 
    100 : "C",
    400 : "DC", 
    500 : "D",
    900 : "MC", 
    1000 : "M" 
}
document.getElementById("but1").onclick = function(e) {
    e.preventDefault();
    let nums = document.getElementById("nums").value;
    let req = document.getElementById("req");
    let arr = trans_toArab(nums);
    answer = arr[0]+arr[1];
    req.value = trans_toRome(answer);
}
document.getElementById("but2").onclick = function(e) {
    e.preventDefault();
    let nums = document.getElementById("nums").value;
    let req = document.getElementById("req");
    let arr = trans_toArab(nums);
    answer = arr[0]-arr[1];
    req.value = trans_toRome(answer);
}
document.getElementById("but3").onclick = function(e) {
    e.preventDefault();
    let nums = document.getElementById("nums").value;
    let req = document.getElementById("req");
    let arr = trans_toArab(nums);
    if(arr[1]==0) { arr[1] = 1 }
    answer = arr[0]*arr[1];
    req.value = trans_toRome(answer);
}
document.getElementById("but4").onclick = function(e) {
    e.preventDefault();
    let nums = document.getElementById("nums").value;
    let req = document.getElementById("req");
    let arr = trans_toArab(nums);
    if(arr[1]==0) { arr[1] = 1 }
    answer = arr[0]/arr[1];
    req.value = trans_toRome(answer);
}

function trans_toArab(str) {
    str += " ";
    let Num1 = 0;
    let Num2 = 0;
    let j = 0;
    let arr = new Array();
    let reg1 = /\p{Alpha}/gu;
    let reg2 = /\p{Nd}/gu;
    str = str.toUpperCase();
    for(i=0;i<str.length;i++) {
        let prop1 = str[i].match(reg1);
        let prop2 = str[i].match(reg2);
        if(prop1) {
            let a = str[i];
            let b = str[i+1];
            if(romeNum[a]<romeNum[b]){
                Num1 += romeNum[b] - romeNum[a];
                i++;
            } else {
                Num1 += romeNum[a];
            }    
        } else if(prop2) {
                if(Num2!=0) { Num2 = Num2*10 + str[i]/1 }
                else { Num2 += str[i]/1 }
        } else {
            if(Num1!=0) { 
                arr[j] = Num1; 
                Num1 = 0; 
                j++ 
            }
            if(Num2!=0) { 
                arr[j] = Num2; 
                Num2 = 0; 
                j++ 
            }
        }
    }   
    return arr;
}

function trans_toRome(num) {
    let k = 1;
    var str = "";
    while (num>=1) { 

        i = num % 10;
        j = i*k;
        a = j/(4*k);
        b = j/(9*k);
        c = j-(5*k);
        if(a==1) { str += arabNum[j] }
        else if(b==1) { str += arabNum[j] }
        else if(c>=0) { 
            i = i - 5;
            for(i;i>0;i--){
                str += arabNum[k];
            }
            str += arabNum[5*k];
        } else {
            for(i;i>0;i--){
                str += arabNum[k];
            }
        }
        k = k*10;
        num = Math.trunc(num/10);
    } 

    return str.split("").reverse().join("")
}



