import React from 'react';
import { MdHeartBroken } from "react-icons/md";


type Props = {}

const ErrorPage = (props: Props) => {
  return (
    <div className="w-full h-[70dvh] flex flex-col justify-center items-center">
      <MdHeartBroken 
        size={100}
        className="text-gray-700"
      />

      <span className="pt-[18px]"></span>

      <h1 className="text-lg text-center text-gray-800 font-semibold">
        Uh oh!
      </h1>
      <h2 className="text-sm text-center text-gray-500">
        It seems like something had gone wrong...
      </h2>

      <span className="pt-[24px]"></span>

      <p className="text-xs text-center text-gray-500">
        Please 
        {" "}

        <a 
          target="_blank"
          href="mailto:jeremyalvax@gmail.com"
          title="jeremyalvax(at)gmail(dot)com"
          className="underline hover:cursor-pointer hover:text-primary-600 duration-200"
        >
          contact us
        </a>

        {" "}
        to troubleshoot
      </p>
    </div>
  );
}

export default ErrorPage;