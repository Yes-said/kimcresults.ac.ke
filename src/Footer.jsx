export default function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="footer bg-blue-500 py-4">
        <div className="container mx-auto px-6 flex flex-wrap justify-between items-center">
          {/* Copyright Section */}
          <div className="flex items-center justify-center">
            <span className="text-white font-medium text-sm sm:text-base text-center">
              &copy; {currentYear} Kenya Institute Of Mass Communication. All rights reserved.
            </span>
          </div>
  
          <span className="text-white font-medium text-sm sm:text-base">
            Powered by Said.
          </span>
        </div>
      </footer>
    );
  }
  