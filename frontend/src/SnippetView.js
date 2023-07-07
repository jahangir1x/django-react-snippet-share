import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCopy } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

const SnippetView = () => {
    const { title } = useParams();
    const [snippet, setSnippet] = useState(null);
    const [showToast, setShowToast] = useState(false);

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

    const handleCopyClick = () => {
        if (snippet) {
            navigator.clipboard.writeText(snippet.text);
            setShowToast(true);
            console.log("toast", showToast);
            // setTimeout(() => {
            //     setShowToast(false);
            // }, 3000);
        }
    };

    return (
        <div>
            <h2 className="h2">{snippet.title}</h2>
            <div style={{ position: "relative" }}>
                <textarea
                    className="form-control"
                    value={snippet.text}
                    readOnly
                    rows="5"
                />
                <div
                    className="copy-icon"
                    onClick={handleCopyClick}
                    style={{
                        position: "absolute",
                        top: "1rem",
                        right: "2rem",
                        cursor: "pointer",
                    }}
                >
                    {" "}
                    <IconContext.Provider
                        value={{ color: "blue", size: "2em" }}
                    >
                        <FaCopy />
                    </IconContext.Provider>
                </div>
            </div>
            <p>
                Language: <b>{snippet.language}</b>
            </p>
            {showToast && (
                <div
                    className="toast"
                    style={{
                        position: "fixed",
                        top: "1rem",
                        right: "1rem",
                        zIndex: 1000,
                    }}
                >
                    <div className="toast-header">
                        {/* <img src="..." className="rounded me-2" alt="..." /> */}
                        <strong className="me-auto">Snippet Share</strong>
                        <button type="button" className="btn-close"></button>
                    </div>
                    <div className="toast-body">Snippet copied!</div>
                </div>
            )}
        </div>
    );
};

export default SnippetView;
