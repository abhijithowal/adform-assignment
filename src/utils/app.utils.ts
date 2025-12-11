export function formatNumberToCurrency(number: number) {
  if (number >= 1000) {
    return `$${(number / 1000).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}K`;
  } else if (number >= 1000000) {
    return `$${(number / 1000000).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}M`;
  } else if (number >= 1000000000) {
    return `$${(number / 1000000000).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}B`;
  } else if (number >= 1000000000000) {
    return `$${(number / 1000000000000).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}T`;
  } else {
    return `$ ${number.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
}
