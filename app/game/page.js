import GameInterface from "./GameInterface";

export default async function Game({ searchParams }) {
  const region = (await searchParams).region;
  return <GameInterface region={region} />;
}
