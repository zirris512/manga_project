import React, { useState, useEffect } from "react";
import "bootswatch/dist/darkly/bootstrap.min.css";
import "./style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ListPage from "./pages/ListPage";
import SinglePage from "./pages/SinglePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Jumbotron from "./components/Jumbotron/index";
import Nav from "./components/Nav/index";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";

const cache = new InMemoryCache({
    typePolicies: {
        Page: {
            keyFields: ["pageInfo", ["currentPage"]],
        },
    },
});
const link = new HttpLink({
    uri: "https://graphql.anilist.co",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    useGETForQueries: false,
});

const client = new ApolloClient({
    cache,
    link,
});

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [favList, setFavList] = useState([]);

    useEffect(() => {
        const checkUser = async () => {
            const data = await fetch("/api/user");
            const response = await data.json();

            if (response.user) {
                setLoggedIn(true);
                setUser(response.user.user);

                fetch("/api/populate")
                    .then((response) => response.json())
                    .then((data) => {
                        const favoriteArr = data.favorites;
                        setFavList(favoriteArr);
                    });
            } else {
                setLoggedIn(false);
                setUser(null);
            }
        };
        checkUser();
    }, [loggedIn]);

    return (
        <ApolloProvider client={client}>
            <Jumbotron />
            <Router>
                <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} user={user} setUser={setUser} />
                <Routes>
                    <Route
                        path="/single-page/:type/:id"
                        element={
                            <SinglePage
                                loggedIn={loggedIn}
                                favList={favList}
                                setFavList={setFavList}
                            />
                        }
                    />
                    <Route path="/" element={<Home />} />
                    <Route path="/anime-page" element={<ListPage type="ANIME" />} />
                    <Route path="/manga-page" element={<ListPage type="MANGA" />} />
                    <Route
                        path="/login"
                        element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />}
                    />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <Dashboard
                                loggedIn={loggedIn}
                                favList={favList}
                                setFavList={setFavList}
                            />
                        }
                    ></Route>
                </Routes>
            </Router>
        </ApolloProvider>
    );
};

export default App;
