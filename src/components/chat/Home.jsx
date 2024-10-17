import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import ChatBox from './ChatBox';
import chatBg from '../images/chat.jpg';

const Home = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false)

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible)
  }

  const handleChatClick = () => {
    setSidebarVisible(false)
  }

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${chatBg})` }}
      >
        <div className="flex flex-row items-center justify-center rounded-lg pt-10 px-3">
          {isSidebarVisible && (
            <div className="fixed inset-0 z-20 lg:hidden">
              <Sidebar onChatClick={handleChatClick} />
            </div>
          )}
          <div className="lg:w-1/3 sm:w-1/2 sm:h-full h-[80vh] hidden sm:block">
            <Sidebar onChatClick={handleChatClick} />
          </div>
          <div className="lg:w-4/6 sm:w-1/2 sm:h-full w-full h-[80vh]">
            <ChatBox onBackClick={toggleSidebar} />
          </div>
        </div>
      </div>
    </>



  );
};

export default Home;

// import React, { useState } from 'react';
// import Sidebar from './sidebar/Sidebar';
// import ChatBox from './ChatBox';
// import chatBg from '../images/chat.jpg';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';

// const Home = () => {
//   const [isSidebarVisible, setSidebarVisible] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarVisible(!isSidebarVisible);
//   };

//   const handleChatClick = () => {
//     setSidebarVisible(false);
//   };

//   return (
//     <>
//       {/* Background image and main container */}
//       <div
//         className="min-h-screen bg-cover bg-center relative"
//         style={{ backgroundImage: `url(${chatBg})` }}
//       >
//         {/* Dark overlay for background */}
//         <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

//         {/* Content container */}
//         <div className="relative z-10 flex flex-col lg:flex-row justify-center items-center min-h-screen lg:px-6">
//           {/* Sidebar toggle button for mobile */}
//           {!isSidebarVisible && (
//             <div className="lg:hidden absolute top-5 left-5 z-20">
//               <button
//                 onClick={toggleSidebar}
//                 className="text-white p-2 rounded-full bg-gray-800 hover:bg-gray-700"
//               >
//                 <FontAwesomeIcon icon={faBars} className='size-10' />
//               </button>
//             </div>
//           )}

//           {/* Sidebar for mobile with overlay */}
//           {isSidebarVisible && (
//             <div className="fixed inset-0 z-20 lg:hidden">
//               {/* Dark overlay for background when sidebar is visible */}
//               <div
//                 className="fixed inset-0 bg-black opacity-50"
//                 onClick={toggleSidebar}
//               ></div>
//               <div className="fixed inset-y-0 left-0 bg-white w-64 shadow-lg z-30 transition-transform transform">
//                 <Sidebar onChatClick={handleChatClick} />
//               </div>
//             </div>
//           )}

//           {/* Sidebar for larger screens */}
//           <div className="hidden lg:block lg:w-1/3 sm:w-1/2 h-[80vh]">
//             <Sidebar onChatClick={handleChatClick} />
//           </div>

//           {/* ChatBox container */}
//           <div className="lg:w-2/3 sm:w-1/2 w-full h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
//             <ChatBox onBackClick={toggleSidebar} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
