import React, { useState } from "react";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

const SnippetForm = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [language, setLanguage] = useState("");
    const [isTitleAvailable, setIsTitleAvailable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleTitleChange = async (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);

        try {
            setIsLoading(true);
            const response = await axios.post(
                "http://localhost:8000/api/utils/verify-title/",
                { title: newTitle },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response.data);
            setIsTitleAvailable(response.data.status === "true");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Rest of the code to handle form submission
    };

    return (
        <form onSubmit={handleSubmit}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        style={{
                            borderColor: isLoading
                                ? "yellow"
                                : isTitleAvailable
                                ? "green"
                                : "red",
                            borderWidth: "5px",
                        }}
                    />
                </label>
                {isLoading && (
                    <ThreeCircles
                        height="30"
                        width="30"
                        color="#4fa94d"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel="three-circles-rotating"
                        outerCircleColor=""
                        innerCircleColor=""
                        middleCircleColor=""
                        style={{
                            marginLeft: "10px",
                        }}
                    />
                )}
            </div>
            <label>
                Text:
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </label>
            <br />
            <label>
                Language:
                <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Create Snippet</button>
        </form>
    );
};

export default SnippetForm;
