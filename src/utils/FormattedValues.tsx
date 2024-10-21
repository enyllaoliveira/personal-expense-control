export const formatCurrency = (value: string | number): string => {
  const numberValue = Number(value);
  if (isNaN(numberValue)) {
    return "Valor inválido";
  }
  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const formatDate = (date?: string | Date): string => {
  if (!date) return "Data indisponível";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "Data inválida";
  }
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return parsedDate.toLocaleDateString("pt-BR", options);
};
