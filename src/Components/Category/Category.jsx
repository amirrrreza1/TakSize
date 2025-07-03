"use client";

import CategoryButton from "./CategoryButton/CategoryButton";

const Category = ({ data, category, setCategory, storeId, setStoreId }) => {
  const clickHandler = (id) => {
    setCategory(id);
    setStoreId(id);
  };
  // console.log(storeId);

  return (
    <div className="md:hidden">
      <div className="flex justify-around items-center ">
        {data?.map((item, index) => {
          return (
            <CategoryButton
              key={item.categoryId}
              title={item.title}
              categoryId={item.categoryId}
              clickHandler={clickHandler}
              category={category}
              storeId={storeId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
