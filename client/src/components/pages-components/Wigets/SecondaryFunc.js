



  export let textEllipsis = (text, length)=>{

  let textAr = text;
 
  if(text.length>length) textAr = text.slice(0, length) + '...';
  
  return textAr;
  
}



export function scrollTop(){
  window.scrollTo({top:0, behavior: "smooth"});
}




export function setCookie(name, value, props) {


    props = props || {};
    value = JSON.stringify(value);
    var exp = props.expires;
    if (typeof exp == "number" && exp) {

        var d = new Date();
        d.setTime(d.getTime() + exp*1000);
        exp = props.expires = d;

    }

    if(exp && exp.toUTCString) { props.expires = exp.toUTCString() }

    
  
    var updatedCookie = name + "=" + value;

    for(var propName in props){
        updatedCookie += "; " + propName;
        var propValue = props[propName];
        if(propValue !== true){ updatedCookie += "=" + propValue }
    }


    document.cookie = updatedCookie;

}

export function deleteCookie(name) {
    setCookie(name, null, { expires: -1 })
}

export function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
   
    matches = matches ? matches : undefined;
    
    return matches?JSON.parse(matches[1]):undefined;
}


/* -----  Красивые числа ------*/

export var costRepl = (n)=>{
  var parts = n.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");   
    return parts.join(".");
}