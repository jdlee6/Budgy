import React from 'react';

export type ModalContextInterface = {
  budgetModalVisible: boolean;
  categoryModalVisible: boolean;
  expenseModalVisible: boolean;
  openBudgetModal: () => void;
  openCategoryModal: () => void;
  openExpenseModal: () => void;
  closeModals: () => void;
};

export const ModalContext = React.createContext<ModalContextInterface>({
  budgetModalVisible: false,
  expenseModalVisible: false,
  categoryModalVisible: false,
  openBudgetModal: () => {},
  openExpenseModal: () => {},
  openCategoryModal: () => {},
  closeModals: () => {},
});