import React, { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [responseMessage, setResponseMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false); // To control bounce effect

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                setResponseMessage("Message sent successfully!");
                setFormData({ name: "", email: "", message: "" }); // Reset form
                setIsSuccess(true); // Trigger bounce effect
                setTimeout(() => setIsSuccess(false), 3000); // Stop bounce after 3 seconds
            } else {
                setResponseMessage("Failed to send message.");
                setIsSuccess(false); // No bounce for failure
            }
        } catch (error) {
            setResponseMessage("An error occurred. Please try again.");
            setIsSuccess(false); // No bounce for error
            console.error(error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-16 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
            <p className="text-gray-700 text-center mb-6">
                We're here to help! If you have any questions or need assistance, feel free to contact us through the form below.
            </p>
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Full Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="you@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="message"
                        rows="4"
                        placeholder="Your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Send Message
                    </button>
                </div>
            </form>
            {responseMessage && (
                <p className={`text-center mt-4 ${isSuccess ? 'text-green-500 animate-bounce' : 'text-green-500'}`}>
                    {responseMessage}
                </p>
            )}
        </div>
    );
}
