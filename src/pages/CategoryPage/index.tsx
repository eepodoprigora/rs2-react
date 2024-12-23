import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";

import { CharactersData, EpisodeData, LocationData } from "../../shared/types";
import { useLoadData } from "../../shared/hooks";
import { CATEGORY_API_MAP } from "../../shared/api";

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
  >(CATEGORY_API_MAP[category || ""], true);

  useEffect(() => {
    if (isCategoryValid) {
      fetchData(true);
    }
    // eslint-disable-next-line
  }, [category, isCategoryValid]);

  useEffect(() => {
    const lastElement = lastElementRef.current;

    if (loading || !hasMore || !lastElement) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData(false);
      }
    });

    observerRef.current.observe(lastElement);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loading, hasMore, fetchData]);
  if (!isCategoryValid || !category) {
    return null;
  }

  const categoryRu = CATEGORY_RU_MAP[category];

  const isDataArray = Array.isArray(data);

  return (
    <div>
      <h1>Список {categoryRu}</h1>
      {isDataArray && data.length > 0 ? (
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
