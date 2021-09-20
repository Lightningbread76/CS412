const biggie = items => Math.max(...items);
console.log(`Biggest int is: ${biggie([4,8,1,4,3,9,2])}`)

//Write a function that takes a string as its input and returns a new string that contains all of the
// letters in the original string, but in reverse alphabetical order. Ignore punctuation and numbers.
// Duplicates are fine, so 'exioi' -> 'xoiie'. Test your function using the string
// ‘supercalifragilisticexpialidocious’.
function strToArr(word) {
    let newWord = "";
    for(let i = 0;i<word.length;i++){
        if(word[i].match(['A-Z']['a-z'])){
            newWord += word[i];
        }
    }
    return newWord.split("");
}


const zetaShuffle = word => {
    let lword = strToArr(word);
    {
        return lword.sort().reverse().join("");
    }
}
console.log(zetaShuffle("Ssupercalifragilisticexpialidocious"))
