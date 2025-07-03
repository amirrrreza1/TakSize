import AccordionComponents from "../../../Components/Accordion/Accordion";
import ProductActionsComponent from "../../../Components/ArrowBack/ArrowBack";
import BackButton from "../../../Components/HeartIco/HeartIcon";
import SubmitButtonDetail from "../../../Components/ui/SubmitButtonx/SubmitButtonx";
import Image from "next/image";

const fetcher = async (storeId) => {
  const res = await fetch(
    "https://api.taksize.com/api/v1/Common/Store/GetIndex",
    {
      method: "POST",
      cache: "no-store",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imei: "123456789123456789",
        storeId: storeId,
        adsPagable: {
          page: 1,
          pageSize: 30,
          search: "string",
        },
      }),
    }
  );

  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    throw new Error(`مشکل در دریافت اطلاعات ${res.status}`);
  }
};

const numberFormat = (number) => {
  if (!number && number !== 0) return number;
  return new Intl.NumberFormat("fa-IR").format(number);
};

const DetailProducts = async ({ params }) => {
  const { id, slug } = await params;
  const storeDetail = await fetcher(slug);
  const StoreInformation = storeDetail.data;
  const pureData = storeDetail?.data?.storeAdses;
  const filterData = pureData?.filter((item) => item.id == id);

  return (
    <div className="flex max-w-[1400px] mx-auto w-full justify-center items-center gap-x-14 gap-y-7 flex-wrap text-gray-700 font-regular pb-[50px]">
      {filterData?.map((item, index) => {
        return (
          <div key={index}>
            <div className="flex gap-2">
              <ProductActionsComponent item={item} />
              <BackButton />
            </div>
            <div className="w-full h-full">
              <Image
                className="w-full"
                width={400}
                height={100}
                alt=""
                src={`https://api.taksize.com/${item.picture}`}
              />
            </div>
            <div className="flex flex-col gap-y-4 px-[30px] pt-[40px] rounded-2xl pb-[10px]">
              <div className="">
                <h2 className="text-[17px] font-bold pt-[7px]">{item.title}</h2>
              </div>
              <div className="pb-2 pt-2 border-b-2">
                <span>کد آگهی : </span>
                <span>{numberFormat(item.adsCode)}</span>
              </div>
              <div className="pb-2 pt-2 border-b-2">
                <span>قیمت اصلی : </span>
                <span className="line-through text-[13px] font-regular text-gray-500">
                  {numberFormat(item.originalPrice)} تومان
                </span>
              </div>
              <div className="pb-2 pt-2 border-b-2">
                <span>قیمت تک سایز : </span>
                <span className="sm:pl-[10px] pl-[5px] text-[13px] text-[red]">
                  {numberFormat(item.takSizePrice)} تومان
                </span>
              </div>
              <div>
                <span>سایز : </span>
                {item?.sizes.map((elem, index) => {
                  return <span key={index}>{elem.name}</span>;
                })}
              </div>
              <div>
                <span>رنگ : </span>
                {item?.colors.map((elem, index) => {
                  return <span key={index}>{elem.persianName}</span>;
                })}
              </div>
              <div>
                <span className="bg-[#ce1818] text-white text-[12px] rounded-[10px] pt-[3px] px-[4px]">
                  {numberFormat(item.discount)}%
                </span>
              </div>
            </div>
            <div className="pb-[25px]">
              <AccordionComponents
                StoreInformation={StoreInformation}
                params={params}
              />
            </div>

            <SubmitButtonDetail
              discount={item.discount}
              price={item.takSizePrice}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DetailProducts;
