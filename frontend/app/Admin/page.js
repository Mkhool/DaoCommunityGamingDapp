'use client'

import Admin from "../components/Admin";
import NavBar from "../components/NavBar";
import DailyInterestRateComponent from "../components/DailyInterestRateComponent";

const Page = () => {
  return (
    <div>
      <NavBar/>
 <Admin/>
 <DailyInterestRateComponent/>
    </div>
  );
};

export default Page;