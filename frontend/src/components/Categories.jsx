import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../static/data";
import styles from "../styles/styles";

// Light pastel bg colors
const bgColors = [
  "bg-pink-100",
  "bg-blue-100",
  "bg-green-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-orange-100",
  "bg-teal-100",
  "bg-red-100",
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Branding Section */}
      <div className={`${styles.section} hidden sm:block`}>
        <div className="branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md">
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Categories Section */}
      <div
        className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
        id="categories"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {categoriesData &&
            categoriesData.map((i, index) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };

              // Pick random color
              const randomColor =
                bgColors[Math.floor(Math.random() * bgColors.length)];

              return (
                <div
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                  className={`w-full h-[120px] flex items-center justify-between cursor-pointer overflow-hidden rounded-md p-4 shadow-sm hover:shadow-md transition ${randomColor}`}
                >
                  <h5 className="text-[16px] font-medium">{i.title}</h5>
                  <img
                    src={i.image_Url}
                    className="w-[70px] h-[70px] object-contain"
                    alt={i.title}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;