import Link from "next/link";
import { redirect } from "next/navigation";

const fetcher = async () => {
  try {
    const res = await fetch(
      "https://api.taksize.com/api/v1/Common/Home/Index",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          imei: "123456789123456789",
          adsPagable: {
            page: 1,
            pageSize: 30,
            search: "string",
          },
          filtering: {
            cityIds: [0],
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await res.json();
    if (!data || !data.data) {
      throw new Error("Invalid data format received from API");
    }
    return data;
  } catch (error) {
    console.error("CategoryLayout fetcher error:", error);
    throw error;
  }
};

const CategoryLayout = async ({ tab_id }) => {
  try {
    const data = await fetcher();
    const categoryId = data.data.adsesParentCategories;

    if (!categoryId || !Array.isArray(categoryId)) {
      throw new Error("Invalid category data received");
    }

    return (
      <div className="flex justify-around items-center flex-wrap my-8">
        {categoryId.map((item) => (
          <div key={item.categoryId}>
            <Link
              className={`${
                item.categoryId == tab_id
                  ? "border-b-[3px] pb-1 border-teal-500"
                  : ""
              } text-lg text-gray-500`}
              href={`/${item.categoryId}`}
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    console.error("CategoryLayout error:", error);
    return (
      <div className="text-center my-8 text-red-500">
        <p>خطا در بارگذاری منو</p>
      </div>
    );
  }
};

export default CategoryLayout;
