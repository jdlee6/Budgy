import { ApolloClient, InMemoryCache, gql } from '@apollo/client/core';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

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
  mutation {
    createExpense(
      newExpenseInput: {
        userId: 1
        name: "car"
        recurring: true
        amount: 290.00
      }
    ) {
      name
      amount
      recurring
      userId
    }
  }
`;

const CREATE_INTERNET_EXPENSE = gql`
  mutation {
    createExpense(
      newExpenseInput: {
        userId: 1
        name: "internet"
        recurring: true
        amount: 69.99
      }
    ) {
      name
      amount
      recurring
      userId
    }
  }
`;

client
  .mutate({ mutation: CREATE_USER })
  .then(() => client.mutate({ mutation: CREATE_CAR_EXPENSE }))
  .then(() => client.mutate({ mutation: CREATE_INTERNET_EXPENSE }))
  .catch((err) => console.error(err));
