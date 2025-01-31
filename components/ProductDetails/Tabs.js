import React, { useState, Fragment } from "react";

const Tabs = ({ productsDesc, specification = [] }) => {
  const [activeTab, setActiveTab] = useState(2);

  return (
    <div className=" flex flex-col max-lg:mt-10 text-black max-md:w-full max-md:mt-[2rem] w-[92%] mt-[5rem] ml-auto mb-14">
      {productsDesc?.description || specification[0]?.groups[0]?.attributes ? (
        <div className="flex border-b-2 border-b-black ">
          {productsDesc?.description ? (
            <div
              onClick={() => setActiveTab(1)}
              className={`cursor-pointer px-4 py-2 max-lg:text-sm ${
                activeTab === 1 ? "border-b-2 border-b-[#b89980]" : ""
              }`}
            >
              Opis proizvoda
            </div>
          ) : null}
          {specification[0]?.groups[0]?.attributes ? (
            <div
              onClick={() => setActiveTab(2)}
              className={`cursor-pointer px-4 py-2 max-lg:text-sm ${
                activeTab === 2 ? "border-b-2 border-b-[#b89980]" : ""
              }`}
            >
              Specifikacija
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="p-4 max-md:p-1">
        {activeTab === 1 && (
          <div
            id="description"
            dangerouslySetInnerHTML={{ __html: productsDesc?.description }}
          ></div>
        )}
        {activeTab === 2 && (
          <div id="specification">
            {(specification ?? []).map((data) => {
              return (
                <Fragment key={data?.set?.id}>
                  {(Object.values(data.groups) ?? []).map((item) => {
                    return (
                      <Fragment key={item?.group?.id}>
                        {(Object.values(item.attributes) ?? []).map(
                          (attribute, index) => {
                            return (
                              <table
                                className="table-fixed max-md:w-full w-[90%] mx-auto my-1rem border border-croonus-3"
                                key={attribute?.attribute?.id}
                              >
                                <tbody>
                                  <tr
                                    className={`table_row
                                    }`}
                                  >
                                    <td className=" pl-[1.4rem] py-[0.7rem]">
                                      {attribute?.attribute?.name}
                                    </td>
                                    <td className=" pl-[1.4rem] py-[0.7rem]">
                                      {(attribute?.values ?? []).map(
                                        (value, i) => {
                                          if (
                                            i + 1 <
                                            attribute?.values.length
                                          ) {
                                            return value.name + ",";
                                          } else {
                                            return value.name;
                                          }
                                        }
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            );
                          }
                        )}
                      </Fragment>
                    );
                  })}
                </Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
