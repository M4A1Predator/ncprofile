import { ConfigContainer } from "../config/container";
import { DB_WEB_MESSAGES } from "../constants/db-keys";
import { LanguageMessage } from "../model/language-message";
import ServiceAbstract from "./service-abstract";

export default class TranslatorService extends ServiceAbstract {
    constructor() {
        super()
    
        const { dbConfig } = { ...ConfigContainer.getConfigs() }
        this.db = dbConfig.db
    }

    init() {
    }

    getLanguages() {
        return this.db.get(DB_WEB_MESSAGES).value()
    }

    addLanguage(data) {
        // check db key
        let dbMessages = this.db.get(DB_WEB_MESSAGES)
        if (!dbMessages.value()) {
            this.db.set(DB_WEB_MESSAGES, []).write()
            dbMessages = this.db.get(DB_WEB_MESSAGES)
        }

        // check if exists then return
        if (dbMessages.find({lang: data.name}).value()) {
            return {
                err: `${data.name} is already exist`
            }
        }

        // add new lang
        const newLang = new LanguageMessage()
        newLang.lang = data.name
        dbMessages.push(newLang).write()
        return newLang
    }

    getMessages(lang) {
        return this.db.get(DB_WEB_MESSAGES).find({lang}).value()
    }

    updateMessage(langName, webMessage) {
        const lang = new LanguageMessage()
        const dbMsg = this.db.get(DB_WEB_MESSAGES).find({lang: langName})
        lang.instance(dbMsg.value())

        // check key
        const indexToUpdate = lang.messages.findIndex(m => m.key === webMessage.key)

        // update/insert
        if (indexToUpdate > -1) {
            lang.messages[indexToUpdate] = webMessage.value
        } else {
            lang.messages.push(webMessage)
        }
        dbMsg.write()
    }
}