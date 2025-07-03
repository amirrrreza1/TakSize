import Image from "next/image";

const Store = ({ store }) => {
  return (
    <div className="flex max-w-[1400px] mx-auto mt-[25px] w-full  justify-center items-center gap-x-14 gap-y-7 flex-wrap text-gray-700 font-regular pb-[50px]">
      {store?.data?.storeAdses.map((item, index) => {
        return (
          <div key={index + 1} className="lg:w-[20%] sm:w-[40%] w-[35%]">
            <div className="">
              <div>
                <Image
                  width={500}
                  height={500}
                  alt=""
                  src={`https://api.taksize.com/${item.picture}`}
                />
              </div>
              <div>
                <h3 className="text-[13px] text-end px-[4px] text-gray-500 pt-[7px]">
                  {item.title}
                </h3>
              </div>
              <div className="flex justify-between items-center pt-[10px]">
                <div className="flex justify-center items-center gap-x-5">
                  <span className="line-through	 text-[13px] font-regular text-gray-500">
                    {item.originalPrice}
                  </span>
                </div>
                <div className="text-left ">
                  <span className="pl-[20px] text-[13px] ">
                    {item.takSizePrice}
                  </span>
                  <span className="text-[12px]">تومان</span>
                </div>
              </div>
              <div className="flex flex-row-reverse justify-start gap-x-3 ">
                {" "}
                <div>
                  <span className="bg-[#ce1818]  text-white text-[12px] rounded-[10px] pt-[3px] px-[4px]">
                    {item.discount}%
                  </span>
                </div>
                <div className="text-left text-gray-600">
                  {item?.sizes.map((elem) => {
                    return (
                      <>
                        <span className="text-[12px] text-gray-500">
                          {elem.name}{" "}
                        </span>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Store;
