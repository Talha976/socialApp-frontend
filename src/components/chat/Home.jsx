import { useState } from 'react';
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
        <div className="flex flex-row gap-5 items-center justify-center rounded-lg px-3">
          {isSidebarVisible && (
            <div className="fixed inset-0 z-20 lg:hidden">
              <Sidebar onChatClick={handleChatClick} />
            </div>
          )}
          <div className="lg:w-1/3 sm:w-1/2 sm:h-full hidden sm:block">
            <Sidebar onChatClick={handleChatClick} />
          </div>
          <div className="lg:w-4/6 sm:w-1/2 sm:h-full w-full ">
            <ChatBox onBackClick={toggleSidebar} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
