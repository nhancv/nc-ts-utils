/*
 * MIT License
 *
 * Copyright (c) 2018 Nhan Cao
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import BotCommand from "./BotCommand";
import BotBase from "../BotBase";

export default class ChatIdCommand implements BotCommand {
  id: string;
  text: string;
  botBase: BotBase;

  constructor(id: string, text: string, bot: BotBase) {
    this.id = id;
    this.text = text;
    this.botBase = bot;
  }

  commandCallback = async (ctx) => {
    const fromId = String(ctx.message.from.id);
    if (!this.botBase.isAdmin(fromId)) return;
    this.botBase.command[fromId] = this.id;

    // Logic
    let chatId = ctx.message.chat.id;
    this.botBase.sendMessageToAdmin(chatId);
    this.botBase.resetCommand(fromId);
  };

  onBodyText = async (ctx, fromId) => {


    this.botBase.resetCommand(fromId);
  };

}
