export default function format(text: string): (string | number)[][] {
  return text
    .split("\r\n")
    .filter(
      (el) =>
        el.charAt(0) !== "#" && ["C", "M", "T", "A"].includes(el.charAt(0))
    )
    .map((el: string) => {
      return el.split(" - ").map((ele: string) => {
        if (Number.isInteger(parseInt(ele))) return parseInt(ele);
        return ele;
      });
    });
}
