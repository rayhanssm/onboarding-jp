const setCookie = (cname: string, cvalue: any, expiredMinutes: number) => {
  const d = new Date();
  d.setTime(d.getTime() + (expiredMinutes*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue.toString() + ";" + expires + ";path=/";
}

const getCookie = (cname: string) => {
  let name = cname + "=";
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

const deleteCookie = (uname: string, tname: string) => {
  document.cookie = `${uname}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
  document.cookie = `${tname}= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
}

export {
    setCookie, getCookie, deleteCookie
}