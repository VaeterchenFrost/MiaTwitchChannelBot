import { RefreshingAuthProvider } from "@twurple/auth";
import { ChatClient } from "@twurple/chat";
import { promises as fs } from "fs";

async function main() {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const tokenData = JSON.parse(await fs.readFile("./tokens.json", "UTF-8"));
  const authProvider = new RefreshingAuthProvider(
    {
      clientId,
      clientSecret,
      onRefresh: async (newTokenData) => {
        await fs.writeFile(
          "./tokens.json",
          JSON.stringify(newTokenData, null, 4),
          "UTF-8"
        );
        console.log("Refreshed token data");
      },
    },
    tokenData
  );

  const chatClient = new ChatClient({
    authProvider,
    channels: ["satisfiedpear"],
  });
  await chatClient.connect();

  chatClient.onMessage((channel, user, message) => {
    if (message === "!ping") {
      chatClient.say(channel, "Pong!");
    } else if (message === "!dice") {
      const diceRoll = Math.floor(Math.random() * 6) + 1;
      chatClient.say(channel, `@${user} rolled a ${diceRoll}`);
    }
  });

  chatClient.onSub((channel, user) => {
    chatClient.say(
      channel,
      `Thanks to @${user} for subscribing to the channel!`
    );
  });
  chatClient.onResub((channel, user, subInfo) => {
    chatClient.say(
      channel,
      `Thanks to @${user} for subscribing to the channel for a total of ${subInfo.months} months!`
    );
  });
  chatClient.onSubGift((channel, user, subInfo) => {
    chatClient.say(
      channel,
      `Thanks to ${subInfo.gifter} for gifting a subscription to ${user}!`
    );
  });
}

main();
