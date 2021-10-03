import { createSelector } from "reselect";

const selectTechnicians = (state) => state.technicians;

export const selectTechnicianList = createSelector(
  [selectTechnicians],
  (technicians) => technicians
);

export const selectIsTechniciansFetching = createSelector(
  [selectTechnicians],
  (technicians) => technicians.isFetching
);

export const selectIsTechniciansLoaded = createSelector(
  [selectTechnicians],
  (technicians) => !!technicians.technicians
);
