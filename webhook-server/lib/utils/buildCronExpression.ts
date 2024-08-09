export default function buildCronExpression(cronString: string): string {
  console.log(cronString, typeof cronString);
  
  if (!cronString || typeof cronString !== "string") {
    throw new Error("invalid");
  }
  const [range, interval] = cronString.split(" ");

  switch (interval.toUpperCase()) {
    case "MIN":
      return `*/${range} * * * *`;
    case "HOURS":
      return `0 */${range} * * *`;
    case "DAYS":
      return `0 0 */${range} * *`;
    default:
      throw new Error("invalid");
  }
}
