import { Context, SessionFlavor } from "grammy";

export interface SessionData {
    language: 'eng' | 'rus';
    start_selected: boolean;
}

export type MyContext = Context & SessionFlavor<SessionData>;