import { createSelector } from "reselect";

const selectClients = (state) => state.clients;

export const selectClientList = createSelector(
  [selectClients],
  (clients) => clients
);

export const selectIsClientFetching = createSelector(
  [selectClients],
  (client) => client.isFetching
);

export const selectIsClientLoaded = createSelector(
  [selectClients],
  (clients) => !!clients.clients
);
