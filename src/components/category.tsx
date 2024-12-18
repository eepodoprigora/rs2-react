import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import characters from "../data/characters.json";
import location from "../data/location.json";
import episode from "../data/episode.json";

import { CharactersData, EpisodeData, LocationData } from "../data/types";
import { useEffect } from "react";

export const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  let data: Array<CharactersData> | Array<EpisodeData> | Array<LocationData> =
    [];
  let categoryRu: string = "";
  const isCategoryValid = ["characters", "location", "episode"].includes(
    category || ""
  );

  useEffect(() => {
    if (!isCategoryValid) {
      navigate("/not-found");
    }
  }, [isCategoryValid, navigate]);

  if (!isCategoryValid) {
    return null;
  }

  switch (category) {
    case "characters":
      data = characters;
      categoryRu = "Героев";
      break;
    case "location":
      data = location;
      categoryRu = "Локаций";
      break;
    case "episode":
      data = episode;
      categoryRu = "Эпизодов";
      break;
    default:
      data = [];
  }

  return (
    <div>
      <h1>Список {categoryRu}</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <Link to={`/${category}/${item.id}`}>
                {item.id}. {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет данных для этой категории</p>
      )}
    </div>
  );
};
