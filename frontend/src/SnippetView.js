import React, { useState, useEffect } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCopy } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

const SnippetView = () => {
    const { title } = useParams();
    const [snippet, setSnippet] = useState(null);
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        const fetchSnippet = async () => {
            try {
                const response = await axios.get(
                    `https://snippets-q9co.onrender.com/api/snippets/${title}`
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
                <ToastContainer className="p-3" position={"bottom-end"}>
                    <Toast
                        show={showToast}
                        onClose={() => setShowToast(!showToast)}
                        delay={3000}
                        autohide
                    >
                        <Toast.Header>
                            <strong className="me-auto">Snippet Share</strong>
                        </Toast.Header>
                        <Toast.Body>
                            Snippet copied<span> </span>
                            <IconContext.Provider
                                value={{
                                    color: "green",
                                    size: "1.2em",
                                }}
                            >
                                <FaCheck />
                            </IconContext.Provider>
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            )}
        </div>
    );
};

export default SnippetView;
