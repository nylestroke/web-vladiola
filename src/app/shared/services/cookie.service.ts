import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CookieService {
  setCookie(name: string, value: string, daysToLive: number) {
    let cookie = name + '=' + encodeURIComponent(value);
    cookie += '; path=/; max-age=' + daysToLive * 24 * 60 * 60;
    document.cookie = cookie;
  }

  setSessionCookie(name: string, value: string) {
    document.cookie = name + '=' + encodeURIComponent(value) + '; path=/;';
  }

  getCookie(name: string) {
    const cookieArr = document.cookie.split(';');
    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split('=');
      if (name == cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
    return null;
  }

  deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; max-age=0`;
  }
}
