import "../styles/List.scss";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";

const PropertyList = () => {
  const [loading, setLoading] = useState(true)
  const user = useSelector((state) => state.user)
  const propertyList = user?.propertyList;
  console.log(user)

  const dispatch = useDispatch()
  const getPropertyList = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${user._id}/properties`, {
        method: "GET"
      })
      const data = await response.json()
      console.log(data)
      dispatch(setPropertyList(data))
      setLoading(false)
    } catch (err) {
      console.log("Fetch all properties failed", err.message)
    }
  }

  useEffect(() => {
    getPropertyList()
  }, [])

  return loading ? <Loader /> : (
    <>
      <Navbar />
      <h1 className="title-list">Мои путешествия</h1>
      <div className="list">
        {propertyList?.map(
          (property) => (
            <ListingCard
              key={property._id} // Уникальный ключ
              listingId={property._id}
              creator={property.creator}
              listingPhotoPaths={property.listingPhotoPaths}
              category={property.category}
              price={property.price}
              booking={property.booking || false}
            />
          )
        )}
      </div>
    </>
  );
};

export default PropertyList;
