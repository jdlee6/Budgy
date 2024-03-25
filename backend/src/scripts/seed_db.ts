import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

const CREATE_USER = gql`
  mutation {
    createUser(newUserInput: { name: "test acc", email: "test@gmail.com" }) {
      id
      name
      email
    }
  }
`;

const CREATE_FOOD_CATEGORY = gql`
  mutation {
    createCategory(
      newCategoryInput: { name: "food", color: "blue", userId: 1 }
    ) {
      id
      name
      color
      expenses {
        id
        name
      }
      userId
    }
  }
`;

const CREATE_FOOD_BUDGET = gql`
  mutation {
    createBudget(newBudgetInput: { amount: 500.00, userId: 1, categoryId: 1 }) {
      id
      amount
      userId
      categoryId
    }
  }
`;

const CREATE_DINNER_EXPENSE = gql`
  mutation CreateCarExpense($dateString: DateTime!) {
    createExpense(
      newExpenseInput: {
        name: "DINNER"
        recurrence: true
        amount: 69.22
        billingDate: $dateString
        userId: 1
        categoryId: 1
      }
    ) {
      id
      name
      amount
      recurrence
      billingDate
      userId
      categoryId
    }
  }
`;

const CREATE_GROCERY_EXPENSE = gql`
  mutation createGroceryExpense($dateString: DateTime!) {
    createExpense(
      newExpenseInput: {
        name: "groceries"
        recurrence: true
        amount: 69.42
        billingDate: $dateString
        userId: 1
        categoryId: 1
      }
    ) {
      id
      name
      amount
      recurrence
      billingDate
      userId
    }
  }
`;

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});
const dateString = new Date().toISOString().slice(0, 10);
console.log(dateString);

client
  .mutate({ mutation: CREATE_USER })
  .then(() =>
    client.mutate({
      mutation: CREATE_FOOD_CATEGORY,
      variables: { dateString },
    }),
  )
  .then(() =>
    client.mutate({
      mutation: CREATE_FOOD_BUDGET,
    }),
  )
  .then(() =>
    client.mutate({
      mutation: CREATE_DINNER_EXPENSE,
      variables: { dateString },
    }),
  )
  .then(() =>
    client.mutate({
      mutation: CREATE_GROCERY_EXPENSE,
      variables: { dateString },
    }),
  )
  .catch((err) => console.error(err.networkError.result.errors));
