import { create } from "apisauce";
const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYjNlOWM2ZWI0OWYyOWVhMzE4ZTMzZTliNTJjNzg4N2E0ZDEwOWQ1YTRmYWQxOWJhMWY3ZTFkN2JlNDk5YmRiMjJkMzM1Nzk0ZmYzNWI5YTMiLCJpYXQiOjE2MzQ2NTE4MzguNjY4OTE0MDc5NjY2MTM3Njk1MzEyNSwibmJmIjoxNjM0NjUxODM4LjY2ODkxNzg5NDM2MzQwMzMyMDMxMjUsImV4cCI6MTY2NjE4NzgzOC42MzkwMzA5MzMzODAxMjY5NTMxMjUsInN1YiI6IjIiLCJzY29wZXMiOltdfQ.Esfey2zrfP7L-JTFDhpQVV5Q-fT4LobZ9J1rlfff1pDxKYALRZg424BaVMVwSEUOiJLY4WumalmNbRL_i-QOqJX_E2iSjMxjVQ6OqQIYLDJZT8rukATgVTPgxcBw-PEAqQ0x9AKJwhsIh8Fh14yxHsW8H8ekYbbMjDhYa4oC3Wmf8lqYw1-JovZm4SIe01XOUGo2b_RzNnQYbB-z0mLt5tdDJ2wf0MPtdQ-iS3DB0JMu2kB7X-Qti0mxK_Ou4qrjFZDCTx80kh29smkqsxVdmaeCV-0LTexR8CjdDgPxhZecBb8Ji4zW-I7QvOACJ-rgKCypgvk5rXFCGIOB5U1uUgxASPp0REF9B_jONDKeZFR6I2E0E6V-Rn1Zv07jB320se27t-k41nLvW9_T2AUYh_6z3LlEGqjllMRQaijk_8YDKd1IOE8PUJjvcygimDRtNBekrqZCHaBcB1nly96txy1VCRaCBjI8JpPveuHbn8z8r1rPMi3k_ZmvjQ2k7dNULYix79CCG9mujCOQ-QsGAhHyu58eLOlS1MqioTJjsYBKL95kPPaVwnPToQgzdpPu3Ck_R6osxIyRj7DNGPbwYV2XmsHnsRqojuclfgi-EH-w7JrWq3lhwS0j-TurPVZ87Jbykw_1n6FYyYNrEfj45hD89VgQg-gC4g3bhXCO7u4";

const apiServer = create({
  baseURL: "http://localhost/forex/"
//   headers:{
//       'Authorization':'Bearer '+token,
//       'Access-Control-Allow-Origin':'*',
//       'Content-Type':'application/json'
//   }
});


export default {
    apiServer,
    token
}