import Image from "next/image";  
import Link from "next/link";  

const RestOfTheProducts = ({ restOfTheProducts, params }) => {  
  const toPersianNumbers = (num) => {  
    if (typeof num !== 'number') return num;
    return num.toString().replace(/[0-9]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]);  
  };  


  return (  
    <div className="flex w-full justify-center items-center flex-wrap gap-x-2 gap-y-5 pt-5">  
      {restOfTheProducts.map((item) => {  
        return (  
          <Link key={item.id} href={`/1/${item.adsCode}`} className="">  
            <div>  
              <Image  
                width={150}  
                height={150}  
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
                <span className="line-through text-[13px] font-regular text-gray-500">  
                  {toPersianNumbers(item.originalPrice)} 
                </span>  
              </div>  
              <div className="text-left">  
                <span className="sm:pl-[10px] pl-[5px] text-[13px] ">  
                  {toPersianNumbers(item.takSizePrice)}
                </span>  
                <span className="text-[12px]">تومان</span>  
              </div>  
            </div>  
            <div className="flex flex-row-reverse justify-start gap-x-3 ">  
              <div>  
                <span className="bg-[#ce1818] text-white text-[12px] rounded-[10px] pt-[3px] px-[4px]">  
                  {toPersianNumbers(item.discount)}%
                </span>  
              </div>  
              <div className="text-left text-gray-600">  
                {item?.sizes?.map((elem) => (  
                  <span key={elem.id} className="text-[12px] text-gray-500">  
                    {elem.name}{" "}  
                  </span>  
                ))}  
              </div>  
            </div>  
          </Link>  
        );  
      })}  
    </div>  
  );  
};  

export default RestOfTheProducts;