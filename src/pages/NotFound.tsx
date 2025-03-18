
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1523] text-white">
      <div className="w-full max-w-md rounded-lg border border-gray-700 overflow-hidden">
        {/* Code editor top bar with traffic lights */}
        <div className="bg-[#1e2538] px-4 py-2 flex items-center">
          {/* Traffic lights */}
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
        </div>
        
        {/* Code editor content */}
        <div className="bg-[#1e2538] p-6 font-mono">
          <div className="four_zero_four_bg text-[#27c93f] mb-4">
            <span>.four_zero_four_bg h3&#123;</span>
            <div className="ml-6 text-[#6c9ef8]">font-size: 80px;</div>
            <span>&#125;</span>
          </div>
          
          <div className="link_404 text-[#27c93f] mb-4">
            <span>.link_404&#123;</span>
            <div className="ml-6 text-[#6c9ef8]">color: #fff!important;</div>
            <div className="ml-6 text-[#6c9ef8]">padding: 10px 20px;</div>
            <div className="ml-6 text-[#6c9ef8]">background: #39ac31;</div>
            <div className="ml-6 text-[#6c9ef8]">margin: 20px 0;</div>
            <div className="ml-6 text-[#6c9ef8]">display: inline-block;</div>
            <span>&#125;</span>
          </div>
          
          <div className="contant_box_404 text-[#27c93f] mb-4">
            <span>.contant_box_404&#123;</span>
            <div className="ml-6 text-[#6c9ef8]">margin-top:-50px;</div>
            <span>&#125;</span>
          </div>
          
          {/* Actual 404 message */}
          <div className="mt-8 contant_box_404">
            <h3 className="text-5xl font-bold mb-4">404</h3>
            <p className="text-xl mb-6">Sorry, the page you're looking for doesn't exist</p>
            <Link to="/">
              <Button 
                className="link_404 bg-[#39ac31] hover:bg-[#2d8a26] text-white border-none"
              >
                Go to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
