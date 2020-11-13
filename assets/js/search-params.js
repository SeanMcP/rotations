/** Returns an object of all search params */
export function get() {
  // n notes, t transition, r rotation, c color
  // ?n=Reading%20groups%20>%20Independent%20reading%20>%20Online%20exercises%20>%20Word%20games&t=5&r=4&c=r&r=3&c=b
  const usp = new URLSearchParams(location.search);
  const note = usp.get("n");
  const transition = parseInt(usp.get("t"));
  const rotation = usp.getAll("r");
  const color = usp.getAll("c");
  const rotations = rotation.map((r, i) => {
    const length = parseInt(r);
    return {
      color: color[i],
      length,
      lengthInSeconds: length * 60,
      // DEV ONLY
      // lengthInSeconds: 5
    };
  });
  return {
    edit: usp.get("edit") === "true" && rotations.length > 0 && transition,
    note,
    transition,
    rotations,
  };
}
