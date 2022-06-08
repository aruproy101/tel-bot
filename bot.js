const {Telegraf} = require('telegraf')
// const puppeteer = require('puppeteer')
const fs = require('fs/promises')
const axios = require("axios")
const cron = require("node-cron")
const path = require("path")
const dotenv = require("dotenv").config()
// const { resolve } = require('path')

// const bot = new Telegraf('5366273598:AAF11_4fUX3EtFnFrvDay7c8R6pitAZRrZU')
const bot = new Telegraf(process.env.TOKEN)




//  start command - /start

const helpMessage = `
/find <username> - fetch details by their username
/start - start the bot
/help - command reference
`

// Middleware function that will run each time

let details = {
    souvik : 0,
    soumabha : 0,
    arindam : 0,
    manas : 0,
    rajdeep : 0,
    dibyabrata : 0,
    isika : 0,
    sanghita : 0
}

let usernames = {
    souvik : "souvik_naskar91",
    soumabha : "aruproyfriend",
    arindam : "arindam369",
    manas : "naxal",
    rajdeep : "code_fu_panda",
    dibyabrata : "chikzz",
    isika : "isika_1",
    sanghita : "rimpa1"
}

const delay = async (ms = 10000) => new Promise(resolve => setTimeout(resolve, ms))

async function oneMesage(name, username) {
    try { 
    let result = await getTotal(username)
    // console.log(resutlt)
    const chatid = -1001615378928
    let str = name.charAt(0).toUpperCase() + name.slice(1)
            if(details[name] == 0) {
                details[name] = result
                return
            }
            if(result - details[name] > 0) {
                let prob = result - details[name] == 1 ? "problem" : "problems"
                bot.telegram.sendMessage(chatid, `${str} solved ${result - details[name]} new ${prob} `)
                details[name] = result
        }

    } catch(e) {
        // error handling

    }
}


async function getAllStats() {
    const chatid = -777081941
    // console.log(details)
    // if(Object.keys(details).length == 0) {
    //     console.log("Printing db -" + details)
    //     details = await JSON.parse(fs.readFile('./db.json').toString())
    //     console.log("Printing db -" + details)
    // }
   /* const [souvik,
         soumabha,
        arindam,
        manas,
        rajdeep,
        dibyabrata,
        isika,
        sanghita
        ] = [await getTotal("souvik_naskar91"),
         await getTotal("aruproyfriend"),
         await getTotal("arindam369"),
         await getTotal("naxal"),
         await getTotal("code_fu_panda"),
         await getTotal("chikzz"),
         await getTotal("isika_1"),
         await getTotal("rimpa1")
        ]
    */
    // console.log("getAllStats - souvik : " + souvik)
    // console.log("getAllStats - soumabha : " + soumabha)

    for(key in usernames) {
        if(usernames.hasOwnProperty(key)) {
            oneMesage(key, usernames[key])
            await delay()
        }
    }
    /*
    if(souvik - details.souvik == 0) {
        bot.telegram.sendMessage(chatid, `Souvik solved ${souvik - details.souvik} new problems `)
        details.souvik = souvik;
    }

    if(soumabha - details.soumabha > 0) {
        bot.telegram.sendMessage(chatid, `Soumabha solved ${soumabha - details.soumabha} new problems `)
        details.soumabha = soumabha;
    }

    if(arindam - details.arindam > 0) {
        bot.telegram.sendMessage(chatid, `Arindam solved ${arindam - details.arindam} new problems `)
        details.arindam = arindam;
    }

    if(manas - details.manas > 0) {
        bot.telegram.sendMessage(chatid, `Manas solved ${manas - details.manas} new problems `)
        details.manas = manas;
    }

    if(rajdeep - details.rajdeep > 0) {
        bot.telegram.sendMessage(chatid, `Rajdeep solved ${rajdeep - details.rajdeep} new problems `)
        details.rajdeep = rajdeep;
    }
    if(dibyabrata - details.dibyabrata > 0) {
        bot.telegram.sendMessage(chatid, `Dibyabrata solved ${dibyabrata - details.dibyabrata} new problems `)
        details.dibyabrata = dibyabrata;
    }
    if(isika - details.isika > 0) {
        bot.telegram.sendMessage(chatid, `Isika solved ${isika - details.isika} new problems `)
        details.isika = isika;
    }

    if(sanghita - details.sanghita > 0) {
        bot.telegram.sendMessage(chatid, `Sanghita solved ${sanghita - details.sanghita} new problems `)
        details.sanghita = sanghita;
    }

    // await fs.writeFile(path.join(__dirname, "db.json"), JSON.stringify(details))
    */
}


