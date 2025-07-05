import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Image from "next/image";
import {
  MessageTik,
  PaymentProducts,
  TikProducts,
} from "../../assets/icon/svgExport";
import RestOfTheProducts from "../RestOfTheProducts/RestOfTheProducts";

const productFetcher = async () => {
  const res = await fetch(
    "https://api.taksize.com/api/v1/Common/Store/GetAdses",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imei: "12345678912345678",
        storeId: 1,
        adsPagable: {
          page: 1,
          pageSize: 30,
          search: "string",
        },
      }),
    }
  );
  const data = await res.json();
  
  return data;
};

const AccordionComponents = async ({ StoreInformation, params }) => {
  const restOfTheProducts = await productFetcher();

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography
            component="span"
            sx={{ fontFamily: "Vazir" }}
            className="font-bold"
          >
            توضیحات تکمیلی
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            className="text-center text-gray-500"
            sx={{ fontFamily: "Vazir" }}
          >
            بسیار راحت و با دوام
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography
            className="font-bold"
            sx={{ fontFamily: "Vazir" }}
            component="span"
          >
            اطلاعات فروشگاه
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            component="div"
            sx={{ fontFamily: "Vazir" }}
            className="text-center text-gray-500"
          >
            <div className="flex justify-center items-start flex-col gap-y-2">
              <div className="pb-3">
                <Image
                  src={`https://api.taksize.com/${StoreInformation.avatar}`}
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              </div>
              <div className="flex justify-start items-center gap-x-2 pb-3">
                <p className="text-mainGreen ">فروشگاه رسمی برند : </p>
                <TikProducts />
                <span> {StoreInformation.sellerName} </span>
              </div>
              <div className="pb-3">
                <div className="flex flex-col items-start justify-center">
                  <p className="">
                    نام و نام خانوادگی فروشنده :{" "}
                    <span>{StoreInformation.sellerName}</span>
                  </p>

                  <p className="text-right">{StoreInformation.address}</p>
                </div>
              </div>
              <div className="flex flex-col flex-wrap items-start justify-center pb-5">
                <div className="flex justify-center items-center gap-x-2">
                  <MessageTik />
                  <PaymentProducts />
                  <p className="inline-block">ضمانت اصل بودن</p>
                  <MessageTik />
                  <PaymentProducts />
                  <p className="inline-block">تعویض</p>
                  <PaymentProducts />
                  <p className="inline-block">مرجوعی</p>
                </div>
                <div className="flex justify-center items-center gap-x-2">
                  <MessageTik />
                  <PaymentProducts />
                  <p className="inline-block">ارسال رایگان</p>
                  <MessageTik />
                  <PaymentProducts />
                  <p className="inline-block">پرداخت در محل</p>
                </div>
              </div>
              <div className="w-full">
                <h3 className="text-center pb-3 border-b-2 font-bold">
                  محصولات دیگر در این فروشگاه
                </h3>
                <RestOfTheProducts
                  restOfTheProducts={restOfTheProducts.data}
                  params={params}
                />
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionComponents;
