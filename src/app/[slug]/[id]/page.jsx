import AccordionComponents from "@/Components/Accordion/Accordion";
import BackButton from "@/Components/HeartIco/HeartIcon";
import ProductActionsComponent from "@/Components/ProductActionsComponent/ProductActionsComponent";
import SubmitOrderBTN from "@/Components/SubmitOrderBTN/SubmitOrderBTN";
import Image from "next/image";

const fetchProductDetails = async (storeId, adsId) => {
  const res = await fetch(
    "https://api.taksize.com/api/v1/Common/Advertising/GetDetails",
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/plain",
      },
      body: JSON.stringify({
        imei: "123456789123456789",
        storeId: Number(storeId),
        adsId: Number(adsId),
      }),
    }
  );

  if (!res.ok) {
    throw new Error("دریافت جزئیات محصول با خطا مواجه شد");
  }

  const data = await res.json();
  return data?.data;
};

const numberFormat = (number) => {
  if (!number && number !== 0) return number;
  return new Intl.NumberFormat("fa-IR").format(number);
};

const fixUrl = (url) => `https://api.taksize.com/${url?.replace(/\\/g, "/")}`;

const DetailProducts = async ({ params }) => {
  const { id, slug } = await params;

  const item = await fetchProductDetails(slug, id);

  if (!item) {
    return <div className="text-center py-20">محصول مورد نظر پیدا نشد</div>;
  }

  return (
    <div className="flex max-w-[1400px] mx-auto w-full justify-center items-center gap-x-14 gap-y-7 flex-wrap text-gray-700 font-regular pb-[50px]">
      <div>
        <div className="flex gap-2">
          <ProductActionsComponent item={item} />
          <BackButton />
        </div>

        <div className="w-full h-full">
          <Image
            className="w-full"
            width={400}
            height={100}
            alt={item.title}
            src={fixUrl(item.thumbnailImage || item.pictures?.[0]?.value)}
          />
        </div>

        <div className="flex flex-col gap-y-4 px-[30px] pt-[40px] rounded-2xl pb-[10px]">
          <h2 className="text-[17px] font-bold pt-[7px]">{item.title}</h2>

          <div className="pb-2 pt-2 border-b-2">
            <span>کد آگهی : </span>
            <span>{numberFormat(item.code)}</span>
          </div>

          <div className="pb-2 pt-2 border-b-2">
            <span>قیمت اصلی : </span>
            <span className="line-through text-[13px] text-gray-500">
              {numberFormat(item.originalPrice)} تومان
            </span>
          </div>

          <div className="pb-2 pt-2 border-b-2">
            <span>قیمت تک سایز : </span>
            <span className="text-[13px] text-[red]">
              {numberFormat(item.takSizePrice)} تومان
            </span>
          </div>

          <div>
            <span>سایز: </span>
            <ul className="list-disc mr-4">
              {item?.sizes?.map((c, i) => (
                <li key={i}>{c.name}</li>
              ))}
            </ul>
          </div>

          <div>
            <span>رنگ: </span>
            <ul className="list-disc mr-4">
              {item?.colors?.map((c, i) => (
                <li key={i}>{c.persianName}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="bg-[#ce1818] text-white text-[12px] rounded-[10px] pt-[3px] px-[4px]">
              {numberFormat(item.discount)}%
            </span>
          </div>
        </div>

        <div className="pb-[25px]">
          <AccordionComponents StoreInformation={item} params={params} />
        </div>

        <SubmitOrderBTN
          discount={item.discount}
          price={item.takSizePrice}
          description={item.description}
        />
      </div>
    </div>
  );
};

export default DetailProducts;
