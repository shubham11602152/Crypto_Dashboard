const toCurrencyData = (response) => {
  const mappedResponse = response.map((data) => {
    const {
      id,
      priceUsd: price,
      marketCapUsd: marketCap,
      name,
      symbol,
      rank,
      supply,
      vwap24Hr: vwap,
      volumeUsd24Hr: volume,
      changePercent24Hr: changePercent,
      explorer,
    } = data;

    return {
      id,
      price,
      marketCap,
      name,
      symbol,
      rank,
      supply,
      vwap,
      volume,
      changePercent,
      explorer,
    };
  });
  console.log({ mappedResponse });
  return mappedResponse;
};

export { toCurrencyData };
