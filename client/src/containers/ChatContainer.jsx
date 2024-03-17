import React, { useState } from 'react';
import { Avatar1, Avatar2, Avatar3, ChatHero } from '../assets';
import { FaUsers } from 'react-icons/fa6';
import { BsFillSendFill, BsThreeDots } from 'react-icons/bs';
import moment from 'moment';

const ChatContainer = () => {
  const [messages, setMessages] = useState([
    {
      image: Avatar1,
      message: 'Hi I want to withdraw everything..!This is awesome',
      time: `${Date.now()}`,
      isSender: true
    },
    {
      image: Avatar2,
      message: "Hey guys...How you all doing...It's been so long",
      time: `${Date.now()}`,
      isSender: false
    },
    {
      image: Avatar1,
      message: 'We are fine....What about you',
      time: `${Date.now()}`,
      isSender: true
    },
    {
      image: Avatar3,
      message: 'Awesome Buddy....',
      time: `${Date.now()}`,
      isSender: false
    }
  ]);

  const [value, setValue] = useState('');

  const sendMessage = () => {
    setMessages([
      ...messages,
      { image: Avatar1, message: value, time: `${Date.now()}` }
    ]);
    setValue('');
  };
  return (
    <div className="flex h-[calc(100vh-120px)] w-full flex-1 flex-col overflow-hidden rounded-[50px] bg-[#222222] shadow-lg">
      {/* top */}
      <div className="flex w-full items-center justify-between bg-[#2B2B2B] px-4">
        <div className="flex flex-col items-start justify-start gap-2 px-3">
          {/* title */}
          <div className="flex items-center justify-center gap-1">
            <FaUsers className="text-lg text-secondary" />
            <p className="text-base font-medium text-secondary">General Chat</p>
          </div>

          {/*online counts */}
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center justify-center">
              <img
                src={Avatar1}
                className="size-8 rounded-full object-cover"
                alt=""
              />
              <img
                src={Avatar2}
                className="-ml-2 size-8 rounded-full object-cover"
                alt=""
              />
              <img
                src={Avatar3}
                className="-ml-2 size-8 rounded-full object-cover"
                alt=""
              />
            </div>

            <p className="text-sm text-white">
              Online : <span className="font-medium text-secondary">172</span>
            </p>
          </div>
        </div>
        <img src={ChatHero} className="h-auto w-40 object-contain" alt="" />
      </div>

      {/* messages */}
      <div className="w-full flex-grow overflow-y-scroll px-4 py-2 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-500">
        {messages &&
          messages.map((msg, index) => (
            <>
              {msg.isSender ? (
                <Sender msg={msg} key={index} />
              ) : (
                <Reciever msg={msg} key={msg.time} />
              )}
            </>
          ))}
      </div>

      {/* bottom */}
      <div className="flex h-24 w-full items-center justify-center gap-2 bg-[#2B2B2B] px-6 py-4">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Send a message ..."
          className="flex-1 border-none bg-transparent text-[#9d9d9d] outline-none placeholder:text-[#5d5d5d]"
        />
        <div className="h-6 w-[1px] bg-third"></div>
        <BsFillSendFill
          onClick={sendMessage}
          className="cursor-pointer text-lg text-heroPrimary transition-all duration-300 ease-in-out hover:text-opacity-80"
        />
      </div>
    </div>
  );
};

export const Reciever = ({ msg }) => {
  return (
    <div className="mb-4 w-full rounded-2xl bg-[#1B1B1B] px-2 py-3 shadow-lg shadow-[rgba(0,0,0,0.4)]">
      <div className=" flex items-start justify-between gap-2">
        <img
          src={msg?.image}
          className="h-12 w-12 rounded-full object-cover"
          alt=""
        />
        <p className="flex-1 text-left text-sm text-zinc-300">{msg?.message}</p>

        <BsThreeDots className="text-2xl text-zinc-300" />
      </div>
      <div className="flex items-center justify-end px-4">
        <p className="text-sm text-zinc-500">
          {moment(new Date(parseInt(msg?.time)).toISOString()).fromNow()}
        </p>
      </div>
    </div>
  );
};

export const Sender = ({ msg }) => {
  return (
    <div className="mb-4 w-full rounded-2xl bg-gradient-to-b from-[#353535] to-[#353535] px-2 py-3 shadow-lg shadow-[rgba(0,0,0,0.4)]">
      <div className=" flex items-start justify-between gap-2">
        <img
          src={msg?.image}
          className="h-12 w-12 rounded-full object-cover"
          alt=""
        />
        <p className="flex-1 text-left text-sm text-zinc-300">{msg?.message}</p>

        <BsThreeDots className="text-2xl text-zinc-300" />
      </div>
      <div className="flex items-center justify-end px-4">
        <p className="text-sm text-zinc-500">
          {moment(new Date(parseInt(msg?.time)).toISOString()).fromNow()}
        </p>
      </div>
    </div>
  );
};

export default ChatContainer;

