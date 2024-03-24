'use client'
import ChatBox from '../components/ChatBox';
import NavBar from '../components/NavBar';
import TwitchStream from '../components/TwitchStream';

const Page = () => {
  return (
    <div>
        <NavBar/>
      <TwitchStream channelName="otplol_" />
      <ChatBox/>
    </div>
  );
};

export default Page;