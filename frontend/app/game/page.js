'use client'
import ChatBox from '../components/ChatBox';
import NavBar from '../components/NavBar';
import PlayGame from '../components/PlayGame';
import TwitchStream from '../components/TwitchStream';

const Page = () => {
  return (
    <div>
        <NavBar/>
      {/* <TwitchStream channelName="otplol_" />
      <ChatBox/> */}
      <PlayGame/>

    </div>
  );
};

export default Page;