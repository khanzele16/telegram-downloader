import { Bot, session } from 'grammy';
import dotenv from 'dotenv';
import language from './utils/language';
import keyboards from './utils/keyboards';
import { MyContext, SessionData } from './shared/types';
import { instagram_downloader, selected_language, start, youtube_downloader } from './controller/main';
import subscriptionChecker from './middlewares/subscriptionChecker';
import hrefChecker from './middlewares/hrefChecker';

dotenv.config();

const bot = new Bot<MyContext>(process.env.BOT_TOKEN!);

bot.use(session<SessionData, MyContext>({ initial: () => ({ language: 'eng', start_selected: false }) }));

bot.command('start', async (ctx) => {
    if (!ctx.session.start_selected) {
        await ctx.reply(language()[ctx.session.language].select_language_message, { parse_mode: 'HTML', reply_markup: keyboards('select_language') });
    } else {
        start(ctx)
    }
});

bot.command('audio', async (ctx) => {
    const href = ctx.message?.text.split(' ')[1]
    if (href) {
        switch (hrefChecker(ctx, href)) {
            case 'Youtube':
                youtube_downloader(ctx, href)
                break
            case 'Instagram':
                instagram_downloader(ctx, href)
                break
        }
    } else {
        ctx.reply(language()[ctx.session.language].command_error_message, { parse_mode: 'HTML' })
    }
})

bot.command('set_language', async (ctx) => {
    if (ctx.message?.text.split(' ')[1]) {
        if ((ctx.message?.text.split(' ')[1] == 'rus') || (ctx.message?.text.split(' ')[1] == 'ru')) {
            ctx.session.language = 'rus'
            ctx.session.start_selected = true
            
        } else if ((ctx.message?.text.split(' ')[1] == 'eng') || (ctx.message?.text.split(' ')[1] == 'en')) {
            ctx.session.language = 'eng'
            ctx.session.start_selected = true
        } else {
            ctx.reply(language()[ctx.session.language].command_error_message, { parse_mode: 'HTML' })
        }
    } else {
        await ctx.reply(language()[ctx.session.language].select_language_message, { parse_mode: 'HTML', reply_markup: keyboards('select_language') });
    }
})

bot.command('help', async (ctx) => {
    ctx.reply(language()[ctx.session.language].help_command_message, { parse_mode: 'HTML' })
})

bot.on(['message::url', 'message::text_link'], subscriptionChecker, (ctx) => {
    try {
    const href = ctx.message?.text
    if (href) {
        switch (hrefChecker(ctx, href)) {
            case 'Youtube':
                youtube_downloader(ctx, href)
                break
            case 'Instagram':
                instagram_downloader(ctx, href)
                break
        }
    }
    } catch (err) {
        console.log(err)
    }
});

bot.on('message', (ctx) => {
    ctx.reply(language()[ctx.session.language].message_handler, { parse_mode: 'HTML' })
})

bot.on('callback_query', async (ctx) => {
    const message = ctx.callbackQuery.message;
    if (message?.chat.id && message?.message_id) {
        selected_language(ctx, message.chat.id, message.message_id);
        ctx.session.start_selected = true;
        ctx.session.language = ctx.callbackQuery.data == 'rus' ? 'rus' : 'eng';
        start(ctx)
    } else {
        console.log('Ошибка: Невозможно получить chatId или messageId');
    }
})

bot.callbackQuery("rus", async (ctx) => {
    await ctx.answerCallbackQuery({
        text: language().rus.set_language,
    });
    ctx.session.start_selected = true;
    ctx.session.language = 'rus';
});

bot.callbackQuery("eng", async (ctx) => {
    await ctx.answerCallbackQuery({
        text: language().eng.set_language,
    });
    ctx.session.start_selected = true;
    ctx.session.language = 'eng';
});

bot.start();