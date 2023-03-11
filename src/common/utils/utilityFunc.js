export const toCurrencyUSD = (value) => {
  const formatted = parseFloat(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatted;
};

export const toSecondDecimal = (value, endsSymbol = "") => {
  const formatted = Number(value).toPrecision(3);
  return formatted + endsSymbol;
};

export const toIconURL = (url, fileName, size = "@2x.png") => {
  const lowerCaseFileName = fileName.toLowerCase();
  const URL = `${url}/${lowerCaseFileName}${size}`;

  return URL;
};
