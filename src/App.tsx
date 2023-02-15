import { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import { IContent } from "./data/models";
import { zoxioneContent } from "./data/devZoxioneContent";

const ISDEV = false;

function App() {
  const [nickname, setNickname] = useState("");
  const [showIsntFindUser, setShowIsntFindUser] = useState(false);
  const [dataList, setDataList] = useState<IContent[]>([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setShowIsntFindUser(false);
    let isFindUser = false;
    let user;
    let userContent: IContent[] = [];

    await axios
      .get(`https://shikimori.one/api/users/${nickname}`)
      .then(function (response) {
        isFindUser = true;
        user = response.data;
      })
      .catch(function (error) {
        // обработка ошибки
        console.log(error);
        setShowIsntFindUser(true);
      });

    console.log(isFindUser, user);

    if (isFindUser) {
      if (ISDEV) {
        userContent = zoxioneContent;
      } else {
        await axios
          .get(
            `https://api.allorigins.win/raw?url=https://shikimori.one/${nickname}/list_export/animes.json`
          )
          .then(function (response) {
            // обработка успешного запроса
            console.log(response);
            userContent = response.data;
          })
          .catch(function (error) {
            // обработка ошибки
            console.log(error);
          });
      }

      setDataList(userContent.filter((item) => item.status === "planned"));
      console.log(dataList);
    }
  };

  return (
    <div className="w-[calc(100vw)] h-[calc(100vh)]">
      <div className="w-full h-full flex flex-col items-center justify-center gap-6 px-[36px]">
        <h1 className="text-3xl font-bold">shikimori-picker</h1>

        <form className="flex flex-row items-center justify-center">
          <input
            type="text"
            placeholder="Enter your name"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="font-sans text-sm w-full py-2 px-3 ring-2 ring-inset ring-emerald-600 outline-none rounded-l-2xl"
          />
          <button
            type="submit"
            disabled={nickname.length === 0}
            onClick={(e) => handleSubmit(e)}
            className="flex items-center justify-center h-full w-[70px] bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-r-2xl"
          >
            <BiSearchAlt />
          </button>
        </form>

        {showIsntFindUser && <span>Пользователя не найдено</span>}

        {dataList.length > 0 && (
          <div className="w-fit h-[300px] overflow-y-scroll bg-slate-100 p-4 rounded-2xl">
            {dataList.map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center gap-2 hover:text-emerald-600"
              >
                <span>{index}.</span>
                <a
                  href={`https://shikimori.one/animes/${item.target_id}-${item.target_title}`}
                  target="_blank"
                  className=""
                >
                  {item.target_title}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
