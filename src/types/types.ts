import type { paths } from "./shema";
export type AllGameResponse =
  paths["/api/v1/admin/games"]["get"]["responses"][200]["content"]["*/*"];
export type GameInfoResponse =
  paths["/api/v1/admin/games/{game-id}"]["get"]["responses"][200]["content"]["*/*"];
export type UsersResponse =
  paths["/api/v1/admin/users"]["get"]["responses"][200]["content"]["*/*"];
export type TransactionsResponse =
  paths["/api/v1/admin/transactions"]["get"]["responses"][200]["content"]["*/*"];

  export type AllGenreAndTagsResponse =
  paths["/api/v1/tags"]["get"]["responses"][200]["content"]["*/*"];