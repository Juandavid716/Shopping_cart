export default function parsingPrice(number){
    return "$"+ Number(number.toFixed(2)).toLocaleString() + " ";
}