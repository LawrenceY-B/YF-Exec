import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StateStorageService {

  constructor() { }

  getPreviousState() {
    return JSON.parse(localStorage.getItem("previousState") || "") || null;
  }

  resetPreviousState() {
    localStorage.clear()
  }

  storePreviousState(previousStateName: any, previousStateParams: any) {
    const previousState = {
      name: previousStateName,
      params: previousStateParams
    };

    localStorage.setItem("previousState", JSON.stringify(previousState));
  }

  getDestinationState() {
    return JSON.parse(localStorage.getItem("destinationState") || "") || null;
  }

  storeUrl(url: string) {
    localStorage.setItem("previousUrl", url);

  }

  getUrl() {
    return localStorage.getItem("previousUrl");
  }

  clearUrl(){
    localStorage.removeItem("previousUrl");
  }

  storeDestinationState(destinationState: any, destinationStateParams: any, fromState: any) {
    const destinationInfo = {
      destination: {
        name: destinationState.name,
        data: destinationState.data
      },
      params: destinationStateParams,
      from: {
        name: fromState.name
      }
    };

    localStorage.setItem("destinationState", JSON.stringify(destinationInfo));
  }

  store<T>(key : string, value : T){
    localStorage.setItem(key, JSON.stringify(value));
  }


  get<T>(key : string){
    return JSON.parse(localStorage.getItem(key) || "")  as T;
  }

  keyExist(key : string){
      return localStorage.getItem(key) ? true : false;
  }
}
