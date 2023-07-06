import React, { useState } from "react";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";

const SnippetForm = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [language, setLanguage] = useState("");
    const [isTitleAvailable, setIsTitleAvailable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const availableLanguages = [
        "Python",
        "JavaScript",
        "Java",
        "C#",
        "C++",
        "TypeScript",
        "PHP",
        "Ruby",
        "Go",
        "Swift",
        "Kotlin",
        "Rust",
        "Objective-C",
        "Perl",
        "Scala",
        "Shell",
        "R",
        "MATLAB",
        "Groovy",
        "Lua",
        "Dart",
        "Haskell",
        "Julia",
        "PowerShell",
        "VBA",
        "F#",
        "Ada",
        "COBOL",
        "Fortran",
        "Lisp",
    ];

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

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const snippetData = {
            title,
            text,
            language,
        };

        try {
            const response = await axios.post(
                "http://localhost:8000/api/snippets/",
                snippetData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("snippet created response:", response.data);

            if (response.data.status === "true") {
                window.location.href = `/${response.data.title}`;
            }
        } catch (error) {
            console.error("Error creating snippet:", error);
        }
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
                <select value={language} onChange={handleLanguageChange}>
                    <option value="">Select Language</option>
                    {availableLanguages.map((lang, index) => (
                        <option key={index} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <button type="submit">Create Snippet</button>
        </form>
    );
};

export default SnippetForm;
