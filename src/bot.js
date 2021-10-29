import pkg from "tmi.js";
import getWarmaneTeam from "./warmaneladder.js";
const { client: _client } = pkg;

// Define configuration options
const opts = {
  identity: {
    username: "free3ze",
    password: process.env.TWITCH_TMI_PW,
  },
  channels: ["free3ze", "torstenstock", "crimzonqt", "mya_wallace"],
};

// Create a client with our options
const client = new _client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);
client.on("connected", onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self) {
    return;
  } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName.startsWith("!dice")) {
    const num = rollDice();
    client.say(target, `@${context.username} rolled a ${num}`);
    console.log(`* Executed ${commandName} command`);
  } else if (
    commandName.startsWith("/rnd") ||
    commandName.startsWith("rnd ") ||
    commandName === "rnd"
  ) {
    const args = commandName.split(" ");
    const rnd = randomInt(
      args.length < 3 ? 1 : parseInt(args[1]),
      args.length == 1 ? 100 : parseInt(args[args.length == 2 ? 1 : 2])
    );
    client.say(target, `@${context.username} rolled a ${rnd[0]} (${rnd[1]},${rnd[2]}) `);
    console.log(`* Executed ${commandName} command in ${target}`);
  } else if (commandName.startsWith("!ladder ") || commandName.startsWith("!ladder2")) {
    client.say(target, `@${context.username} armory.warmane.com/ladder/2v2/1/80 `);
    console.log(`* Executed ${commandName} command in ${target}`);
  } else if (commandName.startsWith("!ladder 3") || commandName.startsWith("!ladder3")) {
    client.say(target, `@${context.username} armory.warmane.com/ladder/3v3/1/80 `);
    console.log(`* Executed ${commandName} command in ${target}`);
  } else if (commandName.startsWith("!ladder 5") || commandName.startsWith("!ladder5")) {
    client.say(target, `@${context.username} armory.warmane.com/ladder/5v5/1/80 `);
    console.log(`* Executed ${commandName} command in ${target}`);
  } else if (commandName.startsWith("!rank")) {
    const args = commandName.split(" ");
    getWarmaneTeam(
      args.length > 1 ? parseInt(args[1]) : 1,
      args.length > 2 ? parseInt(args[2]) : 2
    ).then((reply) =>
      client.say(
        target,
        `@${context.username} ${
          target != "#torstenstock" ? reply : reply.replace("FeelsAmazingMan", "pepeOK")
        } `
      )
    );
    console.log(`* Executed ${commandName} command in ${target}`);
  } else if (context["custom-reward-id"] === "af5c3e0f-6ef2-4af2-8ec4-bde629e29030") {
    // https://www.bit01.de/blog/twitch-bot-ge-rewards-via-tmi-jsget/
    client.say(
      target,
      `@${context.username} Reward af5c3e0f-6ef2-4af2-8ec4-bde629e29030 with ${commandName}`
    );
    console.log(`* Executed ${commandName} command`);
  } else {
    console.log(`* Unknown command ${commandName} ${context["custom-reward-id"]}`);
  }
}

// Function called when the "dice" command is issued
function rollDice() {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

// Function called when the "rnd" command is issued
function randomInt(min, max) {
  if (isNaN(min)) {
    max = isNaN(max) ? 100 : max;
    min = 1;
  }
  if (isNaN(max)) {
    max = min + 99;
  }
  if (min > max) {
    [min, max] = [max, min];
  }

  var result = min + Math.floor(Math.random() * (max - min + 1));
  console.log(`Rolled ${result} between ${min},${max}`);
  return [result, min, max];
}