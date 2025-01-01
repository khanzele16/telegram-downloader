interface LanguageData {
    rus: {
        start_message: string;
        set_language: string;
        error_subscription_message: string;
        error_message_handler: string;
        select_language_message: string;
        middleware_subscription_error_message: string;
        middleware_subscription_not_message: string;
        middleware_href_error_message: string;
        youtube_error_message: string;
        command_error_message: string;
        help_command_message: string;
        video_loading_message: string;
        video_size_error_message: string;
        success_loading_message: string;
        message_handler: string;
    };
    eng: {
        start_message: string;
        set_language: string;
        error_subscription_message: string;
        error_message_handler: string;
        select_language_message: string;
        middleware_subscription_error_message: string;
        middleware_subscription_not_message: string;
        middleware_href_error_message: string;
        youtube_error_message: string;
        command_error_message: string;
        help_command_message: string;
        video_loading_message: string;
        video_size_error_message: string;
        success_loading_message: string;
        message_handler: string;
    };
}

export default (name?: string): LanguageData => {
    return {
        rus: {
            start_message: `<b>Привет, @${name}!</b> Я — твой помощник для скачивания видео и аудио. Вот, что я умею:

🎬 Скачиваю видео с YouTube.
🎧 Конвертирую YouTube-видео в MP3, чтобы ты мог наслаждаться только аудио.
📸 Скачиваю видео с Instagram (публикации и сторис)
        
<b>Как использовать:</b>

1. Отправь мне ссылку на видео с YouTube или Instagram.
2. Я подскажу, если нужно выбрать формат.
3. Получишь файл прямо в чат.

<b>Приятного скачивания!</b> 🎥`,
            set_language: 'Русский язык установлен!',
            error_subscription_message: 'Вы не подписаны на канал, перейдите и подпишитесь, чтобы использовать бота.',
            error_message_handler: 'Произошла ошибка. <b>Попробуйте снова!</b>',
            select_language_message: 'Выберите язык:',
            middleware_subscription_error_message: 'Не удалось проверить подписаны ли вы на канал. <b>Попробуйте позже!</b>',
            middleware_subscription_not_message: '<b>Вы не подписаны на канал @khanzele_dev.</b> Подпишитесь и попробуйте снова.',
            middleware_href_error_message: 'Проверьте корректность ссылки и <b>попробуйте снова</b>',
            youtube_error_message: 'Не удалось установить видео. <b>Попробовать снова</b>',
            command_error_message: 'Не удалось выполнить команду. <b>Чтобы узнать какие команды есть у бота, используйте /help</b>',
            help_command_message: `<b>🤖 Поддержка - @khanzele</b>

<b>Как использовать команды:</b>
🌎 <b><i>/set_language</i></b> — Сменить язык.
<code>/set_language ru (en)</code> или <code>/set_language rus (eng)</code> <b>для смены языка.</b>

🎧 <b><i>/audio</i></b> — Скачать в аудио.
<code>/audio (href)</code> <b>для скачивания видео в аудио-формате.</b>
`,
            video_loading_message: '⏳ <b>Загрузка видео...</b>',
            video_size_error_message: '<b>Размер видео больше 50 МБ.</b> Такие видео не поддерживаются нашим ботом из-за слишком большой задержки 😔',
            success_loading_message: '<b>🤖 Видео скачано с помощью <a href="https://t.me/tgkdownloader_bot">этого бота</a></b>',
            message_handler: 'Скинь ссылку твоего <b>Reels или Shorts</b> для того, чтобы я скачал его.'
        },
        eng: {
            start_message: `Hello, @${name}! I’m your bot for downloading videos and audio. Here’s what I can do:

🎬 Download videos from YouTube.
🎧 Convert YouTube videos to MP3 for audio-only playback.
📸 Download Instagram videos and stories.

How to use:

Send me a link to a YouTube or Instagram video.
Choose the format (if needed).
Get the file directly in the chat.
Happy downloading! 🚀`,
            set_language: 'English language was set!',
            error_subscription_message: "You're not a subscriber of the channel. Firstly, I want you to subscribe on the channel to use the bot.",
            error_message_handler: "An error occurred. <b>Try again!</b>",
            select_language_message: 'Select language:',
            middleware_subscription_error_message: 'Failed to check if you are subscribed to the channel. <b>Please try again later!</b>',
            middleware_subscription_not_message: '<b>You are not subscribed to the channel @khanzele_dev.</b> Please subscribe and try again.',
            middleware_href_error_message: 'Check the link and <b>Try again</b>',
            youtube_error_message: 'Failed to fetch the video. <b>Try again</b>',
            command_error_message: 'Could not execute the command. <b>To see the available commands, use /help</b>',
            help_command_message: `<b>🤖 Support - @khanzele</b>

<b>How to use commands:</b>
🌎 <b><i>/set_language</i></b> — Switches Language.
<code>/set_language ru (en)</code> or <code>/set_language rus (eng)</code> <b>to switch language.</b>

🎧 <b><i>/audio</i></b>  — Download in audio.
<code>/audio (href)</code> <b>to download video in audio-format.</b>`,
            video_loading_message: '⏳ <b>Loading video...</b>',
            video_size_error_message: '<b>The video size exceeds 50 MB.</b> These videos are not supported by our bot due to the high delay 😔',
            success_loading_message: '<b>🤖 Video loaded with <a href="https://t.me/tgkdownloader_bot">that bot</a></b>',
            message_handler: 'Send me a link from <b>Reels or Shorts</b> to download it.'
        }
    }
}