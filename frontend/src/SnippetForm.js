import React, { useState } from "react";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IconContext } from "react-icons/lib";

const SnippetForm = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [language, setLanguage] = useState("Plain Text");
    const [isTitleAvailable, setIsTitleAvailable] = useState(false);
    const [isCheckingTitle, setIsCheckingTitle] = useState(false);

    const availableLanguages = [
        "Plain Text",
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

    const renderSpinner = () => {
        if (isCheckingTitle) {
            return (
                <div className="input-group-append">
                    <span className="input-group-text">
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
                    </span>
                </div>
            );
        }
        if (isTitleAvailable) {
            return (
                <div className="input-group-append">
                    <span className="input-group-text">
                        <IconContext.Provider
                            value={{
                                color: "green",
                                size: "2em",
                            }}
                        >
                            <FaCheck />
                        </IconContext.Provider>
                    </span>
                </div>
            );
        }

        return (
            <div className="input-group-append">
                <span className="input-group-text">
                    <IconContext.Provider
                        value={{
                            color: "red",
                            size: "2em",
                        }}
                    >
                        <ImCross />
                    </IconContext.Provider>
                </span>
            </div>
        );
    };

    const handleTitleChange = async (e) => {
        const newTitle = e.target.value;
        if (/^[a-zA-Z0-9_-]*$/.test(newTitle)) {
            setTitle(newTitle);
        }

        try {
            setIsCheckingTitle(true);
            const response = await axios.post(
                `http://127.0.0.1:8000/api/utils/verify-title/`,
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
            setIsCheckingTitle(false);
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
                `http://127.0.0.1:8000/api/snippets/`,
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
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label" htmlFor="title">
                        Title
                    </label>
                    <div className="input-group mb-3">
                        <input
                            className="form-control"
                            id="title"
                            required
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            // style={{
                            //     borderColor: isLoading
                            //         ? "yellow"
                            //         : isTitleAvailable
                            //         ? "green"
                            //         : "red",
                            //     borderWidth: "5px",
                            // }}
                        />
                        {renderSpinner()}
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="text">
                        Text
                    </label>
                    <textarea
                        className="form-control"
                        id="text"
                        required
                        rows="7"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="language">
                        Language
                    </label>
                    <select
                        className="form-select"
                        id="language"
                        value={language}
                        onChange={handleLanguageChange}
                    >
                        {/* <option value="">Select Language</option> */}
                        {availableLanguages.map((lang, index) => (
                            <option key={index} value={lang}>
                                {lang}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <button type="submit" className="btn btn-primary">
                    Create Snippet
                </button>
            </form>
        </div>
    );
};

export default SnippetForm;
