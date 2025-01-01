import { createReadStream, createWriteStream, unlink } from "fs";
import { MyContext } from "../shared/types";
import language from "../utils/language";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";
import { InputFile } from "grammy";

export const ytDlpPath = path.resolve('C:/Projects/Telegram/telegram-downloader/utils/libraries-exe/yt-dlp.exe');
export const ffmpegPath = path.resolve('C:/Projects/Telegram/telegram-downloader/utils/libraries-exe/FFmpeg/bin/ffmpeg.exe')
export const instaloaderPath = path.resolve('C:/Projects/Telegram/telegram-downloader/utils/libraries-exe/instaloader.exe')
export const execPromise = promisify(exec)

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
        const titleName = (new Date()).toISOString().replace(/:/g, '-')
        const command = `"${ytDlpPath}" --ffmpeg-location "${ffmpegPath}" --merge-output-format mp4 -f "bestvideo[height<=1080]+bestaudio/best[height<=1080]" --max-filesize 50M -S "vcodec:avc,res,acodec:aac" -preset fast -crf 23 -o "./uploads/${titleName}-${ctx.from?.id}" ${href}`
        const loading_message = await ctx.reply(language()[ctx.session.language].video_loading_message, { parse_mode: 'HTML' })
        const { stdout, stderr } = await execPromise(command)
        const videoPath = path.resolve(`./uploads/${titleName}-${ctx.from?.id}.mp4`)
        const videoStream = createReadStream(videoPath);
        if (stderr) {
            console.log(`err: ${stderr}`)
        } else {
            console.log(`output: ${stdout}`)
        }
        await ctx.replyWithVideo(new InputFile(videoStream), { caption: language()[ctx.session.language].success_loading_message, parse_mode: 'HTML' })
        ctx.api.deleteMessage(loading_message.chat.id, loading_message.message_id)
        setTimeout(() => {
            unlink(videoPath, (err) => {
                if (err) {
                    console.log('Ошибка при удалении файла:', err);
                } else {
                    console.log('Файл удалён.');
                }
            });
        }, 30000);
    } catch (err) {
        console.log('Ошибка при скачивании или отправке видео:', err);
        ctx.reply(language()[ctx.session.language].youtube_error_message, { parse_mode: 'HTML' });
    }
}

export async function instagram_downloader(ctx: MyContext, href: string) {
    try {
        const titleName = (new Date()).toISOString().replace(/:/g, '-')
        const command = `"${ytDlpPath}" --ffmpeg-location "${ffmpegPath}" --merge-output-format mp4 -f best -S "vcodec:avc,res,acodec:aac" --max-filesize 50M -o "./uploads/${titleName}-${ctx.from?.id}.mp4" ${href}`;
        const loading_message = await ctx.reply(language()[ctx.session.language].video_loading_message, { parse_mode: 'HTML' })
        const { stdout, stderr } = await execPromise(command)
        const videoPath = path.resolve(`./uploads/${titleName}-${ctx.from?.id}.mp4`)
        const videoStream = createReadStream(videoPath);
        if (stderr) {
            console.log(`err: ${stderr}`)
        } else {
            console.log(`output: ${stdout}`)
        }
        await ctx.replyWithVideo(new InputFile(videoStream), { caption: language()[ctx.session.language].success_loading_message, parse_mode: 'HTML' })
        ctx.api.deleteMessage(loading_message.chat.id, loading_message.message_id)
        setTimeout(() => {
            unlink(videoPath, (err) => {
                if (err) {
                    console.log('Ошибка при удалении файла:', err);
                } else {
                    console.log('Файл удалён.');
                }
            });
        }, 30000);
    } catch (err) {
        console.log('Ошибка при скачивании или отправке видео:', err);
        ctx.reply(language()[ctx.session.language].video_size_error_message, { parse_mode: 'HTML' });
    }
}

export function to_mp3_downloader(ctx: MyContext, href: string) {
    try {
        
    } catch (err) {
        console.log('Ошибка при скачивании или отправке видео:', err);
        ctx.reply(language()[ctx.session.language].video_size_error_message, { parse_mode: 'HTML' });
    }
}