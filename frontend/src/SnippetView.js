import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SnippetView = () => {
    const { title } = useParams();
    const [snippet, setSnippet] = useState(null);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/api/snippets/${title}`
                );
                if (response.data.status === "true") {
                    setSnippet(response.data);
                } else if (response.data.status === "false") {
                    setSnippet("null");
                }
            } catch (error) {
                console.error("Error fetching snippet:", error);
            }
        };
        fetchSnippet();
    }, [title]);

    if (!snippet) {
        return <div>Loading...</div>;
    }

    if (snippet === "null") {
        return <div>Snippet does not exist!</div>;
    }

    return (
        <div>
            <h2>{snippet.title}</h2>
            <p>{snippet.text}</p>
            <p>Language: {snippet.language}</p>
        </div>
    );
};

export default SnippetView;
