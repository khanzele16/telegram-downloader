import { NextFunction } from "grammy"
import { MyContext } from "../shared/types";
import language from "../utils/language";

export default async (ctx: MyContext, next: NextFunction) => {
    try {
        if (ctx.chat?.id) {
            const chatMember = await ctx.api.getChatMember(-1002398290968, ctx.chat?.id);
            if (chatMember.status === 'administrator' || chatMember.status === 'creator' || chatMember.status === 'member') {
                next()
            } else {
                return ctx.reply(language()[ctx.session.language].middleware_subscription_not_message, { parse_mode: 'HTML' })
            }
        }
    } catch (err) {
        console.log(err)
        return ctx.reply(language()[ctx.session.language].middleware_subscription_error_message, { parse_mode: 'HTML' })
    }
}