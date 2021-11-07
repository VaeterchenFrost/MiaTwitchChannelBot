# MiaTwitchChannelBot
Lightweight bot to handle different custom events on twitch channels.

## Authentication

1. Create `.env` file in the repository root (ignored in .gitignore)
2. Add line **TWITCH_TMI_PW=oauth:...**
3. oauth can be collected via https://twitchapps.com/tmi/
4. Save `.env` file

## Configuration options
In the file '**src/bot.js**' you can change the configuration of the bot. 

Current used options let you set:
- the **username** of the bot - could be you or a dedicated account - this one needs to be **[authenticated](#authentication)** 
- the **password** for the *username* - should be kept **secure** and set using [.env](#authentication) - **if leaked anyone can chat as you!!**
- the **channels** the bot will listen to (*target* in the handler).
## How to run

1. To see if you already have Node.js and npm installed and check the installed version, run the commands `node -v` and `npm -v` in a shell like [Powershell](https://github.com/powershell/powershell#get-powershell), cmd, bash or similar.

2. Install [Node](https://nodejs.org/en/download/) (tested with [v14.10.1](https://nodejs.org/download/release/v14.10.1/)) and include npm. Alternative: Node version manager [nvs](https://github.com/jasongin/nvs).
3. Reopen shell 
4. Execute **`node -r dotenv/config .\src\bot.js`** in the root folder. After a few seconds you should get:

`* Connected to irc-ws.chat.twitch.tv`

5. Congratulations, you now have a running chatbot :tada: 

# Report problems
Check if the above steps are properly done.

If yes and there is something to be done - log into github and look at [Issues](https://github.com/VaeterchenFrost/MiaTwitchChannelBot/issues) (or [open new](https://github.com/VaeterchenFrost/MiaTwitchChannelBot/issues/new/choose))  - 
or contact the maintainer ;-)