import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";

// const APIinstance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });

function App() {
  const [nickname, setNickname] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let isFindUser = false;
    let user;

    await axios
      .get(`https://shikimori.one/api/users/${nickname}`)
      .then(function (response) {
        isFindUser = true;
        user = response.data;
      });

    console.log(isFindUser, user);

    if (isFindUser) {
      axios
        .get(
          `https://api.allorigins.win/raw?url=https://shikimori.one/${nickname}/list_export/animes.json`,
          {
            // headers: {
            //   "Access-Control-Allow-Origin": "*",
            //   "Content-Type": "application/json",
            // },
          }
        )
        .then(function (response) {
          // обработка успешного запроса
          console.log(response);
        })
        .catch(function (error) {
          // обработка ошибки
          console.log(error);
        })
        .finally(function () {
          // выполняется всегда
        });
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">shikimori-picker</h1>

      <form className="flex flex-row items-center justify-center gap-2">
        <input
          type="text"
          placeholder="Enter your name"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="font-sans text-sm w-full py-2 px-3 ring-2 ring-inset ring-pink-500 outline-none rounded-2xl"
        />
        <button
          type="submit"
          onClick={(e) => handleSubmit(e)}
          className="flex items-center justify-center h-full w-[70px] bg-pink-600 hover:bg-pink-700 text-white rounded-2xl"
        >
          <BiSearchAlt />
        </button>
      </form>
    </div>
  );
}

export default App;
