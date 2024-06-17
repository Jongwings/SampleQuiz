function GetMatchCount(correct, wrong) {
    var count = 0;
    for(var i = 0; i < correct.length; i++) {
        if(correct[i] === wrong[i]) {
            count++;
        }
    }
    return count;
}

function GetWrongArrayIndexMatchCase(correct, wrong) {
    var padding=0;
    var isCorrectBigger = correct.length >= wrong.length;
    if(isCorrectBigger) {
        padding = correct.length;
    }else{
        padding = wrong.length;
    }
    var wrongWorld = " ".repeat(padding) + wrong;
    var MatchCount = 0;
    var paddedWrong = "";
    diff=[];
    for(var i = 0; i < wrong.length+padding; i++) {
        var M = GetMatchCount(correct, wrongWorld);
        if(MatchCount<M) {
            MatchCount = M;
            paddedWrong = wrongWorld;
        }
        wrongWorld=wrongWorld.substring(1,wrongWorld.length)+" ";
    }
    console.log("word: |"+ paddedWrong+"|"+correct+"|");
    var startAjestment = 0;
    if(!isCorrectBigger){
        console.log("wrong: |"+ wrong+"|"+correct+"|");
        var machPart = paddedWrong.substring(0,correct.length);
        var extraWrong = wrong.split(machPart);
        startAjestment = extraWrong[0].length;
        endAjestment = startAjestment + correct.length;
        for(var i = 0; i < startAjestment; i++) {
            diff.push(i);
        }
        for(var i = endAjestment; i < wrong.length; i++) {
            diff.push(i);
        }
    }
    for(var i = 0; i < paddedWrong.length; i++) {
        console.log("|"+correct[i]+"|"+paddedWrong[i]+"|");
        if(correct[i] === undefined && paddedWrong[i] === " ") {}
        else if(paddedWrong[i] === " ") {
            diff.push(i+startAjestment);
        }
        else if(correct[i] !== paddedWrong[i]) {
            diff.push(i+startAjestment);
        }
    }
    return diff;
}

function GetWrongArrayIndex(correct, wrong){
    var bestMatch = 0;
    var insertAtIndex = 0;
    for(var insertAt = 0; insertAt <= correct.length; insertAt++) {
        var wrongWorld = wrong;
        if(correct.length > wrong.length) {
            wrongWorld = wrong.substring(0,insertAt) + " ".repeat(correct.length-wrong.length) +wrong.substring(insertAt,wrong.length);
        }
        var MatchCount = GetMatchCount(correct, wrongWorld);
        if(MatchCount > bestMatch) {
            insertAtIndex = insertAt;
            bestMatch = MatchCount;
        }
    }
    diff=[];
    if(correct.length > wrong.length){
        //console.log("word: |"+ insertAtIndex.toString()+"|"+correct.length-wrong.length.toString()+"|"+wrong.length.toString()+"|");
        wrong = wrong.substring(0,insertAtIndex) + " ".repeat(correct.length-wrong.length) + wrong.substring(insertAtIndex,wrong.length);
    }
    //console.log("Final: |"+ correct+"|"+wrong+"|");
    var i = 0;
    for(; i < correct.length; i++) {
        if(correct[i] !== wrong[i]) {
            diff.push(i);
        }
    }
    for(; i < wrong.length; i++) {
        diff.push(i);
    }
    return diff;
}