import React from 'react';

export const ModalContext = React.createContext({
  expenseModalVisible: false,
  categoryModalVisible: false,
  openExpenseModal: () => {},
  openCategoryModal: () => {},
  closeModals: () => {},
});