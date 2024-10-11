import useClipboard from "vue-clipboard3";
// import { showSuccessToast } from "vant";

const common = {
  methods: {
    /**
     * copy text to clipboard
     * @param text text to copy
     * @param message success message
     */
    async copyToClipboard(text: string, message = "Copied") {
      const { toClipboard } = useClipboard();
      try {
        await toClipboard(text);
        // console.log(message)
        // showSuccessToast(message);
      } catch (e) {
        console.log(e);
      }
    },
    numberToAccounting(amount: string | number, symbol = "￥") {
      const dataType = Object.prototype.toString.call(amount);
      let formattedStr = "";
      (() => {
        switch (dataType) {
          case "[object Number]":
            formattedStr = amount
              .toLocaleString("zh", { style: "currency", currency: "CNY" })
              .substr(1);
            return;
          case "[object String]":
            formattedStr = parseFloat(amount as string)
              .toLocaleString("zh", { style: "currency", currency: "CNY" })
              .substr(1);
            return;
          default:
            return amount;
        }
      })();

      return symbol + formattedStr;
    },
    /**
     *
     * @param address length=42
     * @param front positive
     * @param end negative number
     * @returns
     */
    addressShorten(address: string, front: number = 6, end: number = -4) {
      if (front - end > 42) throw "exceed max length";
      if (!address) return address;
      return address.slice(0, front) + "..." + address.slice(end);
    },
  },
};

export default common;
