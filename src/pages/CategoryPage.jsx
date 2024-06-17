import { useState, useEffect, useCallback } from "react";
import "../styles/List.scss";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setListings } from "../redux/state";
import Loader from "../components/Loader";
import ListingCard from "../components/ListingCard";

const CategoryPage = () => {
  const [loading, setLoading] = useState(true);
  const { category } = useParams()

  const dispatch = useDispatch()
  const listings = useSelector((state) => state.listings);

  const getFeedListings = useCallback(async () => {
    try {
      const response = await fetch(
          `http://localhost:3001/properties?category=${category}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
    }
  }, [category, dispatch]);

  useEffect(() => {
    getFeedListings();
  }, [getFeedListings]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />
      <h1 className="title-list">{category} маршруты</h1>
      <div className="list">
        {listings?.map(
          ({
            _id,
            creator,
            listingPhotos,
           category,
            price,
            booking = false,
          }) => (
            <ListingCard
              key={_id}
              listingId={_id}
              creator={creator}
              listingPhotos={listingPhotos}
              category={category}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>
    
    </>
  );
};

export default CategoryPage;
