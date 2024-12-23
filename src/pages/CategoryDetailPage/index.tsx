import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CharactersData, EpisodeData, LocationData } from "../../shared/types";
import { formatDate } from "../../shared/utils";
import { useLoadData } from "../../shared/hooks";
import { CATEGORY_API_MAP } from "../../shared/api";

const CategoryDetail = () => {
  const { id, category } = useParams();
  const navigate = useNavigate();

  const url = CATEGORY_API_MAP[category || ""] + `/${id}`;

  const { data, loading, error, fetchData } = useLoadData<
    CharactersData | EpisodeData | LocationData
  >(url, false);

  useEffect(() => {
    if (category && id) {
      fetchData(true);
    } else {
      navigate("/not-found");
    }
    // eslint-disable-next-line
  }, [category, id, navigate]);

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !data) {
    return <p>Error: {error || "Item not found"}</p>;
  }
  if (!("name" in data)) {
    return <p>Item does not have a name property</p>;
  }

  return (
    <div>
      <h2>{data?.name}</h2>
      {category === "characters" &&
        renderCharacterDetails(data as CharactersData)}
      {category === "episode" && renderEpisodeDetails(data as EpisodeData)}
      {category === "location" && renderLocationDetails(data as LocationData)}
    </div>
  );
};

export default CategoryDetail;
