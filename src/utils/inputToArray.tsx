export default function inputToArray(str: string) {
  return str
    .split("\r\n")
    .filter(
      (el) =>
        el.charAt(0) !== "#" && ["C", "M", "T", "A"].includes(el.charAt(0))
    )
    .map((ele) =>
      ele.split(" - ").map((str) => {
        if (str?.match(/\d/g)?.length === str.length) return parseInt(str);
        return str;
      })
    );
}
