import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import SnippetForm from "./SnippetForm";
import SnippetView from "./SnippetView";

const App = () => {
    return (
        <Router>
            <h1>Snippet Share</h1>
            <Routes>
                <Route exact path="/" Component={SnippetForm} />
                <Route path="/:title" Component={SnippetView} />
            </Routes>
        </Router>
    );
};

export default App;
