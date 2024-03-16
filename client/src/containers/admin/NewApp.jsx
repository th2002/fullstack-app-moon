import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { serverTimestamp } from 'firebase/firestore';

import { saveAppDataToCloud } from 'api';
import useApps from 'hooks/useApps';
import { InputContainer } from 'components';
import { FaMinus, FaPlus } from 'react-icons/fa';

const NewApp = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [appIcon, setAppIcon] = useState('');
  const [reviews, setReviews] = useState('');
  const [totalReviews, setTotalReviews] = useState('');
  const [dowloads, setDowloads] = useState('');
  const [cover, setCover] = useState('');
  const [banners, setBanners] = useState([]);
  const [shortDes, setShortDes] = useState('');

  const { refetch: refetchAllApps } = useApps();

  const bannerHandleChange = (id, value) => {
    const updated = banners.map(item =>
      item.id === id ? { ...item, url: value } : item
    );
    setBanners(updated);
  };

  const handleAddInput = () => {
    const newInput = {
      id: banners.length + 1,
      url: ''
    };

    setBanners(prevState => [...prevState, newInput]);
  };

  const handleRemoveInput = id => {
    const updatedBanners = banners.filter(item => item.id !== id);
    setBanners(updatedBanners);
  };

  const saveTheDoc = async () => {
    const id = `${Date.now()}`;
    const timeStamp = serverTimestamp();
    const _doc = {
      _id: id,
      title,
      company,
      appIcon,
      reviews,
      totalReviews,
      dowloads,
      cover,
      banners,
      shortDes,
      timeStamp
    };
    await saveAppDataToCloud(_doc).then(() => {
      clearAllFileds();
      toast.success('Data saved in the cloud');
      refetchAllApps();
    });
  };

  const clearAllFileds = () => {
    setTitle('');
    setCompany('');
    setAppIcon('');
    setReviews('');
    setTotalReviews('');
    setDowloads('');
    setCover('');
    setBanners([]);
    setShortDes('');
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-4 px-4 py-3">
      <InputContainer
        placeholder="App title here."
        onChangeText={data => setTitle(data)}
        stateValue={title}
      />

      <InputContainer
        placeholder="Cover image url here."
        onChangeText={data => setCover(data)}
        stateValue={cover}
      />

      <div className="flex w-full flex-col items-center justify-start gap-2 rounded-md border border-dashed border-gray-600 p-2">
        {banners.map(input => (
          <div
            key={input.id}
            className="flex w-full items-center justify-center gap-2"
          >
            <input
              spellCheck="false"
              type="text"
              placeholder={'Banner input url'}
              value={input.url}
              onChange={e => bannerHandleChange(input.id, e.target.value)}
              className="h-12 w-full rounded-md border border-third bg-secondary px-4 font-sans text-lg font-semibold shadow-md outline-none"
            />

            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-md bg-red-400"
              onClick={() => handleRemoveInput(input.id)}
            >
              <FaMinus className="text-textPrimary" />
            </button>
          </div>
        ))}

        <button
          type="button"
          className="flex w-full items-center justify-center"
          onClick={handleAddInput}
        >
          <FaPlus />
        </button>
      </div>

      <InputContainer
        placeholder="Company name here."
        onChangeText={data => setCompany(data)}
        stateValue={company}
      />

      <InputContainer
        placeholder="App icon image url here."
        onChangeText={data => setAppIcon(data)}
        stateValue={appIcon}
      />

      <InputContainer
        placeholder="App review here."
        onChangeText={data => setReviews(data)}
        stateValue={reviews}
      />

      <InputContainer
        placeholder="Total reviews here."
        onChangeText={data => setTotalReviews(data)}
        stateValue={totalReviews}
      />

      <InputContainer
        placeholder="Total dowloads here."
        onChangeText={data => setDowloads(data)}
        stateValue={dowloads}
      />

      <textarea
        spellCheck="false"
        cols="0"
        rows="10"
        placeholder="Description here."
        value={shortDes}
        onChange={e => setShortDes(e.target.value)}
        className="w-full rounded-md border border-third bg-secondary p-4 font-sans text-lg font-semibold shadow-md outline-none"
      />

      <div className="flex w-full items-center justify-end gap-10">
        <button
          type="button"
          className="rounded-md border border-gray-600 px-8 py-2 transition-all duration-100 ease-in-out hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary hover:to-heroSecondary hover:text-black active:scale-95"
          onClick={saveTheDoc}
        >
          Add
        </button>
        <button
          type="button"
          className="rounded-md border border-gray-600 px-8 py-2 transition-all duration-100 ease-in-out hover:border-none hover:bg-gradient-to-br hover:from-heroPrimary hover:to-heroSecondary hover:text-black active:scale-95"
          onClick={clearAllFileds}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default NewApp;

