import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";

import { CharactersData, EpisodeData, LocationData } from "../types";
import useLoadData from "../hooks/useLoadData";

const CATEGORY_API_MAP: Record<string, string> = {
  characters: "https://rickandmortyapi.com/api/character",
  location: "https://rickandmortyapi.com/api/location",
  episode: "https://rickandmortyapi.com/api/episode",
};

const CATEGORY_RU_MAP: Record<string, string> = {
  characters: "Героев",
  location: "Локаций",
  episode: "Эпизодов",
};

const Category = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLLIElement | null>(null);

  const isCategoryValid = ["characters", "location", "episode"].includes(
    category || ""
  );

  useEffect(() => {
    if (!isCategoryValid) {
      navigate("/not-found");
    }
  }, [isCategoryValid, navigate]);

  const { data, loading, error, fetchData, hasMore } = useLoadData<
    CharactersData | EpisodeData | LocationData
  >(CATEGORY_API_MAP[category || ""]);

  useEffect(() => {
    if (isCategoryValid) {
      fetchData(true);
    }
    // eslint-disable-next-line
  }, [category, isCategoryValid]);

  useEffect(() => {
    const lastElement = lastElementRef.current;

    if (loading || !hasMore || !lastElement) return; // Не запускаем, если идет загрузка или больше нет данных

    if (observerRef.current) observerRef.current.disconnect(); // Отсоединяем старый observer

    // Инициализируем новый Intersection Observer
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData(false); // Загружаем следующую страницу
      }
    });

    observerRef.current.observe(lastElement); // Отслеживаем последний элемент списка

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, hasMore, fetchData]);
  if (!isCategoryValid || !category) {
    return null;
  }

  const categoryRu = CATEGORY_RU_MAP[category];

  return (
    <div>
      <h1>Список {categoryRu}</h1>
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li
              key={item.id}
              ref={index === data.length - 1 ? lastElementRef : null}>
              <Link to={`/${category}/${item.id}`}>
                {item.id}. {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет данных для этой категории</p>
      )}
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка загрузки: {error}</p>}
    </div>
  );
};

export default Category;
