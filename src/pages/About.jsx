import students from "../assets/students.jpg";

export default function About() {
    return (
        <div className="bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                        About Us
                    </h2>
                    <p className="text-xl text-gray-600">
                        Empowering the next generation with knowledge and skills
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="lg:w-1/2">
                        <img
                            src={students}
                            alt="Students"
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    </div>
                    <div className="lg:w-1/2">
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Welcome to the Kenya Institute of Mass Communication (KIMC) Student 
                            Result Management System, a modern, web-based platform designed to
                            streamline the process of result dissemination for students and staff. 
                            This system was developed with the goal of improving efficiency, accuracy, 
                            and accessibility in the way academic results are managed and delivered.
                        </p>
                    </div>
                </div>

                <div className="bg-white p-8 mt-12 rounded-lg shadow-lg">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Our Mission
                    </h3>
                    <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                        Our mission is to provide students with secure and instant access to
                         their academic results from anywhere, at any time. We aim to ensure 
                         that the result dissemination process is timely, efficient, and highly
                          accurate, while also being accessible for both students,staff and parents. 
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed text-center">
                        By modernizing this process, KIMC aligns with global educational trends
                         and enhances the student experience, reducing errors and improving 
                         overall accessibility.
                    </p>
                </div>
            </div>
        </div>
    );
}
