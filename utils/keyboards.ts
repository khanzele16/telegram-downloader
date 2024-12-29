import { InlineKeyboard } from "grammy"

export default (method: string)  => {
    switch (method) {
        case 'select_language': 
            return new InlineKeyboard().text('Русский 🇷🇺', 'rus').text('Английский 🇺🇸', 'eng')
    }
}