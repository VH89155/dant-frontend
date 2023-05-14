import { useEffect } from "react";

const ShowTimeAll_Moive = (props) => {
  const { showTimes, load, setLoad } = props;
  console.log(showTimes);
  useEffect(() => {}, [showTimes]);
  return (
    <>
      {showTimes && (
        <>
          {showTimes.map((item, index) => {
            console.log("showTimes" , item)
            return (
              <>
                <div className="label-name" key={index}>
                  {item.moive.name}, {item.date}, {item.moive.age}


                  {item?.time?.map((items, index) => {
                    console.log(items);
                    return (
                      <>
                        <p key={index}>{items.date}</p>
                        {items?.array?.map((item, index) => {
                          const time = new Date(item.time);
                          return (
                            <button
                              type="button"
                              key={index}
                              onClick={() => {}}
                              className="btn btn-outline-danger"
                              style={{ marginRight: 20 }}
                            >
                              {time.getHours() > 9
                                ? time.getHours()
                                : `0${time.getHours()}`}{" "}
                              :{" "}
                              {time.getMinutes() > 9
                                ? time.getMinutes()
                                : `${time.getMinutes()}0`}
                            </button>
                          );
                        })}
                      </>
                    );
                  })}
                </div>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default ShowTimeAll_Moive;