bot.use((ctx, next) => {
    console.log(ctx.chat)
    console.log(ctx.from)
    console.log(ctx.updateType)
    // if(ctx.updateSubTypes[0] == "text") {
    //     console.log(ctx.from.username + " said" + ctx.message.text)
    // } else {
    //     console.log(ctx.from.username + " sent" + ctx.updateSubTypes[0])
    // }

    next() // move to the next functions
})

bot.start(ctx => {
    ctx.reply("Welcome to our bot")
    ctx.reply(helpMessage)
})

bot.help(ctx => {
    ctx.reply(helpMessage)
})

// bot.command("all", ctx => {
//     ctx.reply("/naskar")
// })

bot.command("find", async (ctx) => {
    let input = ctx.message.text
    let inputArr = input.split(" ")
    let message = ""
    if(inputArr.length == 1) {
        message = "You did not put any arguments"
    } else {
        inputArr.shift() // deleteing first element
        message = inputArr.join(" ")
    }
    // console.log(message)
    
    try {
        const mreply = await getStats(message, " ")
        ctx.reply(mreply)
    } catch(e) {
        ctx.reply("There is a problem, please try after some time")
    }
    
})

bot.command("naskar", async (ctx) => {
    /* console.log(ctx)
    let input = ctx.message.text
    let inputArr = input.split(" ")
    console.log(inputArr)
    let message = ""
    if(inputArr.length == 1) {
        message = "You did not put any arguments"
    } else {
        inputArr.shift() // deleteing first element
        message = inputArr.join(" ")
    } */
    try {
        const mreply = await getStats("souvik_naskar91", "Souvik Naskar")
        ctx.reply(mreply)
    } catch(e) {
        ctx.reply("There is a problem, please try after some time")
    }
    
})

bot.command("soumabha", async (ctx) => {
    try {
    const mreply = await getStats("aruproyfriend", "Soumabha Ghosh")
    ctx.reply(mreply)
    } catch(e) {
        ctx.reply("There is a problem, please try after some time")
    }
})

bot.command("rajdeep", async (ctx) => {
    try {
    const mreply = await getStats("code_fu_panda", "Rajdeep Mallick")
    ctx.reply(mreply)
    } catch(e) {
        ctx.reply("There is a problem, please try after some time")
    }
})

bot.command("arindam", async (ctx) => {
    try{
    const mreply = await getStats("arindam369", "Arindam Halder")
    ctx.reply(mreply)
    } catch(e) {
        ctx.reply("There is a problem, please try after some time")
    }
})

bot.command("arup", async (ctx) => {
    // const mreply = await getStats("arindam369", "Arindam Halder")
    ctx.reply("Fuck off!")
})

// async function pupp() {
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.goto("https://leetcode.com/souvik_naskar91/")
//     const number = page.evaluate(() => {
//         return document.querySelector("#__next > div > div > div > div.w-full.lc-lg\:max-w-\[calc\(100\%_-_316px\)\] > div.flex.w-full.flex-col.space-x-0.space-y-4.lc-xl\:flex-row.lc-xl\:space-y-0.lc-xl\:space-x-4.mt-4.lc-lg\:mt-0 > div.min-w-max.max-w-full.w-full.flex-1 > div > div.mx-3.flex.items-center.lc-xl\:mx-8 > div.mr-8.mt-6.flex.min-w-\[100px\].justify-center > div > div > div > div.text-\[24px\].font-medium.text-label-1.dark\:text-dark-label-1").textContent
//     })

//     await fs.writeFile("totalProblems.txt", number);

//     await browser.close()
// }

// pupp()

async function getStats(username, realname) {
    try {
        const res = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}/`)
        // console.log(res)
        if(res.data.status == 'error') {
            return "User does not exist"
        }
        const message = `
        Stats of ${realname}(${username})
    
        Easy - ${res.data.easySolved} / ${res.data.totalEasy}
        Medium - ${res.data.mediumSolved} / ${res.data.totalMedium}
        Hard - ${res.data.hardSolved} / ${res.data.totalHard}
    
        Total - ${res.data.totalSolved} / ${res.data.totalQuestions}
        
        `
    
        return message
    } catch(e) {
        // console.log(e)
        return "Some problem occurred"
    }
    
}

async function getTotal(username) {
    try {
        const res = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}/`)
        return res.data.totalSolved
    } catch(e) {
        // console.log(e)
        return new Promise((resolve, reject) => {
            reject("Some problem occurred")
        })
    }
    
}

// cron.schedule("*/4 * * * *", getAllStats)
// cron.schedule("*/10 * * * *", getAllStats)


module.exports = bot

bot.launch()