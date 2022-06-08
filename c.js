const cron = require("node-cron")
const bot = require("./bot")


function c() {
    bot.telegram.sendMessage(-1001615378928, `cron working`)
}

cron.schedule("*/1 * * * *", c)