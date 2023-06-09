import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Head from "next/head";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import IconButton from "@mui/material/IconButton";
import Loader from "../components/Loader";
import _ from "lodash";

import { db } from "../config/FirebaseConfig";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import DetailsCard from "../components/DetailsCard";

const history = (props) => {
  const [data, setData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedList, setPaginatedList] = useState([]);

  useEffect(() => {
    try {
      const fetchSessions = async () => {
        setData([]);
        const colRef = collection(db, "reports");
        const q = query(colRef, orderBy("date", "asc"));
        const querySnapshot = await getDocs(q);
        const filterData = async (querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setData((prevItem) => [...prevItem, doc.data()]);
          });
        };
        await filterData(querySnapshot);
        setIsLoading(false);
      };

      fetchSessions();
    } catch (error) {
      alert(error);
    }
  }, []);

  useEffect(() => {
    setPaginatedList(_(data)?.slice(0).take(pageSize).value());
  }, [data]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const paginated = _(data)?.slice(startIndex).take(pageSize).value();
    setPaginatedList(paginated);
  }, [currentPage, data]);

  const pageSize = 3;

  const pageCount = data ? Math.ceil(data.length / pageSize) : 0;

  const pages = _.range(1, pageCount + 1);

  const paginationNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage((prevValue) => prevValue + 1);
    }
  };

  const paginationPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevValue) => prevValue - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-700 via-gray-900 to-black justify-start items-center">
      <Head>
        <title>PomoFocus</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="w-full">
        <TopNav />
      </header>
      <div className="min-h-screen w-full flex flex-col justify-center items-center">
        {props.currentUser.isLoggedIn ? (
          isLoading ? (
            <Loader />
          ) : (
            <div className="min-h-screen w-full flex flex-col justify-start sml:p-6 items-center">
              <div className="lar:w-6/12 sml:w-4/5 w-full flex justify-start items-center pb-4 sml:py-6 flex-col">
                <div className="flex flex-col w-full justify-center items-center ">
                  <p className="bg-gradient-to-r  mb-4 mt-2 font-semibold from-fuchsia-500 via-red-600 to-orange-400 bg-clip-text text-transparent text-lg font-kumbh tracking-widest whitespace-nowrap">
                    REPORTS
                  </p>
                </div>
                <div className="mid:min-h-[250px]  min-h-[200px]  text-gray-500 sml:w-full w-11/12">
                  {paginatedList.length != 0 ? (
                    paginatedList.map((item, index) => {
                      return (
                        <DetailsCard
                          key={index}
                          title={item.title}
                          img={item.img}
                          date={item.date}
                          type={item.type}
                          contact={item.contact}
                          description={item.description}
                        />
                      );
                    })
                  ) : (
                    <div className="mid:min-h-[248px]  min-h-[198px]  w-full flex justify-center items-center">
                      <p className="text-xs sml:text-sm">
                        No sessions registered yet, start focusing 🎯
                      </p>
                    </div>
                  )}
                </div>

                {paginatedList.length != 0 && (
                  <div className="flex justify-center items-center mt-6 space-x-4">
                    <IconButton
                      className="text-slate-400"
                      onClick={paginationPrevious}
                    >
                      <NavigateBeforeIcon
                        className="text-slate-400 hover:text-white "
                        sx={{ width: 35, height: 35 }}
                      />
                    </IconButton>
                    <p className="text-white text-semibold">{currentPage}</p>
                    <IconButton
                      className="text-slate-400 "
                      onClick={paginationNext}
                    >
                      <NavigateNextIcon
                        className="text-slate-400 hover:text-white "
                        sx={{ width: 35, height: 35 }}
                      />
                    </IconButton>
                  </div>
                )}
              </div>
            </div>
          )
        ) : (
          <div className="text-white text-lg font-bold p-8 text-center w-full">
            <p>You need to be logged in to view Detailed Reports 📒</p>
          </div>
        )}
      </div>
      <footer className="w-10/12">
        <Footer />
      </footer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({ type: "SET_USER", value: user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(history);
