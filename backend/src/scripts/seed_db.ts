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

const CREATE_CAR_EXPENSE = gql`
  mutation CreateCarExpense($dateString: DateTime!) {
    createExpense(
      newExpenseInput: {
        name: "car"
        recurrence: true
        amount: 290.00
        billingDate: $dateString
        userId: 1
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

const CREATE_INTERNET_EXPENSE = gql`
  mutation createInternetExpense($dateString: DateTime!) {
    createExpense(
      newExpenseInput: {
        name: "internet"
        recurrence: true
        amount: 69.99
        billingDate: $dateString
        userId: 1
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
      mutation: CREATE_CAR_EXPENSE,
      variables: { dateString },
    }),
  )
  .then(() =>
    client.mutate({
      mutation: CREATE_INTERNET_EXPENSE,
      variables: { dateString },
    }),
  )
  .catch((err) => console.error(err.networkError.result.errors));
