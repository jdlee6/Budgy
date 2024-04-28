import React from 'react';

export type ModalContextInterface = {
  budgetModalVisible: boolean;
  categoryModalVisible: boolean;
  expenseModalVisible: boolean;
  updateExpenseModalVisible: boolean;
  openBudgetModal: () => void;
  openCategoryModal: () => void;
  openExpenseModal: () => void;
  openUpdateExpenseModal: () => void;
  closeModals: () => void;
};

export const ModalContext = React.createContext<ModalContextInterface>({
  budgetModalVisible: false,
  expenseModalVisible: false,
  categoryModalVisible: false,
  updateExpenseModalVisible: false,
  openBudgetModal: () => {},
  openExpenseModal: () => {},
  openCategoryModal: () => {},
  openUpdateExpenseModal: () => {},
  closeModals: () => {},
});