import { faPen, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React, { useState } from 'react';
import Modal from '../commonComponents/Modal';
import html from '../images/html.jpeg';
import css from '../images/css.png';
import js from '../images/js.png';
import react from '../images/react.png';
import node from '../images/node.png';

const Skills = () => {
  const [skill, setSkill] = useState(false);
  const [editSkill, seteditSkill] = useState(false);

  const handleSkill = () => {
    setSkill(!skill);
  };

  const handleEditSkill = () => {
    seteditSkill(!editSkill);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3, 
          slidesToScroll: 1,
        },
      },
    ],
  };

  const skills = [
    { id: 1, name: 'HTML', imageSkill: html },
    { id: 2, name: 'CSS', imageSkill: css },
    { id: 3, name: 'JavaScript', imageSkill: js },
    { id: 4, name: 'React js', imageSkill: react },
    { id: 5, name: 'Node js', imageSkill: node },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="flex gap-4">
          <button onClick={handleSkill} className="text-gray-600">
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button onClick={handleEditSkill} className="text-gray-600">
            <FontAwesomeIcon icon={faPen} />
          </button>
        </div>
      </div>
      <div className="p-5 rounded-md bg-gradient-to-r from-blue-100 to-blue-500">
        <Slider {...settings} className="w-full">
          {skills.map((s) => (
            <div key={s.id} className="flex justify-center items-center p-4">
              <div className="flex flex-col items-center bg-white p-3 rounded-md shadow-lg">
                <img src={s.imageSkill} alt={s.name} className="rounded-full w-24 h-24 lg:w-36 lg:h-36" />
                <h5 className="mt-2 text-center font-semibold">{s.name}</h5>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Modal show={skill} handleClose={handleSkill} title="Add Skill">
        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Skill Name" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" />
          <input type="file" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" />
        </div>
      </Modal>
      <Modal show={editSkill} handleClose={handleEditSkill} title="Edit Skill">
        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Skill Name" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" />
          <input type="file" className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none" />
        </div>
      </Modal>
    </div>
  );
};

export default Skills;
