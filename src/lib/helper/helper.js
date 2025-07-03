"use client"
import Cookies from "js-cookie";

function toPersianNumbers(str) {  
    return str.replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);  
} 


function setCookie(name, value, days) {  
    Cookies.set(name, value, { expires: days });  
}  

function getCookie(name) {  
    return Cookies.get(name) || '';  
}   


export { toPersianNumbers, setCookie, getCookie };

 