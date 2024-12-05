import React, { useEffect, useState } from "react";
import Header from "../../shared/components/Header/Header";
import {
  axiosInstance,
  imageUrl,
  USER_RECIEPE_URLS,
} from "../../../services/Urls/urls";
import NoData from "../../shared/components/Nodata/NoData";
import defaultImg from "../../../assets/imgs/freepik--Character--inject-70.png";

export default function FavouriteList() {
  const [favList, setFavList] = useState([]);
  const getFavList = async () => {
    try {
      let response = await axiosInstance.get(USER_RECIEPE_URLS.GET_FAVS);
      console.log(response);
      setFavList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteFav = async (id) =>{
    try {
      let response = await axiosInstance.delete(USER_RECIEPE_URLS.REMOVE_FROM_FAVS(id))
      console.log(response);
      getFavList()
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getFavList();
  }, []);
  return (
    <div className="overflow-hidden">
      <Header
        title={"Favourite List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
      />
      <div className="container my-3">
        <div className="row p-5 g-5">
          {favList.length > 0 ? (
            favList.map((favItem) => (
              <div className="col-lg-4 shadow-lg ">
                <div className="item d-flex justify-content-between align-items-center flex-column">
                  <img
                    src={
                      favItem?.recipe?.imagePath
                        ? `${imageUrl}/${favItem?.recipe?.imagePath}`
                        : defaultImg
                    }
                    alt=""
                    className="img-fluid rounded-4"
                    height={100}
                  />
                  <h4>{favItem.recipe.name}</h4>
                  <p>{favItem.recipe.description}</p>
                  <button className="my-3 border-none text-bg-danger" onClick={()=>deleteFav(favItem.id)}>Remove from favourites</button>
                </div>
              </div>
            ))
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </div>
  );
}
