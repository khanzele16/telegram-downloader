import { instagram_downloader, youtube_downloader } from "../controller/main";
import { MyContext } from "../shared/types";
import language from "../utils/language";

export default (ctx: MyContext, href: string): String => {
    const instagramPattern = /^(https?\:\/\/)?(www\.)?instagram\.com\//
    const youtubePattern = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\//;
    if (instagramPattern.test(href)) {
        return 'Instagram'
    } else if (youtubePattern.test(href)) {
        return 'Youtube'
    } else {
        ctx.reply(language()[ctx.session.language].middleware_href_error_message, { parse_mode: 'HTML' })
        return 'Unknown'
    }
}