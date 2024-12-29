import ytdl from "ytdl-core";
import { MyContext } from "../shared/types";
import language from "../utils/language";
import fs from 'fs'
import path from "path";
import { InputFile } from "grammy";


export function start(ctx: MyContext) {
    ctx.reply(language(ctx.chat?.username)[ctx.session.language].start_message, { parse_mode: 'HTML' });
}

export function selected_language(ctx: MyContext, chatId: number, messageId: number) {
    ctx.api.deleteMessage(chatId, messageId)
}

export function help_command(ctx: MyContext) {
    ctx.reply(language()[ctx.session.language].help_command_message)
}

export async function youtube_downloader(ctx: MyContext, href: string): Promise<void> {
    try {
        const videoStream = ytdl(href);
        const videoFile = new InputFile(videoStream);
        await ctx.replyWithVideo(videoFile);
    } catch (err) {
        console.log('Ошибка при скачивании или отправке видео:', err);
        ctx.reply(language()[ctx.session.language].youtube_error_message, { parse_mode: 'HTML' });
    }
}

export function instagram_downloader(href: string) {}

export function to_mp3_downloader() {}