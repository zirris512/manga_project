import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ loggedIn, setLoggedIn, user, setUser }) => {
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (redirect) {
            setRedirect(false);
            navigate("/");
        }
    }, [redirect, navigate]);

    const handleLogout = async (e) => {
        try {
            const response = await fetch("/api/logout", {
                method: "POST",
            });

            if (response.status !== 200) {
                throw new Error(response);
            } else {
                setLoggedIn(false);
                setUser(null);
                setRedirect(true);
            }
        } catch (err) {
            if (err) console.error(err);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/">
                            Home
                        </Link>
                        <Link className="nav-item nav-link" to="/anime-page">
                            Anime
                        </Link>
                        <Link className="nav-item nav-link" to="/manga-page">
                            Manga
                        </Link>
                        {loggedIn && (
                            <Link className="nav-item nav-link" to="/dashboard">
                                Dashboard
                            </Link>
                        )}
                    </div>
                    {loggedIn ? (
                        <>
                            <h3 className="ml-auto">Welcome, {user}</h3>
                            <button
                                className="ml-auto nav-link btn btn-danger btn-sm mt-2 my-auto pt-1"
                                onClick={handleLogout}
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
                            </button>
                        </>
                    ) : (
                        <Link className="ml-auto" to="/login">
                            <button className="nav-link btn btn-danger btn-sm mt-2 my-auto pt-1">
                                <FontAwesomeIcon icon={faSignInAlt} size="2x" />
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Nav;
