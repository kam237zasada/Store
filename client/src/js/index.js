export function setCookie(cookieName, cookieValue, expireHours) {
    let d = new Date();
    d.setTime(d.getTime() + (expireHours * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }
  
  export function deleteCookie(cookieName) {
      let d = new Date();
        d.setTime(d.getTime() + 1);
      let expires = "expires="+d.toUTCString();
      document.cookie = cookieName + "=" + " " + ";" + expires + ";path=/";
  }
  
  export function getCookie(cookieName) {
      let name = cookieName + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    export function getDate(date) {
        return `${date.getFullYear()}-${lz((date.getMonth()+1))}-${lz(date.getDate())}`
      }
      
      function lz(number) {
            return `${number}`.padStart(2, "0");
      }

      export function changeNumber(price) {
        let string = price.toString();
        if (string.indexOf(".") == -1) { string = `${string}.00`; }
        if (string.charAt(string.length-1) == ".") { string = `${string}00`; }
        if (string.charAt(string.length-2) == ".") { string = `${string}0`; }
        return string
    };