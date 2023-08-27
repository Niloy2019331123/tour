import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
// import useFetch from "../hooks/useFetch";
// import { get } from "mongoose";
import styles from "../styles/GetBookings.module.css";
import Loading from "../components/ui/Loading";
const GetBookings = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.user);
  const [isLoading, setIsLoading] = useState(false);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/api/v1/get-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData: authCtx.user,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTours(data.bookingsList);
        setIsLoading(false);
        console.log("api response", data);
      });
  }, [authCtx.user]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className={styles.header}>Your upcoming tours</h2>
      <section>
        <ul>
          {tours.length === 0
            ? null
            : tours.map((tour, index) => {
                return (
                  <li key={index} className={styles.listItem}>
                    <h3 className={styles.tourHeading}>{tour.tourName}</h3>

                    <div className={styles.tour}>
                      <section className={styles.tourDetails}>
                        <div>
                          <p className={styles.tourHolder}> {tour.fullName}</p>

                          <p className={styles.guestImageAndCount}>
                            <img
                              src="https://static.vecteezy.com/system/resources/previews/000/643/462/original/vector-group-people-icon.jpg"
                              alt=""
                            />
                            <span>{tour.guestSize}</span>
                          </p>
                        </div>
                        <div>
                          <h3 className={styles.tourTimeHolders}>
                            tour details
                          </h3>
                          <p
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            <span>Booked for:&nbsp;&nbsp;&nbsp;</span>
                            {new Date(tour.bookAt).toLocaleDateString("en-US")}
                          </p>

                          <p
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Phone: &nbsp;&nbsp;&nbsp;{tour.phone}
                          </p>
                        </div>
                      </section>
                    </div>
                  </li>
                );
              })}
        </ul>
      </section>
    </div>
  );
};

export default GetBookings;
