import { Link } from "react-router-dom"; // Import Link from react-router-dom
import News from "./News";
import Dashboard from "./Dashboard";

export default function IndexPage() {
   

    return (
        <>
            {/* Overflowing Banner */}
            <div className="relative bg-gradient-to-r from-green-400 to-blue-600 text-white text-center py-16 shadow-lg">
                <h1 className="text-4xl font-bold tracking-wide animate-bounce">
                    Welcome to the Student Result Management Portal!
                </h1>
                <p className="mt-4 text-lg">Manage your courses, stay updated, and much more</p>
                {/* Overflow effect */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-8 bg-white rounded-t-full shadow-md"></div>
            </div>

           
<Dashboard />
           
<div className="flex justify-center gap-4 ">
{/* Link to About Page */}
<div className="text-center my-8">
                <Link 
                    to="/about" 
                    className="relative inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200 transform hover:scale-105"
                >
                    Learn More About Us
                    <span className="ml-2 inline-block transition-transform duration-200 transform group-hover:translate-x-1">→</span>
                </Link>
            </div>

              
</div>
            


            {/* News Section */}
            <div className="my-8 px-4">
                <News />
            </div>

          
           {/* Contact Information Section */}
<div className="bg-gray-100 py-8 px-4 text-center mt-8">
    <h2 className="text-xl font-bold mb-4">Contact Us</h2>
    <p className="text-gray-700">For any inquiries, feel free to reach out to us:</p>
    
    <div className="mt-4">
        <p className="mt-2">🏢 Location: Kenya Institute of Mass Communication, Nairobi</p>
        <p className="mt-2">📞 Phone: +254 700 123 456</p>
        <p className="mt-1">✉️ Email: info@yourdomain.com</p>
    </div>

    <div className="mt-4">
        <Link
            to="/contact"
            className="inline-block bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
            Contact Us
        </Link>
    </div>
</div>

        </>
    );
}
