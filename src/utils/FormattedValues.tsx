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
export const formatDate = (
  date?: string | Date,
  iso: boolean = false
): string => {
  if (!date) return "";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return "";
  }

  if (iso) {
    return parsedDate.toISOString().split("T")[0];
  }

  return parsedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
