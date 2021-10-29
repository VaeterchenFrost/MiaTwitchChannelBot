import fetch from "node-fetch";
import { parse } from "node-html-parser";

export default async function getWarmaneTeam(rank = 1, type = 2) {
  const modi = { 2: "2v2", 3: "3v3", 5: "5v5" };
  if (!modi.hasOwnProperty(type)) type = 2; // default
  const url = `https://armory.warmane.com/ladder/${modi[type]}/1/80`;
  const response = await fetch(url)
  const data = await response.text();
  return getLadderRank(data, rank, modi[type]);
}

function getLadderRank(text, rank, type) {
  if (
    !Array(50)
      .fill()
      .map((_, i) => 1 + i)
      .includes(rank)
  ) {
    console.log(`Rank ${rank} not seen!`);
    return;
  }
  // console.log(text);
  const root = parse(text, "text/xml");
  const ladder = root.querySelector("#data-table-list");
  const team = ladder.childNodes[2 * rank - 1];
  var result = `Rank ${rank} ${type}-team: ` + team.childNodes[3].text;
  console.log(team.childNodes[3].text + ` ${rank}, ${type}`);
  var members = [];
  for (var index = 1; index < team.childNodes[5].childNodes.length; index += 2) {
    members.push(team.childNodes[5].childNodes[index].childNodes[1].attrs.alt);
  }
  if (members.length > 0) result += " (" + members.join() + ")";
  const win = team.childNodes[11].text;
  const loss = team.childNodes[13].text;
  const rating = team.childNodes[15].text;
  result += ` ${win}-${loss} ${rating} `;
  result += rank > 10 ? "Kappa" : "FeelsAmazingMan";
  return result;
}
