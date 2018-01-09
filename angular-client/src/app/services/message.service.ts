import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages: string[] = [];

  constructor() { }

  /**
 * Add message to the cache
 * @param {string} message 
 * @memberof MessageService
 */
  add(message: string) {
    this.messages.push(message);
  }

  /**
   * Clear messages from the cache
   * @memberof MessageService
   */
  clear() {
    this.messages = [];
  }

}
