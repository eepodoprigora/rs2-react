import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CharactersData, EpisodeData, LocationData } from "../data/types";
import { formatDate } from "../utils";
import characters from "../data/characters.json";
import location from "../data/location.json";
import episode from "../data/episode.json";

type selectionTypes = CharactersData | EpisodeData | LocationData | null;

export const CategoryDetail = () => {
  const { id, category } = useParams();
  const [item, setItem] = useState<selectionTypes>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const dataMap: Record<string, selectionTypes[]> = {
      characters,
      location,
      episode,
    };

    if (!category || !dataMap[category]) {
      navigate("/not-found");
      return;
    }
    const selectedItem = id
      ? dataMap[category].find((item) => item?.id === +id)
      : null;

    if (!selectedItem) {
      navigate("/not-found");
    } else {
      setItem(selectedItem);
    }
  }, [id, category, navigate, setItem]);

  const renderCharacterDetails = (item: CharactersData) => (
    <>
      <p>Status: {item.status}</p>
      <p>Species: {item.species}</p>
      <p>Type: {item.type}</p>
      <p>Gender: {item.gender}</p>
      <img src={item.image} alt={item.name} />
      <p>Created: {formatDate(item.created)}</p>
    </>
  );

  const renderEpisodeDetails = (item: EpisodeData) => (
    <>
      <p>Air Date: {item.air_date}</p>
      <p>Episode: {item.episode}</p>
      <p>Created: {formatDate(item.created)}</p>
    </>
  );

  const renderLocationDetails = (item: LocationData) => (
    <>
      <p>Type: {item.type}</p>
      <p>Dimension: {item.dimension}</p>
      <p>Created: {formatDate(item.created)}</p>
    </>
  );

  return (
    <div>
      {item && (
        <>
          <h2>{item.name}</h2>
          {category === "characters" &&
            renderCharacterDetails(item as CharactersData)}
          {category === "episode" && renderEpisodeDetails(item as EpisodeData)}
          {category === "location" &&
            renderLocationDetails(item as LocationData)}
        </>
      )}
    </div>
  );
};
