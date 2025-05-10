import React from "react";

const footer = () => {
  return (
    <footer className="border-t border-gray-200 pt-12 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="font-bold text-2xl mb-4">ZenCycle</div>
          <p className="text-gray-600 mb-4">
            Building a safer crypto environment through trust networks and
            verification.
          </p>
        </div>

        <div>
          <h4 className="font-bold mb-4">Links</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-[#BABABA]"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-[#BABABA]"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-[#BABABA]"
              >
                How It Works
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-[#BABABA]"
              >
                Community
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-[#BABABA]"
              >
                Help Center
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-[#BABABA]"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-[#BABABA]"
              >
                Terms of Service
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-[#BABABA]"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-500 text-sm mb-4 md:mb-0">
          © 2025 ZenCycle. All rights reserved.
        </p>
        <div className="flex items-center">
          <div className="h-1 w-1 bg-[#BABABA] rounded-full mx-2"></div>
          <span className="text-gray-500 text-sm">Privacy Policy</span>
          <div className="h-1 w-1 bg-[#BABABA] rounded-full mx-2"></div>
          <span className="text-gray-500 text-sm">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default footer;
