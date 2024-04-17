import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketConnectionService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    // Inicialize o socket com uma string vazia, pois você definirá a URL mais tarde
    this.socket$ = webSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');
  }

  getData(coins: string[]) {
    // Construa a URL com base nas moedas fornecidas
    console.log(coins)
    const url = `wss://ws.coincap.io/prices?assets=${coins.join(',')}`;
    // Atualize a URL do socket
    this.socket$.next(url);
    return this.socket$;
  }

  unsubscribe() {
    this.socket$.unsubscribe();
  }
}
