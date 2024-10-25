export interface Expense {
  id: string;
  userId: string;
  descricao?: string;
  valor?: string;
  data_pagamento?: string;
  categoria_id?: string;
  criado_em?: string;
  atualizado_em?: string;
  nova_categoria?: string;
}
