export interface ApiResponseModel<Data, Error> {
  data: Data | null
  error: Error | null
  loading: boolean
}
// todo check this
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// const myRequest = new Request("flowers.jpg", {
//     method: "GET",
//     headers: myHeaders,
//     mode: "cors",
//     cache: "default",
// })
