import React from 'react';

export type ModalContextInterface = {
  budgetModalVisible: boolean;
  categoryModalVisible: boolean;
  expenseModalVisible: boolean;
  openBudgetModal: () => void;
  openCategoryModal: () => void;
  openExpenseModal: () => void;
  closeModals: () => void;

  // Todo: abstract this only if used within addbudgetmodal 
  // if used in multiple places, leave it in the component
  refetchUserIncome: (() => void) | null;
};

export const ModalContext = React.createContext<ModalContextInterface>({
  budgetModalVisible: false,
  expenseModalVisible: false,
  categoryModalVisible: false,
  openBudgetModal: () => {},
  openExpenseModal: () => {},
  openCategoryModal: () => {},
  closeModals: () => {},
  refetchUserIncome: null,
});