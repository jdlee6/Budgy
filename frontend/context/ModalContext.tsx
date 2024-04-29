import React from 'react';

export type ModalContextInterface = {
  budgetModalVisible: boolean;
  categoryModalVisible: boolean;
  expenseModalVisible: boolean;
  updateExpenseModalVisible: boolean;
  updateExpenseId: number | null,
  openBudgetModal: () => void;
  openCategoryModal: () => void;
  openExpenseModal: () => void;
  openUpdateExpenseModal: (id: number) => void;
  closeModals: () => void;
};

export const ModalContext = React.createContext<ModalContextInterface>({
  budgetModalVisible: false,
  expenseModalVisible: false,
  categoryModalVisible: false,
  updateExpenseModalVisible: false,
  updateExpenseId: 0,
  openBudgetModal: () => {},
  openExpenseModal: () => {},
  openCategoryModal: () => {},
  openUpdateExpenseModal: (id: number) => {},
  closeModals: () => {},
});